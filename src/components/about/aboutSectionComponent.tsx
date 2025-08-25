import useAboutSectionAnimation from "./hooks/useAboutSectionAnimation";
import { RefObject, useRef } from "react";

export default function AboutSectionComponent({
  LightRaysRef,
}: {
  LightRaysRef: RefObject<HTMLDivElement | null>;
}) {
  const contextRefAboutSection = useRef<HTMLDivElement | null>(null);

  // Passar a uniformsRef para o hook do GSAP
  useAboutSectionAnimation(contextRefAboutSection, LightRaysRef);

  return (
    <section ref={contextRefAboutSection}>
      <div className="w-full h-[800vh] bg-[#000] relative aboutsection z-[10]">
        <div className="w-full h-screen sticky top-0 left-0 flex justify-center items-center overflow-hidden">
          <div className="w-full h-screen bg-[#000000] flex justify-center items-center absolute canva-div"></div>
          <p className="text-9xl md:text-[15vw] font-canopee text-[#ffffff] opacity-0 abouttext absolute leading-[0.8]">
            Sobre
          </p>
          <div className="w-full h-screen absolute flex">
            <div className="w-screen h-full absolute grid grid-cols-20 overflow-hidden pointer-events-none primary-line">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-[100vh] bg-gradient-to-b bg-[#000] relative grid-lines border-1 border-[#0a0a0a]"
                  style={{ transform: "translateY(100%)" }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
