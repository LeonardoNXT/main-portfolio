import Iridescence from "./background";
import { RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import useHeroSectionAnimation from "./hooks/useHeroSectionAnimation";
import Lenis from "lenis";

type HeroSectionProps = {
  lenis: RefObject<Lenis | null>;
};

export default function HeroSectionComponent({ lenis }: HeroSectionProps) {
  const contextRef = useRef<HTMLDivElement | null>(null);
  useHeroSectionAnimation(contextRef, lenis);
  return (
    <div
      className="w-full h-screen relative saturate-0 overflow-hidden"
      ref={contextRef}
    >
      <div className="w-full h-screen absolute z-10 pointer-events-none init">
        <Image
          src="/images/logo.png"
          alt="logo-leonardo"
          width={240}
          height={240}
          className="w-[120px] invert-100 absolute top-1/2 left-1/2 translate-[-50%] rotate-270 logo-leonardo opacity-0"
        />
        <div className="w-full h-1/2 bg-[#000000] part-top-init"></div>
        <div className="w-full h-1/2 bg-[#000000] part-down-init"></div>
        <p className="invert-100 absolute top-1/2 left-1/2 translate-[-50%] text-nowrap text-[30px] md:text-[40px] text-[#333] title-dev opacity-0">
          Full Stack Developer
        </p>
      </div>
      <div className="w-full h-full absolute top-0 left-0  iridescence invert-100 scale-600">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <div className="w-full h-full flex justify-center items-center  mix-blend-difference z-10 font-grifinito text-[50vw] absolute">
        <p className="w-full text-center text-[#ffffff] name leading-[0.7] opacity-0">
          Leonardo
        </p>
      </div>
    </div>
  );
}
