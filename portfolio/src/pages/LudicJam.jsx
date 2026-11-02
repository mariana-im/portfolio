import { useEffect } from "react";
import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image2 from "/ludicjam/image2.png";
import image3 from "/ludicjam/image3.png";
import image4 from "/ludicjam/image4.png";

export default function LudicJam() {
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (window.instgrm) {
      processEmbeds();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbeds;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div className="text-left sinoreta pb-1 text-5xl lg:text-5xl w-fit"
              style={{ viewTransitionName: "project-title" }}>
              Ludic Jam
            </div>
            <div className="text-xl pb-2">Videogame Focused Hackathon</div>
          </div>
          <div className="">
            <div>
              <b>Role:</b> Lead Organizer, Designer, Social Media Manager,
              and Developer.
            </div>
            <div>
              <b>Skills:</b> Event Leadership, Visual Identity Design, Web
              Design, Social Media Strategy, Roblox Studio, Team
              Coordination.
            </div>
            <div>
              <b>Timeline:</b> Fall 2025.
            </div>
          </div>
        </div>
        <hr />

        <div className="pt-8 gap-40 lg:px-85">
          <div className="">
            <div className="font-bold pb-1">Overview</div>
            <div className="pb-6">
              Ludic Jam 2025 was a hackathon focused on videogame development
              that brought together creativity, technology, and
              collaboration. I had the opportunity to participate both as
              Lead Organizer and as a competitor, working alongside a
              multidisciplinary team of women.
            </div>
            <div className="flex justify-center">
              <img className="pb-6" src={image2} alt="Ludic Jam 2025 event branding and mascot artwork" />
            </div>

            <div className="font-bold">Problem</div>
            <div className="pb-6">
              Beyond organizing logistics, the event needed a visual identity
              and web presence that felt cohesive, drew participants in, and
              reflected the hackathon's core premise: highlighting Sonora's
              cultural importance within a videogame development space.
            </div>

            <div className="font-bold">Solution</div>
            <div className="pb-6">
              Balancing organizational responsibilities with hands-on
              participation required strong time management, clear
              communication, and adaptability. On the creative side, I
              contributed to the event's visual direction and developed the
              webpage associated with the event, collaborating closely with
              the organization team to ensure a cohesive experience across
              branding, social media, and the site itself.
            </div>


            <div className="pb-6">
              While designing the mascots I focused on{" "}
              <b>traditional mexican folklore</b> since one of core
              premises of the hackathon was to highlight Sonora's
              importance.
            </div>
            <div className="pb-6 flex justify-center items-center">
              <img
                className="w-[14rem] sm:w-[17rem] lg:w-[22rem] lg:h-[12rem]"
                loading="lazy"
                src={image3}
                alt="Ludic Jam mascot design inspired by Mexican folklore"
              />
              <img
                className="w-[15rem] sm:w-[18rem] lg:w-[23rem] lg:h-[13rem]"
                loading="lazy"
                src={image4}
                alt="Second Ludic Jam mascot design inspired by Mexican folklore"
              />
            </div>

            <div className="font-bold">Outcome</div>
            <div className="pb-6">
              Our game, developed in Roblox Studio, was awarded People's
              Choice, making the experience especially meaningful and
              rewarding for the entire team.
            </div>

            <div className="font-bold">Reflections</div>
            <div className="pb-6">
              Ludic Jam 2025 was an incredibly enriching experience that
              strengthened my leadership, collaboration, and creative
              problem-solving skills. It reinforced my interest in building
              initiatives that bring people together through technology,
              design, and play.
            </div>

            <div className="flex items-center justify-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<blockquote class='instagram-media' data-instgrm-permalink="https://www.instagram.com/p/DPFazQZjE_9/" data-instgrm-version="14"></blockquote>`,
                }}
              />
            </div>
          </div>
        </div>

        <DetailFooter />
      </div>
    </div>
  );
}