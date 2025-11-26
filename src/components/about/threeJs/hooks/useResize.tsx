import { useEffect, useState } from "react";

export default function useResize() {
  const [heightScreen, setHeightScreen] = useState<number>(window.innerHeight);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
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

  return { isMobile, heightScreen };
}
