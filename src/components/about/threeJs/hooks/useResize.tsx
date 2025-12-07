import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/gsap-core";

export default function useResize() {
  const [heightScreen, setHeightScreen] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    function calcIsMobile() {
      const isMobileVarible = window.innerWidth < 768;
      setIsMobile(isMobileVarible);
      setHeightScreen(window.innerHeight);
    }
    calcIsMobile();

    window.addEventListener("resize", calcIsMobile);

    return () => {
      window.removeEventListener("resize", calcIsMobile);
    };
  }, []);

  useEffect(() => console.log(heightScreen), [heightScreen]);

  return { isMobile, heightScreen };
}
