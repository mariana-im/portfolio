import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/motionlab/image1.png";
import image2 from "/motionlab/image2.png";
import image3 from "/motionlab/image3.png";

export default function MotionLab() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between py-8 pt-10 w-fit"
          style={{ viewTransitionName: "project-title" }}>
          <div className="flex flex-col justify-between pb-2">
            <div className="sinoreta text-left text-5xl lg:text-7xl">
              Motion Lab
            </div>
            <div className="text-xl">Educational Software</div>
          </div>
          <div className="lg:w-[30%] md:w-[50%] sm:w-[50%] w-[100%] text-[rgb(178,178,178)]">
            <div>
              <b>Role:</b> UI/UX Designer and Front-end Developer.
            </div>
            <div>
              <b>Skills:</b> UI/UX Design, User Research, User Flows,
              Wireframing, Prototyping, Usability Testing, Interface Design,
              HTML, CSS, TypeScript, React, Vite, Figma.
            </div>
            <div>
              <b>Timeline:</b> Spring 2025.
            </div>
          </div>
        </div>
        <hr />

        <div className="pt-8">
          <div className="text-xl">
            <div className="text-[rgb(178,178,178)]">• Overview</div>
            <div className="pb-6">
              MotionLab is an interactive web-based physics simulator
              designed to make learning abstract physics concepts more
              intuitive and engaging. Through dynamic visualizations and
              immediate feedback, it replaces static textbook explanations
              with an interactive learning experience tailored to students.
            </div>
            <img className="w-screen" src={image1} alt="" />

            <div className="text-[rgb(178,178,178)]">• Problem</div>
            <div className="pb-6">
              Traditional physics education often relies on static diagrams
              and formulas, making it difficult for students to visualize
              motion and understand abstract concepts. The challenge was to
              design an interface that clearly communicates complex
              information while remaining intuitive, engaging, and easy to
              navigate for students with different learning styles.
            </div>

            <div className="lg:flex lg:gap-20 justify-between">
              <div className="flex flex-col lg:w-[35rem] justify-center gap-5">
                <div className="text-4xl">
                  Motion Lab won <b> first place </b> in{" "}
                  <b> Software Development </b> at ExpoIngenierías 2025 at
                  Tecnológico de Monterrey.
                </div>
                <div>
                  It is currently being implemented at Tecnológico de
                  Monterrey, Sonora Norte campus, for university students.
                </div>
              </div>
              <div className="justify-center flex lg:block">
                <img
                  className="w-[30rem]"
                  loading="lazy"
                  src={image2}
                  alt=""
                />
              </div>
            </div>

            <div className="text-[rgb(178,178,178)]">• Reflections</div>
            <div className="pb-6">
              This project strengthened my UI/UX design and collaboration
              skills while reinforcing the importance of user-centered design
              in educational tools. Working on Motion Lab showed me how
              thoughtful interface decisions, clear navigation, and
              responsive visual feedback can significantly improve
              comprehension and engagement. Seeing the project win first
              place at ExpoIngenierías 2025 and being implemented validated
              the real-world impact of good design.
            </div>
            <img
              className="w-[160rem] h-auto mb-6"
              loading="lazy"
              src={image3}
              alt=""
            />
          </div>
        </div>

        <DetailFooter />
      </div>
    </div>
  );
}
