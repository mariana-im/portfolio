import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailNav() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  return (
    <div className="sm:justify-start justify-center flex">
      {/* leading-none: the nav sets its own line height instead of inheriting
          the page's, so it is the same thickness on every project page. */}
      <div className="flex p-5 gap-3 sm:p-10 pt-6 fixed z-20 sm:gap-6 leading-none">
        <div className="flex items-stretch text-[1.2rem] sm:text-[1.3rem] border border-[.15rem] rounded-[1.05rem] bg-white">
          <button
            onClick={() => {
              setActive("home");
              navigate("/");
            }}
            className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
              active === "home" ? "" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setActive("projects");
              navigate("/#projects");
            }}
            className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
              active === "projects" ? "" : ""
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              setActive("other");
              navigate("/#other");
            }}
            className={`hidden flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
              active === "other" ? "" : ""
            }`}
          >
            Other
          </button>
          <button
            onClick={() => {
              setActive("about");
              navigate("/#about");
            }}
            className={`flex items-center h-full transition duration-300 ease-in-out hover:bg-gray-200 rounded-full px-3 active:scale-90 ${
              active === "about" ? "" : ""
            }`}
          >
            About
          </button>
        </div>
        <div className="hover:bg-black active:scale-90 border-black transition duration-300 ease-in-out hover:text-white text-[1.2rem] sm:text-[1.3rem] border border-[.15rem] rounded-[1.05rem] bg-white items-center justify-center align-center flex px-[.6rem]">
          <a target="_blank" href="portfolioCV.pdf">
            Resume
          </a>
        </div>
      </div>
    </div>
  );
}