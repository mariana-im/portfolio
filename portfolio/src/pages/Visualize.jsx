import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/visualize/image1.png";
import video1 from "/visualize/video1.mp4";

export default function Visualize() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify hyphens-auto leading-relaxed text-lg lg:text-xl">
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="py-8 pt-10 lg:px-85">
          <div className="justify-between pb-2">
            <div
              className="text-left hyphens-none sinoreta pb-1 text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight w-fit"
              style={{ viewTransitionName: "project-title" }}
            >
              Visualize
            </div>
            <div className="text-lg lg:text-xl pb-2">Cross-Platform Mobile Development</div>
          </div>
          <div className="text-sm lg:text-base">
            <div>
              Role: Mobile Developer (Cross-Platform).
            </div>
            <div>
              Skills: SwiftUI, Kotlin, Figma, UI Design, Cross-Platform
              Development.
            </div>
            <div>
              Timeline: Spring 2026.
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
              Visualize is a mobile analytics and collaboration platform,
              built for Oracle by a 12-person team, that
              lets teams create, share, and discuss charts as easily as
              posting on a social feed, instead of scattering insights
              across spreadsheets, files, and disconnected tools. I worked
              on the cross-platform mobile implementation, taking features
              from Figma prototype through native iOS and Android code,
              including password recovery, profile management, and the
              feed's search and filtering functionality, plus fixing UI
              bugs and implementing linting.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Problem</div>
            <div className="pb-6">
              Building the same app twice, once for iOS and once for Android,
              with two separate teams working in two separate codebases,
              creates a real risk: inconsistent UX and duplicated design
              decisions if the platforms drift apart. The app needed to feel
              and function identically to users regardless of which platform
              they were on, without slowing either team down.
            </div>

            <div className="pb-6">
              I designed UI prototypes in Figma as a shared source of truth
              before any native code was written, so both teams built from
              the same visual and interaction spec.


              From there, I implemented core features natively on each
              platform, coordinating with the Android and iOS teams
              throughout design, development, testing, and deployment.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Solution</div>
            <div className="pb-6">
              Using the Figma prototypes as a single reference point, I built
              features natively rather than relying on a cross-platform
              framework: password recovery, profile management, and a
              search bar that filters the feed's tables in real time,
              implemented in SwiftUI on iOS and Kotlin on Android. To keep
              the interface feeling native on each platform rather than
              like a ported design, I studied Apple's Human Interface
              Guidelines and Android's system bar and foundations
              documentation closely, using them as a reference for
              interaction patterns, spacing, and platform-specific
              conventions throughout user interface design and
              implementation.
              <br />
              <br />
              I fixed several UI bugs and introduced linting into the
              project to catch issues earlier and keep the codebase
              consistent. Working natively on each platform meant matching
              interaction patterns and edge-case handling by hand on both
              sides, checking implementations against each other and
              against the shared Figma spec to keep the experience
              consistent.
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Outcome</div>
            <div className="pb-6">
              The finished platform was presented in a full live demo to
              Oracle, walking through the complete workflow from secure
              login through AI-assisted chart generation, team
              collaboration, and threaded discussion. The features I built
              shipped across both platforms with a consistent experience
              despite the split codebases, and I gained hands-on experience
              with the full mobile development lifecycle, design, native
              implementation, testing, and deployment, across two
              ecosystems at once.
            </div>

            <div className="pb-6">
              <video className="w-full rounded-[.6rem]" controls>
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="font-bold pb-1 text-[1.3rem]">Reflections</div>
            <div className="pb-6">
              Working across two native codebases at the same time taught me
              how much a shared design spec matters before any code gets
              written, Figma wasn't just a design deliverable here, it was
              the thing keeping two independently-moving teams aligned. It
              also gave me a much better sense of where SwiftUI and Kotlin
              genuinely differ in how they handle the same interaction, and
              where that difference needs to be hidden from the user
              entirely.
            </div>
          </div>

          <iframe
            title="Visualize Figma Android Prototype"
            className="w-full aspect-video rounded-[.6rem] pb-6"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/F28SgBIbS2KZx5NJwKUMV2/Oracle-Reto---Visualizaci%C3%B3n?node-id=2545-2134&t=ErdSOc1Lf0VDYUlF-1"
            allowFullScreen
          />

          <iframe
            title="Visualize Figma iOS Prototype"
            className="w-full aspect-video rounded-[.6rem] pb-6"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/F28SgBIbS2KZx5NJwKUMV2/Oracle-Reto---Visualizaci%C3%B3n?node-id=2025-312&t=ErdSOc1Lf0VDYUlF-1"
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