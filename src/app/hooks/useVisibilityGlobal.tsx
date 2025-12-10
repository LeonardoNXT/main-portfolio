import { RefObject, useEffect, useState } from "react";

type Config = {
  ref: RefObject<HTMLDivElement | null>;
  heightScreen: number;
  start: number;
  end: number;
};
export default function useVisibilityGlobal(config: Config) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  useEffect(() => {
    function handleObjVisibility() {
      if (!config.ref.current) return;
      const visibility =
        (config.ref.current.getBoundingClientRect().y - window.innerHeight) *
        -1;

      if (visibility > config.start && visibility < config.end) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    handleObjVisibility();
    window.addEventListener("scroll", handleObjVisibility);

    return () => window.removeEventListener("scroll", handleObjVisibility);
  }, [config]);

  return isVisible;
}
