"use client";
import HeroSectionComponent from "@/components/herosection/heroSectionComponent";
import Noise from "@/components/noise";
import { useLenis } from "./hooks/useLenis";
import { RefObject, useEffect, useState } from "react";
import Lenis from "lenis";

export default function HomeContent() {
  const [lenisHook, setLenisHook] = useState<RefObject<Lenis | null> | null>(
    null
  );
  const lenis = useLenis(0.05);

  useEffect(() => {
    setLenisHook(lenis);
  }, [lenis]);

  return (
    <main className="relative w-full h-auto">
      <div className="sticky top-0 left-0 z-10 pointer-events-none">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>
      {lenisHook && <HeroSectionComponent lenis={lenisHook} />}
      <div className="w-full h-screen"></div>
    </main>
  );
}
