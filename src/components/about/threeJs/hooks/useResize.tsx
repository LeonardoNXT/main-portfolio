import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap/gsap-core";

export default function useResize() {
  const [heightScreen, setHeightScreen] = useState<number>(window.innerHeight);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    function calcIsMobile() {
      const isMobileVarible = window.innerWidth < 768;
      setIsMobile(isMobileVarible);
      setHeightScreen(window.innerHeight);
      ScrollTrigger.refresh();
    }
    calcIsMobile();

    window.addEventListener("resize", calcIsMobile);

    return () => {
      window.removeEventListener("resize", calcIsMobile);
    };
  }, []);

  return { isMobile, heightScreen };
}
