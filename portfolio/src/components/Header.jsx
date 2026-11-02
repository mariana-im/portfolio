import { useState } from "react";
import DrawFloat from "./DrawFloat";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

export default function Header({ homeRef, onProjectsClick, onHomeClick, onAboutClick }) {
  const [active, setActive] = useState(null);

  return (
    <div ref={homeRef} id="home" className="min-h-screen min-w-screen leading-none">
      <div className="sm:justify-start justify-center flex">
        <div className="flex p-5 gap-3 sm:p-10 pt-6 fixed z-20 sm:gap-6">
          <nav
            aria-label="Main"
            className="flex items-stretch text-[1.2rem] sm:text-[1.3rem] border border-[.15rem] rounded-[1.05rem] bg-white"
          >
            <button
              type="button"
              aria-current={active === "home" ? "location" : undefined}
              onClick={() => {
                setActive("home");
                onHomeClick();
              }}
              className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100 ${FOCUS}`}
            >
              Home
            </button>
            <button
              type="button"
              aria-current={active === "projects" ? "location" : undefined}
              onClick={() => {
                setActive("projects");
                onProjectsClick();
              }}
              className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100 ${FOCUS}`}
            >
              Projects
            </button>
            <button
              type="button"
              aria-current={active === "about" ? "location" : undefined}
              onClick={() => {
                setActive("about");
                onAboutClick();
              }}
              className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100 ${FOCUS}`}
            >
              About
            </button>
          </nav>

          <div className="hover:bg-black active:scale-90 border-black transition duration-300 ease-in-out hover:text-white text-[1.2rem] sm:text-[1.3rem] border border-[.15rem] rounded-[1.05rem] bg-white items-center justify-center align-center flex px-[.6rem] motion-reduce:transition-none motion-reduce:active:scale-100">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="MarianaIslasCV.pdf"
              className={FOCUS}
            >
              Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative h-screen overflow-hidden">
        {/* Background layer: interactive draw canvas + its controls.
            Wrapped in an absolute container because DrawFloat's own root is
            `relative`; passing "absolute" into its className would clash. */}
        <div className="absolute inset-0 z-0">
          <DrawFloat className="h-full w-full" />
        </div>

        {/* Foreground: name + tagline. pointer-events-none lets drawing work
            through it, and also lets the DrawFloat buttons underneath be
            clicked (they sit in the empty space at the bottom). */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
          <h1 className="text-[3.7rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[8rem] sinoreta">
            Mariana Islas
          </h1>
          <p className="mt-3 text-[1.2rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2.5rem] sinoreta">
            Designer • Accessibility • Developer
          </p>
        </div>
      </div>
    </div>
  );
}