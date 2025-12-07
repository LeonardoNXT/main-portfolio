import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type Config = {
  trigger: RefObject<HTMLDivElement | null>;
  setState: Dispatch<SetStateAction<boolean>>;
  heightScreen: number;
};
export default function useNoise(config: Config) {
  useEffect(() => {
    const visibility = () => {
      if (!config.trigger.current || !config.setState) return;

      const screenHeight = config.heightScreen;
      const div = config.trigger.current;
      const params = div.getBoundingClientRect();
      const top = (params.top - screenHeight) * -1;

      if (top > screenHeight * 4.5) {
        config.setState(false);
      } else {
        config.setState(true);
      }
    };

    visibility();
    window.addEventListener("scroll", visibility);

    return () => window.removeEventListener("scroll", visibility);
  }, [config.trigger, config.heightScreen, config.setState, config]);
}
