import DetailNav from "../components/DetailNav";
import DetailFooter from "../components/DetailFooter";

import image2 from "/leyendasdelsol/image2.png";
import image4 from "/leyendasdelsol/image4.png";
import image5 from "/leyendasdelsol/image5.png";
import gif2 from "/leyendasdelsol/gif2.gif";

export default function Leyendas() {
  return (
    <div className="overflow-x-hidden pb-0 overflow-hidden text-justify leading-none w-fit"
      style={{ viewTransitionName: "project-title" }}>
      <DetailNav />

      <div className="flex assistant flex-col pb-0 p-7 pt-20 lg:pb-0 lg:p-25">
        <div className="flex flex-row justify-between items-center py-8 pt-10">
          <div>
            <div className="sinoreta text-left text-5xl lg:text-7xl">
              Leyendas del Sol
            </div>
            <div className="text-xl">RPG Videogame</div>
          </div>
        </div>
        <hr />

        <div className="pt-8">
          <div className="text-xl">
            <div className="pb-0">
              Leyendas del Sol is an RPG videogame that highlights Sonora's
              cultural importance. Including topics such as local folklore,
              native protagonists and emblematic locations we were able to
              create a videogame that is equally engaging as it is filled
              with culture. Developed in Ludic Jam 2024, a hackathon focused
              on game development, at Tecnológico de Monterrey, campus Sonora
              Norte. Our team of several women in STEM careers was called
              Vidgo.
              <br />
              <br />
              Fun fact: Vidgo comes from the word Video Juego a play on the
              spanish word of Video Game.
            </div>
            <div className="flex justify-center">
              <img className="w-140" src={image4} alt="" />
            </div>

            <div className="lg:flex lg:gap-20 justify-between">
              <div>
                <div className="pt-6 text-4xl">
                  I worked as a <b>UI/UX designer</b>, <b>writer</b>,{" "}
                  <b>artist</b>, and <b>full-stack developer</b>.
                </div>
                <div className="py-6">
                  We focused the narrative on a female protagonist who
                  embarks on a journey to save her best friend from the
                  influence of several urban legends. Once the narrative was
                  defined, we designed each character with careful attention
                  to how their visual identity reflected their personality
                  and backstory. With the story and characters established,
                  we moved on to the visual design of the video game,
                  prioritizing an engaging and immersive player experience.
                  Taking on multiple roles, such as sprite animation and
                  programming, presented a challenge, which we addressed by
                  dividing tasks efficiently and maintaining clear, effective
                  communication within the team.
                </div>
              </div>
            </div>

            <div className="lg:flex lg:gap-20 justify-between py-6">
              <div className="flex flex-col lg:w-[35rem] justify-center gap-5">
                <div className="text-4xl">
                  Being able to develop and showcase this product that
                  represents part of my <b>culture</b> proved to be such a
                  rewarding experience.
                </div>
              </div>
              <div className="justify-center flex lg:block">
                <img
                  className="py-10 lg:py-0 w-[40rem]"
                  loading="lazy"
                  src={gif2}
                  alt=""
                />
              </div>
            </div>

            <div className="pb-6 lg:py-6 pb-10">
              This project strengthened my ability to collaborate across
              disciplines, adapt quickly to technical challenges, and design
              experiences that merge storytelling, visual identity, and
              interaction in a cohesive way.
            </div>
          </div>

          <div className="flex justify-center">
            <img
              className="lg:w-[19rem] lg:h-[25rem] sm:w-[12rem] sm:h-[16rem] w-[10rem] h-[14rem] mb-6"
              loading="lazy"
              src={image2}
              alt=""
            />
            <img
              className="lg:w-[22rem] lg:h-[25rem] sm:w-[14rem] sm:h-[16rem] w-[12rem] h-[14rem] mb-6"
              loading="lazy"
              src={image5}
              alt=""
            />
          </div>
        </div>

        <DetailFooter />
      </div>
    </div>
  );
}
