import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/seing/image1.png";
import image2 from "/seing/image2.png";
import image3 from "/seing/image3.png";

export default function SEING() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div className="text-left sinoreta pb-1 text-5xl lg:text-5xl w-fit"
              style={{ viewTransitionName: "project-title" }}>
              SEING Website
            </div>
            {/* TODO: confirm subtitle — not sure what SEING stands for or represents beyond "engineering society" */}
            <div className="text-xl pb-2">Engineering Society Website</div>
          </div>
          <div className="">
            <div>
              <b>Role:</b> {/* TODO: confirm — designer/developer, or is this tied to your CS Representative role? */}
              UI Designer & Front-End Developer.
            </div>
            <div>
              <b>Skills:</b> {/* TODO: confirm actual stack used */}
              Figma, HTML, CSS, React.
            </div>
            <div>
              <b>Timeline:</b> {/* TODO: confirm dates */}
              TBD.
            </div>
          </div>
        </div>
        <hr />

        <div className="pt-8 gap-40 lg:px-85">
          <div className="">
            <div className="font-bold pb-1">Overview</div>
            <div className="pb-6">
              {/* TODO: this whole section is a placeholder. Your resume only lists
              "Computer Science Representative, SEING" as a leadership role,
              with no mention of building a website. Fill in: what is SEING,
              what does the site do, and what was your actual involvement? */}
              SEING is [describe what SEING is — engineering society,
              student group, etc.]. As Computer Science Representative, I
              [describe what you actually did for the website].
            </div>
            <img
              className="pb-6"
              src={image1}
              alt="SEING website homepage"
            />

            <div className="font-bold pb-1">Problem</div>
            <div className="pb-6">
              {/* TODO: what problem was the site solving? outdated site, no
              online presence, needed to serve multiple engineering
              disciplines, etc.? */}
              [Describe the problem the website needed to solve.]
            </div>

            <div className="font-bold pb-1">Solution</div>
            <div className="pb-6">
              {/* TODO: describe your actual process and contribution here */}
              [Describe what you designed/built and how.]
            </div>
            <img
              className="pb-6"
              loading="lazy"
              src={image2}
              alt="SEING website design or feature"
            />

            <div className="font-bold pb-1">Outcome</div>
            <div className="pb-6">
              {/* TODO: any measurable or notable result? */}
              [Describe the outcome — launched, adopted by the society,
              serving X students, etc.]
            </div>
            <img
              className="pb-6"
              loading="lazy"
              src={image3}
              alt="SEING website in use"
            />
          </div>
        </div>

        <DetailFooter />
      </div>
    </div>
  );
}