import { RefObject, useEffect, useState } from "react";

type Config = {
  trigger: RefObject<HTMLDivElement | null>;
};
export default function useBackground(config: Config) {
  const [backgroundIsActive, setBackgroundIsActive] = useState<boolean>(false);

  useEffect(() => {
    const visibility = (): void => {
      if (!config.trigger.current) return;
      const reference = config.trigger.current.getBoundingClientRect();
      const refHeight = reference.height;
      const topPosition = (reference.top - window.innerHeight) * -1;

      if (topPosition > refHeight) {
        setBackgroundIsActive(false);
      } else {
        setBackgroundIsActive(true);
      }
    };

    window.addEventListener("scroll", visibility);
    visibility();

    return () => window.removeEventListener("scroll", visibility);
  }, [config.trigger]);

  return backgroundIsActive;
}
