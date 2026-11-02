import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import guardian from "/guardian/image2.png";
import visualize from "/visualize/image1.png";
import sih from "/sih/image3.png";
import hospital from "/hospital/image3.png";
import seing from "/seing/image1.png";
import sazonlocal from "/sazonlocal/image1.png";
import skycheck from "/skycheck/image1.png";
import ludicjam from "/ludicjam/image1.png";

// How long the image stays up after it first scrolls into view.
const REVEAL_MS = 1500;
// The first project only opens by itself once the page has stopped
// scrolling for this long while it's on screen. That way scrolling THROUGH
// the section (for example the "About" nav button smooth-scrolling past it)
// never opens it, which would push the page down mid-scroll and make the
// scroll land short of its target.
const SETTLE_MS = 300;
// Hovering "More" opens the picture. It folds away this long after the
// cursor is no longer on the picture (hovering the picture itself keeps it
// open for as long as the cursor stays there).
const HOVER_HOLD_MS = 2000;
// After it folds away, hover is ignored for this long before "More" can
// trigger it again.
const COOLDOWN_MS = 1000;
// Roughly how long the fold-away animation takes (see --d below). The
// cooldown starts once the picture is back in the button.
const FOLD_MS = 500;
// Padding (in rem) around the image, and its shape.
const IMAGE_PAD_REM = 1.25;
const IMAGE_ASPECT = 10 / 16; // height / width

const projectRowClass = "lg:flex lg:justify-between lg:items-start relative";
const titleWrapClass =
  "flex gap-10 text-[1.1rem] lg:text-[1.3rem] items-center";
const titleBlockClass = "flex flex-col min-w-0";
// w-fit max-w-full makes the title's box hug its text, so the shared-element
// transition to the detail page's title (which also hugs its text) is a clean
// move + scale instead of a stretched snapshot.
const bigTitleClass =
  "sinoreta w-fit max-w-full whitespace-nowrap overflow-hidden hover:scale-102 ease-in-out duration-300 transition-transform text-ellipsis text-[3rem] lg:text-[4rem] cursor-pointer";
// Was: items-center lg:items-start lg:flex-col justify-between mt-1 lg:mt-0
// `justify-between` combined with the column stretching to match the
// title block's height meant the gap above "More" shrank/grew depending
// on whether the tags text wrapped to one or two lines. Fixed gap instead
// of justify-between keeps the spacing constant regardless of wrapping.
const tagsWrapClass =
  "flex items-center justify-between gap-3 lg:items-end lg:flex-col lg:justify-start lg:gap-4 mt-1 lg:mt-0";
const tagsTextClass = "lg:text-[1.3rem] text-[1.1rem] font-bold";
const moreButtonClass =
  "group flex border border-[.15rem] gap-2 justify-center rounded-[1.05rem] px-3 lg:px-4 text-[1.1rem] p-[.4rem] lg:p-2 shrink-0";
const arrowClass =
  "transition-transform duration-300 ease-in-out group-hover:translate-x-1 w-[1.1rem]";

// An empty panel reserves the space the image needs. Its height animates
// between 0fr and 1fr so the page below makes room smoothly.
const panelClass =
  "grid w-full max-w-[44rem] transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none";
const panelShown = "grid-rows-[1fr]";
const panelHidden = "grid-rows-[0fr]";

// The picture itself is a separate frame that travels between the "More"
// button's box and the reserved space. It copies the button's outline
// (same border width, colour and corner radius), so it looks like the
// button itself is stretching into the picture. --d is the duration; it's
// 0 for people who prefer reduced motion.
const frameClass =
  "absolute z-10 block overflow-hidden rounded-[1.05rem] border border-[.15rem] border-current hover:scale-[1.03]";

const projects = [
  {
    label: "Educational RPG & HCI Research",
    title: "Guardian of the True North",
    tags: "Design • UX Research • Accessibility",
    to: "/guardian",
    image: guardian,
  },
    {
    label: "Digital Employee Record Platform",
    title: "Hospital OS",
    tags: "UI/UX • Front-end • Web • Government-Linked",
    to: "/hospital",
    image: hospital,
  },
    {
    label: "Weather App",
    title: "Sky Check",
    tags: "UI/UX • Front-end • Mobile • Web",
    to: "/skycheck",
    image: skycheck,
  },
  {
    label: "Cross-platform mobile app for Oracle",
    title: "Visualize",
    tags: "UI/UX • Full-stack • Android • iOS",
    to: "/visualize",
    image: visualize,
  },
  {
    label: "Smart traffic management platform",
    title: "Traffic Control",
    tags: "UI/UX • Front-end • Web • Government-Linked",
    to: "/sih",
    image: sih,
  },
  {
    label: "Cooking App",
    title: "Sazón Local",
    tags: "UI/UX • Mobile",
    to: "/sazonlocal",
    image: sazonlocal,
  },
];

const otherProjects = [
  {
    label: "Videogame Focused Hackathon",
    title: "Ludic Jam",
    tags: "Visual Identity • Lead Organizer",
    to: "/ludicjam",
    image: ludicjam,
  },
];

const round = (n) => Math.round(n * 10) / 10;
const sameBox = (a, b) =>
  a.left === b.left &&
  a.top === b.top &&
  a.width === b.width &&
  a.height === b.height;
const sameRects = (a, b) =>
  a && b && sameBox(a.btn, b.btn) && sameBox(a.box, b.box);

function ProjectRow({ label, title, tags, to, image, autoReveal = false }) {
  const navigate = useNavigate();
  const wrapRef = useRef(null); // positioning parent for the frame
  const rowRef = useRef(null);
  const moreRef = useRef(null);
  const panelRef = useRef(null);
  const holdTimer = useRef(null);
  const cooldownTimer = useRef(null);
  const cooling = useRef(false);

  const [autoOpen, setAutoOpen] = useState(false); // first reveal on scroll
  const [hoverOpen, setHoverOpen] = useState(false); // opened by hovering "More"
  const [focused, setFocused] = useState(false);
  const [rects, setRects] = useState(null); // button box + picture box

  // The picture shows during its first reveal, for a short while after
  // "More" is hovered, and while "More" has keyboard focus.
  const expanded = autoOpen || hoverOpen || focused;

  // Measure where the "More" button is and where the picture should end
  // up, both relative to the row wrapper.
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const more = moreRef.current;
    const panel = panelRef.current;
    if (!wrap || !more || !panel) return;

    const w = wrap.getBoundingClientRect();
    const b = more.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const rem =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const pad = IMAGE_PAD_REM * rem;
    const boxWidth = Math.max(p.width - pad * 2, 0);

    const next = {
      btn: {
        left: round(b.left - w.left),
        top: round(b.top - w.top),
        width: round(b.width),
        height: round(b.height),
      },
      box: {
        left: round(p.left - w.left + pad),
        top: round(p.top - w.top + pad),
        width: round(boxWidth),
        height: round(boxWidth * IMAGE_ASPECT),
      },
    };
    setRects((prev) => (sameRects(prev, next) ? prev : next));
  }, []);

  useLayoutEffect(() => {
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Only the first project reveals itself on scroll (every row doing it on
  // the first scroll is too much). It opens once, when its title row is on
  // screen AND scrolling has settled (see SETTLE_MS), then folds away
  // after REVEAL_MS. The other projects open on hover / focus only.
  useEffect(() => {
    const el = rowRef.current;
    if (!autoReveal || !el || typeof IntersectionObserver === "undefined") return;

    let inView = false;
    let revealed = false;
    let settleTimer;
    let closeTimer;

    function reveal() {
      if (revealed || !inView) return;
      revealed = true;
      setAutoOpen(true);
      closeTimer = setTimeout(() => setAutoOpen(false), REVEAL_MS);
      io.disconnect();
      window.removeEventListener("scroll", restart);
    }

    // (Re)start the "wait until scrolling stops" countdown. Every scroll
    // event restarts it, so it only completes once the page is still.
    function restart() {
      clearTimeout(settleTimer);
      if (inView && !revealed) settleTimer = setTimeout(reveal, SETTLE_MS);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        restart();
      },
      // the upper ~70% of the screen, so the picture opens into view
      { rootMargin: "0px 0px -30% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", restart, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", restart);
      clearTimeout(settleTimer);
      clearTimeout(closeTimer);
    };
  }, [autoReveal]);

  useEffect(
    () => () => {
      clearTimeout(holdTimer.current);
      clearTimeout(cooldownTimer.current);
    },
    []
  );

  // Opens the project page with a simple cross-fade between the two pages
  // (the fade itself is the ::view-transition CSS in your stylesheet).
  // Browsers without View Transitions, and people who prefer reduced
  // motion, just navigate normally.
  function openProject() {
    const canAnimate =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canAnimate) {
      navigate(to);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => navigate(to));
      // capture the new page from the top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }

  // Fold the picture away after HOLD ms, then ignore hover on "More" for
  // COOLDOWN ms. Calling it again restarts the countdown.
  function scheduleRetract() {
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => {
      setHoverOpen(false);
      cooling.current = true;
      clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => {
        cooling.current = false;
      }, FOLD_MS + COOLDOWN_MS);
    }, HOVER_HOLD_MS);
  }

  // Hovering "More" is only a trigger: it opens the picture and starts the
  // countdown. It reacts to pointer movement as well as entering, so
  // resting the cursor on the button and nudging it after the cooldown
  // works too.
  function handleHover(e) {
    if (e.pointerType !== "mouse") return; // touch has no hover
    if (expanded || cooling.current) return;
    setHoverOpen(true);
    scheduleRetract();
  }

  // While the cursor is on the picture it stays open. Once the cursor
  // leaves, the countdown starts again.
  function handlePictureEnter(e) {
    if (e.pointerType !== "mouse") return;
    clearTimeout(holdTimer.current);
    setHoverOpen(true);
  }
  function handlePictureLeave(e) {
    if (e.pointerType !== "mouse") return;
    scheduleRetract();
  }

  const target = rects ? (expanded ? rects.box : rects.btn) : null;

  return (
    <div ref={wrapRef} className="relative [--d:500ms] motion-reduce:[--d:0ms]">
      <div ref={rowRef} className={projectRowClass}>
        <div className={titleWrapClass}>
          <div className={titleBlockClass}>
            <div>{label}</div>
            <div className="flex items-end gap-4">
              <div className={bigTitleClass} onClick={openProject}>
                {title}
              </div>
            </div>
          </div>
        </div>
        <div className={tagsWrapClass}>
          <div className={tagsTextClass}>{tags}</div>
          <Link
            ref={moreRef}
            to={to}
            className={`self-end shrink-0 ${expanded ? "pointer-events-none" : ""}`}
            onPointerEnter={handleHover}
            onPointerMove={handleHover}
            onClick={(e) => {
              // let new-tab / modified clicks behave normally
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              openProject(e);
            }}
            onFocus={(e) => {
              // keyboard focus brings the picture back; a mouse click doesn't
              let fromKeyboard = true;
              try {
                fromKeyboard = e.currentTarget.matches(":focus-visible");
              } catch {
                /* older browsers: treat any focus as keyboard */
              }
              if (fromKeyboard) setFocused(true);
            }}
            onBlur={() => setFocused(false)}
          >
            <div
              className={moreButtonClass}
              style={{
                opacity: expanded ? 0 : 1,
                // it fades out as the picture frame leaves it, and fades
                // back in as the frame shrinks onto it
                transition: `opacity calc(var(--d) * 0.4) ease-in-out ${
                  expanded ? "0ms" : "calc(var(--d) * 0.7)"
                }`,
              }}
            >
              <div>More</div>
              <img className={arrowClass} src="Arrow.svg" alt="" />
            </div>
          </Link>
        </div>
      </div>

      {/* Reserves the space for the picture (an empty box with its shape) */}
      <div className="flex justify-center" aria-hidden="true">
        <div
          ref={panelRef}
          className={`${panelClass} ${expanded ? panelShown : panelHidden}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div style={{ padding: `${IMAGE_PAD_REM}rem` }}>
              <div style={{ aspectRatio: "16 / 10" }} />
            </div>
          </div>
        </div>
      </div>

      {/* The picture frame. It sits exactly on top of the "More" button when
          folded (invisible), grows out to the reserved space, and shrinks
          back into the button. Hovering it keeps it open (see above). It's
          a mouse shortcut to the project: the
          "More" button is the keyboard / screen reader route to the same
          page, so this link is kept out of the tab order and the
          accessibility tree. */}
      {target && (
        <Link
          to={to}
          tabIndex={-1}
          aria-hidden="true"
          className={`${frameClass} ${
            expanded ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            left: target.left,
            top: target.top,
            width: target.width,
            height: target.height,
            opacity: expanded ? 1 : 0,
            transition: [
              "left var(--d) ease-in-out",
              "top var(--d) ease-in-out",
              "width var(--d) ease-in-out",
              "height var(--d) ease-in-out",
              "scale 300ms ease-in-out",
              // fade the empty outline out only AFTER it has shrunk back
              // onto the button, so the two outlines merge seamlessly
              `opacity 150ms ease-in-out ${expanded ? "0ms" : "var(--d)"}`,
            ].join(", "),
          }}
          onClick={(e) => {
            // let new-tab / modified clicks behave normally
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            openProject(e);
          }}
          onPointerEnter={handlePictureEnter}
          onPointerLeave={handlePictureLeave}
        >
          <img
            src={image}
            alt=""
            decoding="async"
            className="block h-full w-full object-cover"
            style={{
              opacity: expanded ? 1 : 0,
              transition: `opacity 300ms ease-in-out ${expanded ? "150ms" : "0ms"}`,
            }}
          />
        </Link>
      )}

      <div className="p-3" />
      <hr />
      <div className="p-3" />
    </div>
  );
}

export default function Projects({ projectsRef, otherRef }) {
  return (
    <div
      ref={projectsRef}
      id="projects"
      className="min-h-screen min-w-screen leading-none assistant pt-30 p-7 lg:pt-30 lg:p-25 leading-none"
    >
      <div>
        <div className="sinoreta text-[4.5rem] lg:text-[5.5rem] mb-10 lg:mb-20">
          Projects
        </div>
        <div>
          {projects.map((p, i) => (
            <ProjectRow
              key={p.to}
              label={p.label}
              title={p.title}
              tags={p.tags}
              to={p.to}
              image={p.image}
              autoReveal={i === 0}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="hidden sinoreta text-[2.5rem] lg:text-[4rem] my-20 mb-10 lg:my-20">
          Other
        </div>
        <div ref={otherRef} id="other" className="hidden">
          {otherProjects.map((p) => (
            <ProjectRow
              key={p.to}
              label={p.label}
              title={p.title}
              tags={p.tags}
              to={p.to}
              image={p.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}