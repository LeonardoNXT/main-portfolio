import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type Config = {
  trigger: RefObject<HTMLDivElement | null>;
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
  heightScreen: number;
};
export default function useLightRays(config: Config) {
  useEffect(() => {
    const visibility = () => {
      if (!config.trigger.current || !config.setState) return;

      const screenHeight = config.heightScreen;
      const div = config.trigger.current;
      const params = div.getBoundingClientRect();
      const top = (params.top - screenHeight) * -1;

      if (top < 0 || top > screenHeight * 4.5) {
        if (!config.state) return;
        config.setState(false);
      } else {
        if (config.state) return;
        config.setState(true);
      }
    };

    visibility();
    window.addEventListener("scroll", visibility);

    return () => window.removeEventListener("scroll", visibility);
  }, [
    config.heightScreen,
    config.setState,
    config.state,
    config.trigger,
    config,
  ]);
}
