import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/skycheck/image1.png";
import image2 from "/skycheck/image2.png";
import image3 from "/skycheck/image3.png";

export default function SkyCheck() {
  return (
    <div className="overflow-x-hidden leading-relaxed text-lg lg:text-xl">
      <DetailNav />

      <div className="flex assistant flex-col text-justify pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div
              className="text-left hyphens-none sinoreta pb-1 text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight w-fit"
              style={{ viewTransitionName: "project-title" }}
            >
              Sky Check
            </div>
            <div className="text-lg lg:text-xl pb-2">Climate Monitoring App</div>
          </div>
          <div className="text-sm lg:text-base">
            <div>
              Role: UI/UX Designer &amp; Front-End Developer (team of 6).
            </div>
            <div>
              Skills: UI/UX Design, User-Centered Design, Data
              Visualization, HTML, CSS, Tailwind, React, Vite, TypeScript,
              Figma.
            </div>
            <div>Timeline: Fall 2025 (2-day hackathon).</div>
          </div>
        </div>
        <div className="lg:px-85">
          <hr />
        </div>

        <div className="pt-8 gap-40 lg:px-85 text-[1.1rem]">
          <div>
            <div className="font-bold pb-1 text-[1.3rem]">Overview</div>
            <div className="pb-6">
              SkyCheck is a web-based climate monitoring platform built in two
              days by a team of six for the 2025 NASA Space Apps Challenge,
              answering the challenge "Will It Rain on My Parade?" It gives
              users real-time forecasts and historical weather data to support
              planning in fields like agriculture, logistics, and travel.
            </div>
            <figure className="pb-6">
              <img
                src={image1}
                alt="SkyCheck weather visualization interface for desktop showing a map with a search bar, historical data, and a current weather forecast"
              />
            </figure>

            <div className="font-bold pb-1 text-[1.3rem]">Problem</div>
            <div className="pb-6">
              Climate data is often complex, fragmented, and difficult to
              interpret for non-technical users. The challenge was to design a
              clear interface that presents a lot of weather data in a way that
              supports confident decisions.
            </div>
            <div className="pb-6">
              Who it's for: we designed for three groups,
              agriculture, logistics, and travel, and the app works best for
              agriculture. All three needed the same two things to plan: a
              forecast of what's coming and historical data for context, so we
              built both into the interface.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Solution</div>
            <div className="pb-6">
              Our app pulls real-time and historical data from Meteomatics and
              NASA datasets. I was in charge of design and front-end: I
              designed the interface in Figma and built it in React,
              TypeScript, and Tailwind. Rather than presenting raw data, the
              design focused on showing what a non-expert user needs to make a
              decision, prioritizing clarity over completeness on every screen.
            </div>

            <div className="pb-6">
              Out of everything the data sources offer, the mobile screens show
              only what someone planning around the weather needs: weather
              alerts at the top, then precipitation, humidity, UV index, wind
              speed and direction, a temperature chart, air quality, and a
              probability check for extreme conditions (very hot, very cold,
              very humid, extreme rain, extreme wind, and dangerous UV). We showed SkyCheck to a professional
              who manages farmland. They told us it was very useful for their
              field and intuitive to use.
            </div>

            <figure className="pb-6">
              <img
                loading="lazy"
                src={image3}
                alt="SkyCheck weather visualization interface for mobile showing a map with a search bar, historical data, and a current weather forecast"
              />
            </figure>


            <div className="font-bold pb-1 text-[1.3rem]">Outcome</div>
            <div className="pb-6">
              We built and demoed SkyCheck at the 2025 NASA Space Apps
              Challenge. It didn't place, but it gave us a working product in
              two days and positive feedback from someone in the field we built
              it for. The app isn't live now, but the code is on GitHub.
            </div>
            <figure className="pb-6">
              <div className="flex justify-center">
                <img
                  loading="lazy"
                  src={image2}
                  alt="SkyCheck dashboard showing weather data and visualizations"
                />
              </div>

            </figure>
            {/* OPTIONAL: add a link here, e.g. <a href="YOUR_GITHUB_URL" className="underline">View the code on GitHub</a> */}

            <div className="font-bold pb-1 text-[1.3rem]">Reflections</div>
            <div className="pb-6">
              With only two days, I had to decide quickly what the interface
              needed to show and what could wait. That pushed me to design for
              clarity first: a person planning around the weather needs a clear
              answer more than every available number. Next time I would test
              with more than one person before the demo.
            </div>
          </div>

          <iframe
            title="Figma prototype of the SkyCheck weather visualization app"
            className="w-full aspect-video rounded-[.6rem] pb-6"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/nHVVtA6R9tq7aPOUHNIlbL/SkyCheck?node-id=0-1&t=ujYrM1bJ3syFf1P3-1"
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