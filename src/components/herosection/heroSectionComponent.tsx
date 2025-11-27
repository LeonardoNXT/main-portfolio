import Iridescence from "./background";
import { RefObject, useRef } from "react";
import Image from "next/image";
import useHeroSectionAnimation from "./hooks/useHeroSectionAnimation";
import Lenis from "lenis";
import useBackground from "./hooks/usebackground";

type HeroSectionProps = {
  lenis: RefObject<Lenis | null>;
};

export default function HeroSectionComponent({ lenis }: HeroSectionProps) {
  const contextRef = useRef<HTMLDivElement | null>(null);
  useHeroSectionAnimation(contextRef, lenis);
  const bgIsActive = useBackground({ trigger: contextRef });

  return (
    <section ref={contextRef}>
      <div className="w-full h-[300vh] relative bg-[#000] trigger">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <div className="w-full h-full absolute top-0 left-0 saturate-0 iridescence invert-100 scale-600">
            {bgIsActive && (
              <Iridescence
                color={[1, 1, 1]}
                mouseReact={false}
                amplitude={0.1}
                speed={1.0}
              />
            )}
          </div>
          <div className="w-full h-screen absolute z-20 pointer-events-none init">
            <div className="w-full h-full absolute top-0 left-0 grid grid-cols-1">
              {[...Array(1)].map((map, i) => (
                <div
                  key={i}
                  className="w-full h-0 rotate-180 bg-[#000] relative z-20 vertical-lines"
                ></div>
              ))}
            </div>
            <Image
              src="/images/logo.png"
              alt="logo-leonardo"
              width={240}
              height={240}
              className="w-[120px] invert-100 absolute top-1/2 left-1/2 translate-[-50%] rotate-270 logo-leonardo opacity-0"
            />
            <div className="w-full h-1/2 bg-[#000000] part-top-init"></div>
            <div className="w-full h-1/2 bg-[#000000] part-down-init"></div>
            <p className="invert-100 absolute top-1/2 left-1/2 translate-[-50%] font-necosmic text-nowrap text-[6vw] md:text-[40px] text-[#333] title-dev opacity-0">
              FullStack Developer
            </p>
            <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center"></div>
          </div>
          <div className="top-1/2 left-1/2 translate-[-50%] mix-blend-difference text-nowrap z-10 font-grifinito text-[50vw] absolute">
            <p className="w-full text-center text-[#ffffff] name leading-[0.7] opacity-0">
              Leonardo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
