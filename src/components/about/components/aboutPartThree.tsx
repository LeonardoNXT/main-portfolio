import { RefObject, useEffect, useRef, useState } from "react";
import useVisibilityGlobal from "@/app/hooks/useVisibilityGlobal";
import useResize from "../hands/hooks/useResize";
import { Bidimension } from "../hands/hooks/useContentAnimation";
import Scene from "../hands/scene";

export default function AboutPartThree({
  refSection,
}: {
  refSection: RefObject<HTMLDivElement | null>;
}) {
  const stickySection = useRef<HTMLDivElement | null>(null);
  const [zIndex, setZindex] = useState<number>(1);
  const { heightScreen, isMobile } = useResize();
  const position = useRef<Bidimension>({ x: 0, y: 0 });
  const diametro = heightScreen * 0.7;
  const widthCard = (window.innerWidth - diametro) / 2;
  const raio = diametro / 2;

  useEffect(() => {
    const thetaGraus = 45;
    const thetaRadianos = thetaGraus * (Math.PI / 180);

    const cordX = Math.cos(thetaRadianos) * raio;
    const cordY = Math.sin(thetaRadianos) * raio;

    position.current.x = cordX;
    position.current.y = cordY;
  }, [heightScreen, raio]);

  useVisibilityGlobal({
    heightScreen,
    start: 0,
    end: heightScreen * 6.5,
    ref: stickySection,
  });

  useEffect(() => {
    console.log(zIndex);
  }, [zIndex]);

  return (
    <div className="bg-[#ebebeb] h-full mid-about-1">
      <div className="h-[1500vh] w-screen relative" ref={stickySection}>
        <div className="w-full h-screen sticky top-0 opacity-0 opacity-handler">
          <Scene
            zIndex={zIndex}
            setZindex={setZindex}
            refSection={refSection}
            refStickySection={stickySection}
            heightScreen={heightScreen}
            isMobile={isMobile}
          />

          <div className="position absolute left-5 md:left-auto md:right-5 top-10 md:top-20 w-[80%] md:w-[40%] z-5 content-introduction">
            <p className="text-[14px] text-[#444] uppercase font-aeonik title-introduction opacity-0">
              - Quem eu sou -
            </p>
            <p className="mt-2 font-necosmic  text-[#030303] z-10 text-[30px] text-introdution">
              Eu comecei criando páginas simples. Depois, interfaces
              interativas. Hoje, construo sistemas inteiros — do backend à
              experiência final.
            </p>
          </div>
          <p className="absolute top-1/2 left-1/2 translate-[-50%] font-canopee text-[5vw] text-nowrap z-5 text-[#333] welcome-end">
            — E esta é a minha história. —
          </p>

          <div className="w-screen h-full absolute z-10 top-0 left-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#000000] z-20 circle-increase"></div>
            <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#0e0e0e] z-20 circle-increase"></div>
            <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#0c0c0c] z-20 circle-increase"></div>
            <svg
              viewBox="0 0 200 200"
              className="absolute top-1/2 left-1/2 translate-[-50%] z-30 rotate-[-45deg] w-full h-full"
            >
              <circle
                className="circle-hands"
                cx="100"
                cy="100"
                r="70"
                stroke="#222"
                strokeWidth="0.2"
                fill="none"
              />
            </svg>

            <div
              className="absolute w-0 left-1/2 h-[1px] translate-x-[-50%]  bg-[#222] z-20 line-width"
              style={{
                top: `calc(50% - ${raio}px)`,
              }}
            ></div>
            <div
              className="absolute w-0 left-1/2 h-[1px] translate-x-[-50%]  bg-[#222] z-20 line-width"
              style={{
                top: `calc(50% + ${raio}px)`,
              }}
            ></div>
            <div
              className="absolute w-[1px] h-0 top-1/2 translate-y-[-50%]  bg-[#222] z-20 line-height"
              style={{
                left: `calc(50% + ${raio}px)`,
              }}
            ></div>
            <div
              className="absolute w-[1px] h-0 top-1/2 translate-y-[-50%]  bg-[#222] z-20 line-height"
              style={{
                left: `calc(50% - ${raio}px)`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-[#0c0c0c]">dsadsadsadsdsadsad</div>
    </div>
  );
}
