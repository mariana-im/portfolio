import { useEffect, useId, useRef, useState } from "react";

/**
 * DrawFloat
 * A canvas the user can draw on with mouse, finger or keyboard. Finished
 * strokes detach and drift/bob around gently. On top of that, an invisible
 * "visitor" periodically sketches a lopsided, single-line heart or star,
 * which then joins the floating pool too.
 *
 * Accessibility:
 *  - The canvas is decorative (aria-hidden); real <button>s sit next to it.
 *  - Keyboard drawing: "Draw with keyboard" -> arrow keys move a pen,
 *    Space/Enter lowers or lifts it, Escape exits.
 *  - "Add heart" / "Add star" let anyone take part without drawing.
 *  - Undo, Clear and Pause/Play animation.
 *  - prefers-reduced-motion is respected by default AND live (no reload).
 *  - The animation loop stops while the component is off-screen.
 *  - Actions are announced through a polite live region.
 *
 * Mobile note: on touch, the first ~8px of movement decide whether the
 * gesture is a scroll (mostly vertical) or a draw (more horizontal).
 *
 * Usage as a full-bleed background layer:
 *
 *   <div className="relative h-screen overflow-hidden">
 *     <div className="absolute inset-0 z-0">
 *       <DrawFloat className="h-full w-full" />
 *     </div>
 *     <div className="pointer-events-none relative z-10">Your Name</div>
 *   </div>
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const getPrefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

// Controls are fully visible on load, then fold into three dots.
const INTRO_MS = 3000;

const BTN =
  "min-h-[44px] rounded-[1.05rem] border border-[.15rem] border-black bg-white px-3 text-sm sm:text-base " +
  "transition duration-300 ease-in-out hover:bg-black hover:text-white active:scale-90 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black " +
  "motion-reduce:transition-none motion-reduce:active:scale-100";

export default function DrawFloat({ className = "" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const surfaceRef = useRef(null);
  const kbButtonRef = useRef(null);

  const currentStroke = useRef([]);
  const isDrawing = useRef(false);
  const floatingStrokes = useRef([]);

  const simStroke = useRef(null);
  const simTimeoutRef = useRef(null);

  // tracks an in-progress touch gesture before we've decided scroll vs draw
  const touchState = useRef({ active: false, decided: false, isDraw: false, startX: 0, startY: 0 });

  // bridge between React state/buttons and the canvas effect below
  const apiRef = useRef(null);
  const rafRef = useRef(null);

  const [hasDrawn, setHasDrawn] = useState(false);
  const [paused, setPaused] = useState(getPrefersReducedMotion);
  const [kbMode, setKbMode] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Collapsible controls: open on load, folded into dots after INTRO_MS.
  // Re-expand on mouse hover, keyboard focus, or a tap on the dots (touch).
  const [open, setOpen] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [kbFocus, setKbFocus] = useState(false);
  const [activity, setActivity] = useState(0); // resets the auto-fold timer
  const expanded = open || hovered || kbFocus;

  const pausedRef = useRef(paused);
  const kbRef = useRef(false);
  const kbCursor = useRef({ x: 0, y: 0 });
  const kbPenDown = useRef(false);
  const announceTimer = useRef(null);
  const helpId = useId();

  const MAX_STROKES = 20;
  const STROKE_COLOR = "#111111";
  const LINE_WIDTH = 2.2;
  const DECIDE_THRESHOLD = 8; // px of movement before we commit to scroll or draw

  // Re-announce even if the same message repeats: clear first, then set.
  function announce(msg) {
    clearTimeout(announceTimer.current);
    setAnnouncement("");
    announceTimer.current = setTimeout(() => setAnnouncement(msg), 50);
  }

  // Fold the controls into dots after a few idle seconds.
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => setOpen(false), INTRO_MS);
    return () => clearTimeout(id);
  }, [open, activity]);

  // Follow the OS "reduce motion" setting live, without a page refresh.
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (e) => setPaused(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Keep the canvas loop in sync with the paused state.
  useEffect(() => {
    pausedRef.current = paused;
    apiRef.current?.onPauseChange(paused);
  }, [paused]);

  // Keyboard drawing mode: focus the drawing surface, reset the pen.
  useEffect(() => {
    kbRef.current = kbMode;
    if (kbMode) {
      apiRef.current?.resetCursor();
      surfaceRef.current?.focus();
    } else {
      apiRef.current?.liftPen();
    }
  }, [kbMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    // Animation clock only advances while not paused, so pausing freezes
    // the doodles in place and resuming continues without a jump.
    let animClock = 0;
    let lastT = null;
    let visible = true;

    function resize() {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // ---------- shared helpers ----------
    function getPoint(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }
    function finalizeStroke(points) {
      if (points.length < 2) return false;
      const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
      const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
      const localPts = points.map((p) => ({ x: p.x - cx, y: p.y - cy }));
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;
      const ampX = 12 + Math.random() * 18;
      const ampY = 12 + Math.random() * 18;
      floatingStrokes.current.push({
        points: localPts,
        baseX: cx,
        baseY: cy,
        phaseX,
        phaseY,
        ampX,
        ampY,
        // offset at birth, subtracted later so a stroke starts exactly
        // where it was drawn (important when animation is paused)
        offX: Math.sin(phaseX) * ampX,
        offY: Math.cos(phaseY) * ampY,
        freqX: 0.15 + Math.random() * 0.15,
        freqY: 0.15 + Math.random() * 0.15,
        angle: 0,
        angleSpeed: (Math.random() - 0.5) * 0.15,
        born: animClock,
      });
      if (floatingStrokes.current.length > MAX_STROKES) {
        floatingStrokes.current.shift();
      }
      return true;
    }

    // ---------- mouse drawing (desktop) ----------
    function mouseDown(e) {
      isDrawing.current = true;
      currentStroke.current = [getPoint(e.clientX, e.clientY)];
      setHasDrawn(true);
    }
    function mouseMove(e) {
      if (!isDrawing.current) return;
      currentStroke.current.push(getPoint(e.clientX, e.clientY));
    }
    function mouseUp() {
      if (!isDrawing.current || kbPenDown.current) return;
      isDrawing.current = false;
      finalizeStroke(currentStroke.current);
      currentStroke.current = [];
    }
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    // ---------- touch drawing (mobile) ----------
    function touchStart(e) {
      const t = e.touches[0];
      touchState.current = {
        active: true,
        decided: false,
        isDraw: false,
        startX: t.clientX,
        startY: t.clientY,
      };
    }
    function touchMove(e) {
      const ts = touchState.current;
      if (!ts.active) return;
      const t = e.touches[0];
      const p = getPoint(t.clientX, t.clientY);

      if (!ts.decided) {
        const dx = t.clientX - ts.startX;
        const dy = t.clientY - ts.startY;
        const dist = Math.hypot(dx, dy);
        if (dist < DECIDE_THRESHOLD) return;

        ts.decided = true;
        ts.isDraw = Math.abs(dx) >= Math.abs(dy);

        if (ts.isDraw) {
          isDrawing.current = true;
          currentStroke.current = [getPoint(ts.startX, ts.startY), p];
          setHasDrawn(true);
          e.preventDefault();
        }
        return;
      }

      if (ts.isDraw) {
        currentStroke.current.push(p);
        e.preventDefault();
      }
    }
    function touchEnd() {
      const ts = touchState.current;
      if (ts.isDraw) {
        isDrawing.current = false;
        finalizeStroke(currentStroke.current);
        currentStroke.current = [];
      }
      touchState.current = { active: false, decided: false, isDraw: false, startX: 0, startY: 0 };
    }
    canvas.addEventListener("touchstart", touchStart, { passive: true });
    canvas.addEventListener("touchmove", touchMove, { passive: false });
    canvas.addEventListener("touchend", touchEnd);
    canvas.addEventListener("touchcancel", touchEnd);

    // ---------- lopsided, single-line doodle hearts + stars ----------
    function heartDoodle(cx, cy, scale, rotation) {
      const leftW = scale * (9 + Math.random() * 3);
      const rightW = scale * (9 + Math.random() * 3);
      const lobeH = scale * (7 + Math.random() * 2);
      const dipDepth = scale * (2 + Math.random() * 2);
      const bottomY = scale * (16 + Math.random() * 3);
      const bottomXOffset = scale * (Math.random() - 0.5) * 4;

      const raw = [
        { x: 0, y: -dipDepth },
        { x: -leftW * 0.4, y: -lobeH * 1.3 },
        { x: -leftW, y: -lobeH * 0.4 },
        { x: -leftW * 0.75, y: lobeH * 0.6 },
        { x: bottomXOffset, y: bottomY },
        { x: rightW * 0.8, y: lobeH * 0.55 },
        { x: rightW, y: -lobeH * 0.35 },
        { x: rightW * 0.35, y: -lobeH * 1.25 },
        { x: rightW * 0.05, y: -dipDepth * 0.9 },
      ];

      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      return raw.map((p) => ({
        x: cx + p.x * cos - p.y * sin + (Math.random() - 0.5) * scale * 0.6,
        y: cy + p.x * sin + p.y * cos + (Math.random() - 0.5) * scale * 0.6,
      }));
    }

    function starDoodle(cx, cy, baseOuter, baseInner, rotation) {
      const spikes = 5;
      const pts = [];
      for (let i = 0; i < spikes; i++) {
        const outerAngle =
          rotation + (i / spikes) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const outerR = baseOuter * (0.65 + Math.random() * 0.6);
        pts.push({
          x: cx + Math.cos(outerAngle) * outerR,
          y: cy + Math.sin(outerAngle) * outerR,
        });

        const innerAngle =
          rotation +
          ((i + 0.5) / spikes) * Math.PI * 2 +
          (Math.random() - 0.5) * 0.35;
        const innerR = baseInner * (0.6 + Math.random() * 0.7);
        pts.push({
          x: cx + Math.cos(innerAngle) * innerR,
          y: cy + Math.sin(innerAngle) * innerR,
        });
      }
      pts.push({ x: pts[0].x, y: pts[0].y });
      return pts.map((p) => ({
        x: p.x + (Math.random() - 0.5) * 2,
        y: p.y + (Math.random() - 0.5) * 2,
      }));
    }

    function makeDoodleShape(cx, cy, isHeart) {
      const rotation = (Math.random() - 0.5) * 0.4;
      return isHeart
        ? heartDoodle(cx, cy, 3.2 + Math.random() * 1.2, rotation)
        : starDoodle(cx, cy, 24 + Math.random() * 10, 9 + Math.random() * 4, rotation);
    }

    function easeInOutQuad(x) {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    const PAUSE_WEIGHT = 22;

    function computeSegmentCosts(points) {
      const segs = [];
      for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i + 1].x - points[i].x;
        const dy = points[i + 1].y - points[i].y;
        const moveCost = Math.hypot(dx, dy);
        let pauseCost = 0;
        if (i + 2 < points.length) {
          const dx2 = points[i + 2].x - points[i + 1].x;
          const dy2 = points[i + 2].y - points[i + 1].y;
          const a1 = Math.atan2(dy, dx);
          const a2 = Math.atan2(dy2, dx2);
          let diff = Math.abs(a2 - a1);
          if (diff > Math.PI) diff = 2 * Math.PI - diff;
          pauseCost = diff * PAUSE_WEIGHT;
        }
        segs.push({ moveCost, pauseCost, total: moveCost + pauseCost });
      }
      return segs;
    }

    function pointsAtCost(points, segs, targetCost) {
      let acc = 0;
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        if (acc + seg.total >= targetCost || i === segs.length - 1) {
          const local = targetCost - acc;
          if (local <= seg.moveCost) {
            const frac = seg.moveCost > 0 ? Math.max(0, local) / seg.moveCost : 1;
            const x = points[i].x + (points[i + 1].x - points[i].x) * frac;
            const y = points[i].y + (points[i + 1].y - points[i].y) * frac;
            return points
              .slice(0, i + 1)
              .concat([{ x: x + (Math.random() - 0.5) * 0.6, y: y + (Math.random() - 0.5) * 0.6 }]);
          }
          return points.slice(0, i + 2);
        }
        acc += seg.total;
      }
      return points.slice();
    }

    // ---------- automatic "visitor" doodles ----------
    function scheduleNextAutoDraw(delay = 2800 + Math.random() * 3200) {
      clearTimeout(simTimeoutRef.current);
      if (pausedRef.current) return; // no new doodles while paused
      simTimeoutRef.current = setTimeout(startAutoDraw, delay);
    }

    function startAutoDraw() {
      if (pausedRef.current) return;
      const rect = container.getBoundingClientRect();
      if (!visible || rect.width < 40 || rect.height < 40) {
        scheduleNextAutoDraw();
        return;
      }
      const margin = 80;
      const cx = margin + Math.random() * Math.max(rect.width - margin * 2, 1);
      const cy = margin + Math.random() * Math.max(rect.height - margin * 2, 1);
      const isHeart = Math.random() < 0.5;
      const points = makeDoodleShape(cx, cy, isHeart);

      const segs = computeSegmentCosts(points);
      const total = segs.reduce((s, seg) => s + seg.total, 0);

      simStroke.current = {
        points,
        segs,
        total,
        start: performance.now(),
        duration: total * (7 + Math.random() * 3),
      };
    }

    // ---------- actions called from the buttons ----------
    function addShape(isHeart) {
      const rect = container.getBoundingClientRect();
      const margin = 80;
      const cx = margin + Math.random() * Math.max(rect.width - margin * 2, 1);
      const cy = margin + Math.random() * Math.max(rect.height - margin * 2, 1);
      finalizeStroke(makeDoodleShape(cx, cy, isHeart));
      setHasDrawn(true);
      announce(isHeart ? "Heart added." : "Star added.");
    }

    function undo() {
      if (floatingStrokes.current.length === 0) {
        announce("Nothing to undo.");
        return;
      }
      floatingStrokes.current.pop();
      announce("Last doodle removed.");
    }

    function clear() {
      floatingStrokes.current = [];
      if (simStroke.current) {
        simStroke.current = null;
        scheduleNextAutoDraw(); // the chain would otherwise stop here
      }
      announce("All doodles cleared.");
    }

    function onPauseChange(isPaused) {
      if (isPaused) {
        clearTimeout(simTimeoutRef.current);
        if (simStroke.current) {
          finalizeStroke(simStroke.current.points); // finish instantly
          simStroke.current = null;
        }
      } else {
        scheduleNextAutoDraw(600);
      }
    }

    // ---------- keyboard drawing ----------
    function resetCursor() {
      const rect = container.getBoundingClientRect();
      kbCursor.current = { x: rect.width / 2, y: rect.height / 2 };
      kbPenDown.current = false;
    }

    function liftPen() {
      if (!kbPenDown.current) return false;
      kbPenDown.current = false;
      isDrawing.current = false;
      const added = finalizeStroke(currentStroke.current);
      currentStroke.current = [];
      return added;
    }

    // Movement is announced AFTER the user pauses, summarising the burst
    // ("Drawing left, 5 steps."), so rapid presses never cut each other off.
    const MOVE_PAUSE_MS = 350;
    let moveTimer = null;
    let run = { key: "", count: 0 };

    function handleKey(e) {
      const rect = container.getBoundingClientRect();
      const c = kbCursor.current;
      const step = e.shiftKey ? 40 : 14;
      const prevX = c.x;
      const prevY = c.y;
      let dir = "";

      switch (e.key) {
        case "ArrowLeft":
          dir = "left";
          c.x = Math.max(0, c.x - step);
          break;
        case "ArrowRight":
          dir = "right";
          c.x = Math.min(rect.width, c.x + step);
          break;
        case "ArrowUp":
          dir = "up";
          c.y = Math.max(0, c.y - step);
          break;
        case "ArrowDown":
          dir = "down";
          c.y = Math.min(rect.height, c.y + step);
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          clearTimeout(moveTimer);
          run = { key: "", count: 0 };
          if (kbPenDown.current) {
            announce(liftPen() ? "Pen up. Doodle added." : "Pen up.");
          } else {
            kbPenDown.current = true;
            isDrawing.current = true;
            currentStroke.current = [{ x: c.x, y: c.y }];
            setHasDrawn(true);
            announce("Pen down. Use the arrow keys to draw.");
          }
          return;
        case "Escape":
          e.preventDefault();
          clearTimeout(moveTimer);
          run = { key: "", count: 0 };
          liftPen();
          kbButtonRef.current?.focus();
          setKbMode(false);
          announce("Keyboard drawing off.");
          return;
        default:
          return; // let Tab etc. behave normally
      }

      e.preventDefault(); // arrows must not scroll the page
      if (kbPenDown.current) currentStroke.current.push({ x: c.x, y: c.y });

      // Group consecutive presses of the same kind into one "run", then
      // announce the result once the user pauses.
      const moved = c.x !== prevX || c.y !== prevY;
      const verb = kbPenDown.current ? "Drawing" : "Moving";
      const fast = e.shiftKey ? ", fast" : "";
      const key = `${moved ? verb : "edge"}|${dir}|${e.shiftKey}`;
      run = key === run.key ? { key, count: run.count + 1 } : { key, count: 1 };

      const text = moved
        ? `${verb} ${dir}${fast}${run.count > 1 ? `, ${run.count} steps` : ""}.`
        : `Edge of the canvas. Can't go ${dir}.`;

      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => {
        announce(text);
        run = { key: "", count: 0 };
      }, MOVE_PAUSE_MS);
    }

    apiRef.current = {
      addShape,
      undo,
      clear,
      onPauseChange,
      resetCursor,
      liftPen,
      handleKey,
    };

    // ---------- rendering ----------
    function strokeSmoothPath(points, count) {
      const n = Math.min(count, points.length);
      if (n < 2) return;
      if (n === 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.stroke();
        return;
      }
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      let i;
      for (i = 1; i < n - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.lineTo(points[n - 1].x, points[n - 1].y);
      ctx.stroke();
    }

    function frame(t) {
      const dt = lastT == null ? 0 : Math.min((t - lastT) / 1000, 0.1);
      lastT = t;
      const isPaused = pausedRef.current;
      if (!isPaused) animClock += dt;

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = LINE_WIDTH;
      ctx.strokeStyle = STROKE_COLOR;
      ctx.fillStyle = STROKE_COLOR;
      ctx.globalAlpha = 1;

      for (const s of floatingStrokes.current) {
        const time = animClock - s.born;
        let x = s.baseX + Math.sin(time * s.freqX + s.phaseX) * s.ampX - s.offX;
        let y = s.baseY + Math.cos(time * s.freqY + s.phaseY) * s.ampY - s.offY;
        if (!isPaused) s.angle += s.angleSpeed * 0.01;

        const margin = 60;
        if (x < -margin) s.baseX += rect.width + margin * 2;
        if (x > rect.width + margin) s.baseX -= rect.width + margin * 2;
        if (y < -margin) s.baseY += rect.height + margin * 2;
        if (y > rect.height + margin) s.baseY -= rect.height + margin * 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.angle);
        strokeSmoothPath(s.points, s.points.length);
        ctx.restore();
      }

      if (isDrawing.current && currentStroke.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentStroke.current[0].x, currentStroke.current[0].y);
        for (let i = 1; i < currentStroke.current.length; i++) {
          ctx.lineTo(currentStroke.current[i].x, currentStroke.current[i].y);
        }
        ctx.stroke();
      }

      if (simStroke.current) {
        const s = simStroke.current;
        const progress = Math.min((t - s.start) / s.duration, 1);
        const eased = easeInOutQuad(progress);
        const visiblePts = pointsAtCost(s.points, s.segs, eased * s.total);
        strokeSmoothPath(visiblePts, visiblePts.length);

        if (progress >= 1) {
          finalizeStroke(s.points);
          simStroke.current = null;
          scheduleNextAutoDraw();
        }
      }

      // keyboard pen: ring when lifted, filled dot when drawing
      if (kbRef.current) {
        const c = kbCursor.current;
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (kbPenDown.current) {
          ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.arc(c.x, c.y, 7, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function startLoop() {
      if (rafRef.current == null) {
        lastT = null;
        rafRef.current = requestAnimationFrame(frame);
      }
    }
    function stopLoop() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Stop drawing frames while the canvas is off-screen.
    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      });
      observer.observe(container);
    }

    startLoop();
    scheduleNextAutoDraw(400 + Math.random() * 400);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("touchstart", touchStart);
      canvas.removeEventListener("touchmove", touchMove);
      canvas.removeEventListener("touchend", touchEnd);
      canvas.removeEventListener("touchcancel", touchEnd);
      observer?.disconnect();
      stopLoop();
      clearTimeout(simTimeoutRef.current);
      clearTimeout(announceTimer.current);
      clearTimeout(moveTimer);
      apiRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Decorative: the portfolio never depends on what is drawn here. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{
          cursor:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4-14 14-5 1 1-5Z"/><path d="m14.5 5.5 4 4"/></svg>\') 2 22, crosshair',
        }}
      />

      {/* Focusable surface that receives keys while keyboard drawing is on */}
      {kbMode && (
        <div
          ref={surfaceRef}
          role="application"
          tabIndex={0}
          aria-label="Keyboard drawing area"
          aria-describedby={helpId}
          onKeyDown={(e) => apiRef.current?.handleKey(e)}
          onBlur={() => setKbMode(false)}
          className="pointer-events-none absolute inset-0 outline-none focus:outline focus:outline-2 focus:outline-offset-[-6px] focus:outline-black"
        />
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-3 px-4 sm:bottom-6">
        {kbMode ? (
          <p id={helpId} className="rounded bg-white/80 px-2 text-center text-sm text-neutral-700">
            Arrow keys move the pen (hold Shift to go faster). Space starts and lifts it. Escape exits.
          </p>
        ) : (
          !hasDrawn && (
            <p aria-hidden="true" className="text-sm text-neutral-600">
              draw something
            </p>
          )
        )}

        <div
          className="pointer-events-none grid"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
          onPointerDown={() => setActivity((a) => a + 1)}
          onKeyDown={() => setActivity((a) => a + 1)}
          onFocus={(e) => {
            // only keyboard focus keeps the controls open, not a mouse click
            let fromKeyboard = false;
            try {
              fromKeyboard = e.target.matches(":focus-visible");
            } catch {
              fromKeyboard = true;
            }
            setKbFocus(fromKeyboard);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setKbFocus(false);
          }}
        >
          {/* Three dots: purely a visual/touch affordance. The real buttons
              below stay in the DOM and reachable by keyboard and screen
              readers, and focusing any of them expands the row. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(true)}
            className={`col-start-1 row-start-1 flex min-h-[44px] min-w-[44px] items-center justify-center gap-1 self-end justify-self-center transition-opacity duration-300 motion-reduce:transition-none ${
              expanded ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
          </button>

        <div
          role="group"
          aria-label="Optional doodle controls"
          className={`col-start-1 row-start-1 flex origin-bottom flex-wrap justify-center gap-2 transition duration-300 ease-out motion-reduce:transition-none ${
            expanded
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-90 opacity-0"
          }`}
        >
          <p className="sr-only">
            DrawFloat is an optional decorative canvas. You can draw with a mouse or touch, draw with the
            keyboard, or add hearts and stars with the buttons. The rest of the page does not depend on it.
          </p>

          <button ref={kbButtonRef} type="button" className={BTN} onClick={() => setKbMode(true)}>
            Draw with keyboard
          </button>
          <button type="button" className={BTN} onClick={() => apiRef.current?.addShape(true)}>
            Add heart
          </button>
          <button type="button" className={BTN} onClick={() => apiRef.current?.addShape(false)}>
            Add star
          </button>
          <button type="button" className={BTN} onClick={() => apiRef.current?.undo()}>
            Undo
          </button>
          <button type="button" className={BTN} onClick={() => apiRef.current?.clear()}>
            Clear
          </button>
          <button
            type="button"
            className={BTN}
            onClick={() => {
              const next = !paused;
              setPaused(next);
              announce(next ? "Animation paused." : "Animation playing.");
            }}
          >
            {paused ? "Play animation" : "Pause animation"}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}