"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const useLenis = (lerp: number) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!lerp || lerp <= 0) {
      console.log(
        "Coloque o argumento lerp: useLenis(lerp:number) ou defina um valor maior que 0"
      );
      return;
    }

    const lenis = new Lenis({
      lerp: lerp,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // cancela RAF pendente
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lerp]);

  return lenisRef;
};
