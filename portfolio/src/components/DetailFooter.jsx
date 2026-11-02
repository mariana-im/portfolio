import { Link, useLocation, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

// Order of the projects, same as the list on the home page.
// (Ludic Jam is left out because it's in the hidden "Other" section.)
const projects = [
  { to: "/guardian", title: "Guardian of the True North" },
  { to: "/hospital", title: "Hospital OS" },
  { to: "/skycheck", title: "Sky Check" },
  { to: "/visualize", title: "Visualize" },
  { to: "/sih", title: "Traffic Control" },
  { to: "/sazonlocal", title: "Sazón Local" },
];

const linkClass =
  "group block max-w-[50%] leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";
const labelClass = "block text-base text-neutral-500";
const titleClass =
  "inline pb-0.5 text-[1.1rem] text-neutral-900 lg:text-[1.25rem] " +
  // the line: a 1px gradient that starts at 0% width
  "bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat " +
  "bg-[length:0%_1px] bg-[position:0_100%] " +
  // animate it on hover and keyboard focus
  "transition-[background-size] duration-300 ease-out motion-reduce:transition-none " +
  "group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]";

export default function DetailFooter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Which project is this page? (ignore a trailing slash)
  const index = projects.findIndex(
    (p) => p.to === pathname.replace(/\/$/, "")
  );
  const prev = index > 0 ? projects[index - 1] : null;
  const next =
    index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;

  // Go to another project: same fade as opening one from the list, and
  // always start at the top of the new page (the footer is at the bottom
  // of this one, so without this you'd land at the bottom of the next).
  function goTo(e, to) {
    // let new-tab / modified clicks behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();

    const toTop = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const canAnimate =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (canAnimate) {
      document.startViewTransition(() => {
        flushSync(() => navigate(to));
        toTop();
      });
    } else {
      navigate(to);
      toTop();
    }
  }

  return (
    <>
      {(prev || next) && (
        // lg:px-85 lines it up with the page's text column
        <nav aria-label="Project navigation" className="mt-5 mb-12 lg:px-85">
          <div className="flex justify-between gap-6">
            {prev && (
              <Link
                to={prev.to}
                onClick={(e) => goTo(e, prev.to)}
                className={`${linkClass} text-left`}
              >
                <span className={labelClass}>
                  Previous<span className="sr-only"> project</span>
                </span>
                <span className={titleClass}>{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                to={next.to}
                onClick={(e) => goTo(e, next.to)}
                className={`${linkClass} ml-auto text-right`}
              >
                <span className={labelClass}>
                  Next<span className="sr-only"> project</span>
                </span>
                <span className={titleClass}>{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}