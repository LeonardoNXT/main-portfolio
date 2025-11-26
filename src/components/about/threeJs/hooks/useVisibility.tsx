import { RefObject, useEffect, useState } from "react";

type Config = {
  refStickySection: RefObject<HTMLDivElement | null>;
  heightScreen: number;
};

export default function useVisibility(config: Config) {
  const [isVisibleFirsh, setIsVisibleFirsh] = useState<boolean>(true);

  useEffect(() => {
    if (!config.refStickySection.current) return;
    const pagina = config.refStickySection.current;

    function handleObj1Visibility() {
      const visibility =
        (pagina.getBoundingClientRect().y - window.innerHeight) * -1;

      if (visibility >= config.heightScreen * 6.5) {
        if (!isVisibleFirsh) return;
        setIsVisibleFirsh(false);
      } else {
        if (isVisibleFirsh) return;
        setIsVisibleFirsh(true);
      }
    }

    window.addEventListener("scroll", handleObj1Visibility);

    return () => {
      window.removeEventListener("scroll", handleObj1Visibility);
    };
  }, [config.refStickySection, config.heightScreen, isVisibleFirsh]);

  return { isVisibleFirsh };
}
