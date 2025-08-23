"use client";
import HeroSectionComponent from "@/components/herosection/heroSectionComponent";
import Noise from "@/components/noise";
import { useLenis } from "./hooks/useLenis";
import { RefObject, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import AboutSectionComponent from "@/components/about/aboutSectionComponent";
import LightRays from "@/components/lightRays";

export default function HomeContent() {
  const [lenisHook, setLenisHook] = useState<RefObject<Lenis | null> | null>(
    null
  );
  const lenis = useLenis(0.05);
  const LightRaysRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setLenisHook(lenis);
  }, [lenis]);

  return (
    <main className="relative w-full h-auto">
      <div className="sticky w-full h-full top-0 left-0 z-10 pointer-events-none">
        <div className="absoulute w-full h-full top-0 left-0">
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>
        <div
          className="absoulute w-full h-full top-0 left-0 opacity-0"
          ref={LightRaysRef}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays absolute top-0"
          />
        </div>
      </div>
      {lenisHook && <HeroSectionComponent lenis={lenisHook} />}
      <AboutSectionComponent LightRaysRef={LightRaysRef} />
    </main>
  );
}
