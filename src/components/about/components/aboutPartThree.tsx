import { RefObject, useRef } from "react";
import Scene from "../threeJs/scene";
import useVisibilityGlobal from "@/app/hooks/useVisibilityGlobal";
import useResize from "../threeJs/hooks/useResize";

export default function AboutPartThree({
  refSection,
}: {
  refSection: RefObject<HTMLDivElement | null>;
}) {
  const stickySection = useRef<HTMLDivElement | null>(null);
  const { heightScreen, isMobile } = useResize();

  useVisibilityGlobal({
    heightScreen,
    start: 0,
    end: heightScreen * 6.5,
    ref: stickySection,
  });
  return (
    <div className="bg-[#ebebeb] h-full mid-about-1">
      <div className="h-[1250vh] w-screen relative" ref={stickySection}>
        <div className="w-full h-screen sticky top-0 opacity-0 opacity-handler">
          <Scene
            refSection={refSection}
            refStickySection={stickySection}
            heightScreen={heightScreen}
            isMobile={isMobile}
          />

          <div className="position absolute left-5 md:left-auto md:right-5 top-10 md:top-20 w-[80%] md:w-[40%] content-introduction">
            <p className="text-[14px] text-[#333] uppercase font-aeonik title-introduction opacity-0">
              - Quem eu sou -
            </p>
            <p className="mt-2 font-necosmic  text-[#030303] z-10 text-[30px] text-introdution">
              Eu comecei criando páginas simples. Depois, interfaces
              interativas. Hoje, construo sistemas inteiros — do backend à
              experiência final.
            </p>
          </div>
          <p className="absolute top-1/2 left-1/2 translate-[-50%] font-canopee text-5xl text-[#333] welcome-end">
            — E esta é a minha história. —
          </p>
          <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#fff] z-20 circle-increase"></div>
        </div>
      </div>
    </div>
  );
}
