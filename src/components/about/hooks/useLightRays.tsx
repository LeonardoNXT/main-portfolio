import { SizeType } from "@/app/hooks/useSize";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type Config = {
  trigger: RefObject<HTMLDivElement | null>;
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
};
export default function useLightRays(config: Config, size: SizeType) {
  useEffect(() => {
    const visibility = () => {
      if (!config.trigger.current || !config.setState) return;

      const div = config.trigger.current;
      const params = div.getBoundingClientRect();
      const top = (params.top - size.height) * -1;

      if (top < 0 || top > size.height * 4.5) {
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
  }, [config.setState, config.state, config.trigger, config, size]);
}
