import useAboutSectionAnimation from "./hooks/useAboutSectionAnimation";
import { RefObject, useEffect, useRef } from "react";
import { cloudsShader } from "../../../public/images/clouds";
import { useCloudShader } from "./hooks/useCloudShader";

export default function AboutSectionComponent({
  LightRaysRef,
}: {
  LightRaysRef: RefObject<HTMLDivElement | null>;
}) {
  const contextRefAboutSection = useRef<HTMLDivElement | null>(null);
  const { canvasRef, cameraControl } = useCloudShader(cloudsShader, 640, 360);

  // Passar a uniformsRef para o hook do GSAP
  useAboutSectionAnimation(contextRefAboutSection, LightRaysRef, cameraControl);

  return (
    <section ref={contextRefAboutSection}>
      <div className="w-full h-[400vh] bg-[#000] relative aboutsection z-[10]">
        <div className="w-full h-screen sticky top-0 left-0 flex justify-center items-center">
          <div className="w-full h-screen bg-[#000000] flex justify-center items-center absolute canva-div">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full h-screen"
            />
          </div>
          <p className="text-[15vw] font-canopee text-[#ffffff] opacity-0 abouttext absolute leading-[0.8]">
            Sobre
          </p>
          <div className="w-full h-full absolute grid grid-cols-20 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-full h-full bg-[#000] border-1 translate-y-[100%] border-[#3333335e] relative grid-lines"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
