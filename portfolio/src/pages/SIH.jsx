import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image from "/sih/image1.png";

export default function SIH() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify hyphens-auto leading-relaxed text-lg lg:text-xl">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div className="text-left hyphens-none sinoreta pb-1 text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight">
              Traffic Control
            </div>
            <div className="text-lg lg:text-xl pb-2">Government-Linked Traffic Management Platform</div>
          </div>
          <div className="text-sm lg:text-base">
            <div>
              Role: UI/UX Designer & Front-End Developer.
            </div>
            <div>
              Skills: Figma, React, TypeScript, Tailwind, HTML,
              User-Focused Workflow Design.
            </div>
            <div>
              Timeline: October 2025 – January 2026.
            </div>
          </div>
        </div>
        <div className="lg:px-85">
          <hr />
        </div>

        <div className="pt-8 gap-40 lg:px-85 text-[1.1rem]">
          <div className="">
            <div className="font-bold pb-1 text-[1.3rem]">Overview</div>
            <div className="pb-6">
              I was involved in developing a government-linked
              platform for the city of Hermosillo, built to manage traffic
              signal systems more intelligently. I designed and developed the
              responsive interfaces that operators use to
              interact with the system.
            </div>


            <div className="font-bold pb-1 text-[1.3rem]">Problem</div>
            <div className="pb-6">
              Traffic management systems tend to be built for engineers, not
              for the range of people who actually need to operate and
              monitor them day to day. The challenge was translating complex,
              technical system requirements such as signal timing, traffic flow
              data and network status, into interfaces that stayed usable and
              clear for their actual users, while meeting the reliability
              expectations of a government-linked platform.
            </div>

            <div className="pb-6">
              I translated system requirements into user-focused
              workflows, starting in Figma before moving into
              production code.

              Each screen was designed around what a specific user needed
              to accomplish, monitoring, adjusting, or reviewing traffic
              signal behavior, rather than mirroring the system's
              internal structure.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Solution</div>
            <div className="pb-6">
              I designed the interfaces in Figma, then built them out using
              React, TypeScript, and Tailwind, keeping the components
              responsive across device sizes so the platform stayed usable
              whether it was being checked from a desktop or in the field.
              Working directly from system requirements meant constantly
              translating technical constraints into interface decisions that
              stayed legible to non-technical users.
            </div>

            <div className="justify-center flex lg:block">
              <img
                alt="Main page of the Traffic Control platform showing a map of the city with a menu of traffic signal management options"
                className="pb-6"
                loading="lazy"
                src={image}


              />
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Outcome</div>
            <div className="pb-6">
              {/* TODO: fill in with a concrete result if you have one — deployment status,
              stakeholder feedback, number of intersections/signals covered, etc. */}
              The platform's interfaces were built and delivered for a
              real, government-linked traffic system, giving me experience
              designing for a context where reliability and clarity aren't
              optional, they're what the platform is judged on.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Reflections</div>
            <div className="pb-6">
              {/* TODO: adjust if there's a more specific takeaway you'd rather highlight */}
              This project sharpened how I think about designing for
              operators rather than engineers, translating technical
              system requirements into interfaces that stay clear under
              real operating conditions. Working on a government-linked
              platform also gave me a stronger sense of what reliability
              actually demands from an interface, not just how it looks,
              but how consistently it holds up once it's in daily use.
            </div>

          </div>
          <iframe
            title="Figma prototype of the Traffic Control platform"
            className="w-full aspect-video rounded-[.6rem] pb-6"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/W6SRGC7AA1imYNbun1nNlR/SGSI?node-id=0-1&t=aAFbaG65KxFTZF89-1"
            allowFullScreen
          />

        </div>

        <div className="lg:px-85">
          <hr />
        </div>
        <DetailFooter />
      </div>
    </div>
  );
}