import { RefObject } from "react";
import Scene from "../threeJs/scene";

export default function AboutPartThree({
  refSection,
}: {
  refSection: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="bg-[#ebebeb] h-full mid-about-1">
      <div className="h-[1000vh] w-screen relative">
        <div className="w-full h-screen sticky top-0 opacity-0 opacity-handler">
          <Scene refSection={refSection} />
          <div className="position absolute left-5 md:left-auto md:right-5 top-10 md:top-20 w-[80%] md:w-[40%] content-introduction">
            <p className="text-[14px] text-[#333] uppercase font-aeonik title-introduction opacity-0">
              - Quem eu sou -
            </p>
            <p className="mt-2 font-necosmic  text-[#030303] z-10 text-[30px] text-introdution">
              Olá denovo! Meu nome é Leonardo Leal e sou um programdor Full
              Stack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
