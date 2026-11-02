import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image1 from "/guardian/image1.png";
import image2 from "/guardian/image2.png";
import image3 from "/guardian/image3.png";
import image4 from "/guardian/image4.png";
import image5 from "/guardian/image5.png";
import image6 from "/guardian/image6.png";
import image7 from "/guardian/image7.png";
import image8 from "/guardian/image8.png";
import image9 from "/guardian/image9.png";
import image10 from "/guardian/image10.png";

export default function Guardian() {
    return (
        <div className="overflow-x-hidden pb-0 overflow-hidden text-justify hyphens-auto leading-relaxed text-lg lg:text-xl">
            <DetailNav />

            <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
                <div className="py-8 pt-10 lg:px-85">
                    <div className="justify-between pb-2">
                        <div
                            className="text-left hyphens-none sinoreta pb-1 text-4xl md:text-5xl lg:text-[3rem] font-bold leading-tight"
                        >
                            Guardian of the True North
                        </div>
                        <div className="text-lg lg:text-xl pb-2">Educational Game & HCI Research</div>
                    </div>
                    <div className="text-sm lg:text-base">
                        <div>
                            Role: Game Designer, Developer, and Accessibility Researcher.
                        </div>
                        <div>
                            Skills: Game Design, Unity, C#, UX Research, Usability
                            Testing, Accessibility Auditing.
                        </div>
                        <div>
                            Timeline: Summer 2026.
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
            Guardian of the True North is a 2D educational RPG that I worked on
            during my Mitacs Globalink Research Internship at Ontario Tech
            University. It's designed mainly for newcomers to Canada. Instead of
            teaching culture as a list of facts, it places each cultural element in
            the region it belongs to, so players learn that a bunny hug is a hoodie
            by exploring the Prairies, where the word is used. Each region ends with
            a knowledge check that earns the player a key, and the keys make the
            final boss fight easier.
        </div>

        <div className="flex justify-between pb-6">
            <img
                className="w-[48%]"
                loading="lazy"
                src={image2}
                alt="Prairie's region scene from the game"
            />
            <img
                className="w-[48%]"
                loading="lazy"
                src={image3}
                alt="Minigame screen from the game where players order totems in the correct sequence"
            />
        </div>

        <div className="font-bold pb-1 text-[1.3rem]">Problem</div>
        <div className="pb-6">
            When I joined the project, the game was already in development but far
            from complete. It had bugs, missing assets, and accessibility issues that
            made it hard for players to engage with the content. The internship was
            only 12 weeks, so I had to decide which issues to tackle first to make
            the most impact in that time.
            <br /><br />
            The game had also been built by other students before me, so I had to
            learn their codebase and make changes without breaking existing
            functionality.
        </div>

        <div className="font-bold pb-1 text-[1.3rem]">Solution</div>
        <div className="pb-6">
            I started by getting to know the game as a whole: its purpose, its
            intended audience, and the player journey from beginning to end. Then I
            playtested it, looking for interface problems, bugs, and accessibility
            gaps. I also audited it against the{" "}
            <a
                href="https://gameaccessibilityguidelines.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
            >
                Game Accessibility Guidelines
            </a>, which surfaced gaps in visual contrast, text readability, and
            control complexity.
            <br /><br />
            With 12 weeks, I couldn't fix everything, so I put every issue into a
            shared task list for the team, ranked by priority, estimated time to
            resolve, target deadline, and who was responsible for completing the task. I started with the issues that
            blocked progress or made the game hard to read and see, and left polish
            for later.
            <br /><br />
            Accessibility drove most of my design decisions. I researched readable
            and dyslexia-friendly fonts and recommended one consistent font across
            the game. I designed
            seven original pixel-art assets in the game's existing style, based on
            everyday Canadian objects like a toque (beanie), a chesterfield (couch),
            a double double (coffee order), and a bunny hug (hoodie). I
            checked each one in black and white to make sure it had enough contrast
            for players with color vision deficiencies.
            <br /><br />
            <div className="flex justify-center">
            <img className="w-[30%]" src={image5} alt="Double double (coffee)" />
            <img className="w-[30%]" src={image7} alt="Snow brush" />
            <img className="w-[30%]" src={image8} alt="Toque (beanie)" />
        </div>

        <div className="flex justify-center pb-6">
            <img className="w-[30%]" src={image9} alt="Chesterfield (couch)" />
            <img className="w-[30%]" src={image10} alt="Bunny hug (hoodie)" />
        </div>
            Because I was also working in the code, I could fix the problems I found
            myself. Five keys unlock the final boss, one from each area's knowledge
            check, but players were starting with keys they hadn't earned, and
            collected objects weren't remembered after quizzes. I fixed both. I also
            made the game remember which characters players had talked to, because this
            was an essential function so that the game could proceed as intended and so that they
            didn't have to repeat sections of the game when re-entering areas.
            <br /><br />
            In the Prairies sorting minigame, where players guide items into the
            right container, I built the new objects, added them to the game, and
            fixed the minigame's core logic. In the Geo Map Guesser, a geography
            minigame where players pick regions on a map, I fixed several bugs including
             getting stuck when you return from the minigame or receiving duplicate keys as a reward.
            <br /><br />
            On the interface side, I improved the interaction areas for signs and
            characters, added missing dialogue indicators and sound effects, and
            stopped the player from moving or attacking while the inventory is open.
            I also corrected camera zoom and scene transition issues, and redesigned
            the quiz, inventory, and victory screens so they look consistent. I
            tested each change myself after making it.
        </div>


            <div className="flex justify-between pb-6">
        <img
            className="w-[48%]"
            loading="lazy"
            src={image1}
            alt="Cozy room where players can explore and interact with objects"
        />
        <img
            className="w-[48%]"
            loading="lazy"
            src={image4}
            alt="Knowledge check quiz screen shown after exploring a room and its objects"
        />
    </div>
        

        <div className="font-bold text-[1.3rem]">Outcome</div>
        <div className="pb-6">
            At the end of the internship, we evaluated the game with 30 participants.
            Before and after one play session, they took the same 25-item cultural
            knowledge quiz and completed a UX questionnaire and an interview, while
            the game logged gameplay telemetry. Every participant improved, with quiz
            scores rising from an average of 11 to 22 out of 25. Newcomers to Canada
            gained the most, and after one session they scored about the same as
            people who had lived in Canada for years. Players also read 84.5% of the
            in-game dialogue to the end, so the gains didn't come from clicking
            through text, and they rated enjoyment and meaning as the best parts of
            the experience.
            <br /><br />
            The study also showed where the game fell short. 13 of 30 participants
            got lost and asked for a map. The wind guide, a subtle cue meant to point
            players toward unexplored areas, wasn't recognized as guidance by any
            participant who mentioned it. Quebec, the scene with the most text, also had
            the lowest share of dialogue read to the end.
            <br /><br />
            I helped plan and run the sessions, observed participants, and documented
            usability problems. I also contributed to the research paper by preparing
            notes, methodology and appendix material, and by
            reviewing sections and references. The paper was submitted to CHI 2027.
            Because the study took place at the end of the internship, these issues
            were documented as next steps rather than fixed.
        </div>

        <div className="font-bold text-[1.3rem]">Reflections</div>
        <div className="pb-6">
            This project taught me to treat accessibility as a core design constraint
            from the start, not an afterthought. Auditing against a real framework
            showed me how small changes in contrast and control complexity affect who
            can actually play and learn from a game.
            <br /><br />
            Watching real players showed me how often what the team assumed was
            obvious wasn't. The wind guide worked technically but didn't read as
            guidance, which taught me that a feature has to be understood by players,
            not just function. Next time I'd bring real players in earlier, while
            there's still time to act on what they show me.
            <br /><br />
            It also showed me that culture has to be represented accurately and
            respectfully, which takes real research and not just good intentions.
            Finally, working inside an existing codebase taught me to make careful,
            incremental changes without breaking what already worked.
        </div>
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