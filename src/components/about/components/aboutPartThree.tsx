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
          <p className="absolute top-1/2 left-1/2 translate-[-50%] font-canopee text-[5vw] text-nowrap z-5 text-[#333W] welcome-end">
            — E esta é a minha história. —
          </p>

          <div className="w-screen h-full absolute z-10 top-0 left-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#000000] z-20 circle-increase"></div>
            <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#0e0e0e] z-20 circle-increase"></div>
            <div className="absolute top-1/2 left-1/2 translate-[-50%] rounded-full w-[0]  aspect-square bg-[#0a0a0a] z-20 circle-increase"></div>
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
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-20 overflow-visible"
              style={{
                transform: "translate(0, -50%)",

                top: `calc(50% - ${position.current.y}px)`,
                left: `calc(50% + ${position.current.x}px)`,
              }}
            >
              <path
                className="path-lines"
                d="M 0 50 L 30 20 L 100 20"
                stroke="#222"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-[#1b1b1b]">dsadsadsadsdsadsad</div>
    </div>
  );
}
