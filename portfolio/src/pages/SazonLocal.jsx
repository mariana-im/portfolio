import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/sazonlocal/image1.png";
import image2 from "/sazonlocal/image2.png";
import image3 from "/sazonlocal/image3.png";

export default function SazonLocal() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden hyphens-auto leading-relaxed text-lg lg:text-xl text-justify">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div
              className="text-left hyphens-none sinoreta pb-1 text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight w-fit"
              style={{ viewTransitionName: "project-title" }}
            >
              Sazón Local
            </div>
            <div className="text-lg lg:text-xl pb-2">Mobile Cooking App</div>
          </div>
          <div className="text-sm lg:text-base">
            <div>
              Role: UI/UX Designer.
            </div>
            <div>
              Skills: UI/UX Design, Mobile-First Design, User Flows,
              Wireframing, Prototyping, Interaction Design, Visual Hierarchy,
              Figma.
            </div>
            <div>
              Timeline: Fall 2024.
            </div>
          </div>
        </div>
        <div className="lg:px-85">
          <hr />
        </div>

        <div className="pt-8 gap-40 lg:px-85 text-[1.1rem]">
          <div className="">
            <div className="font-bold pb-1 text-[1.3rem]">Overview</div>
            <div className="pb-0">
              Sazón Local is a mobile app prototype that connects users with
              recipes based on products available at a local grocery store.
              The goal was to encourage home cooking while supporting local
              commerce through an intuitive digital experience.
            </div>
            <div className="flex justify-center">
              <img className="w-180 my-6" src={image2} alt="Two screens and several components used in the app, a home screen showing sales and types of recipes and a configuration sidebar" />
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Problem</div>
            <div className="pb-6">
              Many users want to cook at home but struggle to find recipe
              inspiration that aligns with locally available ingredients. The
              challenge was to design a mobile experience that simplifies
              recipe discovery while making local products easy to explore
              and integrate into everyday cooking.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Solution</div>
            <div className="pb-6">
              I designed the full mobile experience from user flows through
              high-fidelity prototypes in Figma, starting with how a user
              moves from browsing local products to discovering a matching
              recipe. Visual hierarchy and wireframing decisions focused on
              keeping ingredient discovery and recipe browsing feeling like
              one connected flow, rather than two separate features bolted
              together.
            </div>

            <div className="pb-6">
              This prototype demonstrates how thoughtful interface
              and experience design can translate local commerce into a{" "}
              digital experience that feels intuitive and easy to
              use.
            </div>
            <div className="">
              <img
                className="pb-6"
                loading="lazy"
                src={image1}
                alt="TWO screens from the app showing a log in page and a home page showing a call to action to log in"
              />
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Outcome</div>
            <div className="pb-6">
              {/* TODO: fill in with a concrete result if you have one — course
              grade/feedback, usability testing results, whether it moved
              beyond prototype stage, etc. */}
              The result was a complete, high-fidelity prototype covering the
              full recipe discovery flow, from browsing local products to
              landing on a matching recipe, giving me end-to-end experience
              designing a mobile product from user flows through
              interaction-level detail.
            </div>

            <div className="flex justify-center">
              <img
                className="pb-6"
                loading="lazy"
                src={image3}
                alt="App flow overview showing three different screens: mexican recipes, a recipe detail, and italian recipes"
              />
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Reflections</div>
            <div className="pb-6">
              Working on Sazón Local helped me better understand how design
              decisions impact usability at every step of the user journey.
              The project reinforced the value of clear structure,
              consistency, and intentional interactions in mobile
              experiences.
            </div>

            <iframe
              title="Figma prototype of the mobile cooking app"
              className="w-full aspect-video rounded-[.6rem] pb-6"
              src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/gBprkfEOgDbR3IiQNV4aq6/Untitled?node-id=0-1&t=oNo7kKqdIEVDTzk1-1"
              allowFullScreen
            />

          </div>
        </div>

        <div className="lg:px-85">
          <hr />
        </div>
        <DetailFooter />
      </div>
    </div>
  );
}