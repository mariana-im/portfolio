import { useEffect, useRef, useState } from "react";
import me1 from "/torontome.png";
import me2 from "/o4ume.png";
import me3 from "/ludicjamme.png";

// Each polaroid: where it sits in the cluster (as a % of the cluster box),
// how it's tilted, how long it waits before dropping in, and what's written
// on it (a title with an optional icon on the front, a caption on the back).
const photos = [
  {
    src: me1,
    alt: "A photo of Mariana Islas.",
    icon: PinIcon,
    title: "Toronto",
    caption: "My first time in Canada, where I did my internship and met lifelong friends.",
    left: "0%",
    top: "0%",
    rotate: -6,
    delay: 0,
  },
  {
    src: me2,
    alt: "A photo of Mariana Islas.",
    title: "O4U",
    caption: "Got accepted to the O4U Engineering 2025 conference, where I met incredible people and learned a lot.",
    left: "49%",
    top: "14%",
    rotate: 5,
    delay: 200,
  },
  {
    src: me3,
    alt: "A photo of Mariana Islas.",
    title: "Ludic Jam",
    caption: "A game hackathon where I was lead organizer, this experience taught me to work with a diverse team.",
    left: "18%",
    top: "46%",
    rotate: -2,
    delay: 400,
  },
];

// A map-pin symbol (outline, takes the text colour). Decorative.
function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1em] w-[1em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Both faces share the polaroid look. Safari needs the prefixed property.
const faceShadow =
  "shadow-[0_.6rem_1.4rem_rgba(0,0,0,.22)] outline outline-1 outline-black/10";
const faceStyle = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

export default function About({ aboutRef }) {
  const clusterRef = useRef(null);
  const reduced = prefersReducedMotion();
  // Reduced motion: the photos are simply there, no drop-in.
  const [shown, setShown] = useState(reduced);
  // Which polaroids are turned around (by index).
  const [flipped, setFlipped] = useState({});

  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  // Drop the photos in once, when the cluster scrolls into view.
  useEffect(() => {
    const el = clusterRef.current;
    if (shown || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={aboutRef}
      id="about"
      className="assistant w-screen pt-25 p-7 lg:p-25 lg:h-screen items-center align-center justify-center flex flex-col leading-none"
    >
      <div className="sinoreta text-[4.5rem] lg:text-[5.5rem] text-center mb-10 lg:mb-20">
        About Me
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-40">
        <div className="lg:w-[45%] items-center flex justify-center text-[1.2rem] sm:text-[1.4rem] lg:text-[1.6rem] text-justify">
          Hello! I'm Mariana Islas, a designer and developer based in Mexico, passionate about creating experiences that are useful, accessible, and make a positive impact.
 <br /> <br />
I love combining creativity with logic. Designing with accessibility in mind, and working to bring ideas to life.
<br /> <br />
I love collaborating with others to create meaningful experiences. I enjoy learning new skills and exploring new ideas.
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          {/* --p is the width of one polaroid; everything else scales from it */}
          <div
            ref={clusterRef}
            className="relative [--p:9rem] sm:[--p:10.5rem] lg:[--p:11rem] w-[calc(var(--p)*2.1)] h-[calc(var(--p)*2.4)]"
          >
            {photos.map((p, i) => {
              const isFlipped = !!flipped[i];
              const Icon = p.icon;
              return (
                // Layer 1: position + the drop-in animation.
                <div
                  key={p.src}
                  className="group absolute w-[var(--p)] hover:z-40 focus-within:z-40"
                  style={{
                    left: p.left,
                    top: p.top,
                    transform: shown
                      ? `rotate(${p.rotate}deg)`
                      : `translateY(-5rem) rotate(${p.rotate + 14}deg) scale(1.15)`,
                    opacity: shown ? 1 : 0,
                    // overshoots a little, like a photo tossed onto a table
                    transition: reduced
                      ? "none"
                      : `transform 900ms cubic-bezier(0.34, 1.56, 0.64, 1) ${p.delay}ms, opacity 400ms ease-out ${p.delay}ms`,
                  }}
                >
                  {/* Layer 2: perspective for the flip + the hover lift */}
                  <div className="[perspective:900px] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100">
                    {/* Layer 3: the button that turns around. Both faces are
                        real content, so a screen reader reads the photo's
                        description AND what's written on the back without
                        needing to flip anything. */}
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="relative block w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left transition-transform duration-700 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-reduce:transition-none"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "none",
                      }}
                    >
                      {/* Front: the photo, with its title in the white strip
                          underneath (like writing on a polaroid) */}
                      <span
                        className={`block bg-white p-[.6rem] ${faceShadow}`}
                        style={faceStyle}
                      >
                        <img
                          className="block aspect-square w-full bg-neutral-200 object-cover"
                          src={p.src}
                          alt={p.alt}
                        />
                        <span className="sinoreta flex h-[2rem] items-center justify-center gap-1 pt-[.3rem] text-[1.05rem] leading-none text-neutral-800 sm:text-[1.15rem] lg:text-[1.25rem]">
                          {Icon && <Icon />}
                          {p.title}
                          <span className="sr-only">. </span>
                        </span>
                      </span>

                      {/* Back: what's written on it */}
                      <span
                        className={`absolute inset-0 flex items-center justify-center bg-white p-3 text-center text-neutral-800 ${faceShadow}`}
                        style={{
                          ...faceStyle,
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <span className="text-[.8rem] leading-snug sm:text-[.9rem] lg:text-[.95rem]">
                          {p.caption}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[.95rem] hidden text-neutral-600">Click a photo to flip it</p>
        </div>
      </div>
    </div>
  );
}