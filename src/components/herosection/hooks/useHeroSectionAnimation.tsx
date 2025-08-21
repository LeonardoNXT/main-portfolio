import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";

const defaultHeroSectionConfig = {
  logo: {
    toFirsh: {
      opacity: 1,
      duration: 1,
    },
    toEnd: {
      opacity: 0,
      duration: 1,
      delay: 1,
    },
  },
  topLine: {
    to: {
      y: "-100%",
      duration: 3,
      delay: 1,
    },
  },
  bottomLine: {
    to: {
      y: "100%",
      duration: 3,
    },
  },
  background: {
    to: {
      scale: "1",
      duration: 10,
    },
  },
  titleDev: {
    toFirsh: {
      opacity: 1,
      duration: 1,
      delay: 2.5,
    },
    toEnd: {
      opacity: 0,
      duration: 1,
      delay: 2,
    },
  },
  nameSplited: {
    to: {
      y: "0%",
      stagger: 0.15,
      opacity: 1,
      duration: 1,
      delay: 2,
      filter: "blur(0px)",
    },
  },
};

export default function useHeroSectionAnimation(
  contextRef: RefObject<HTMLDivElement | null>,
  config = defaultHeroSectionConfig
) {
  useGSAP(
    (context) => {
      const nameElement = context?.selector?.(".name");
      if (nameElement) {
        const nameElementSplited = new SplitType(nameElement).chars;

        const tl = gsap.timeline();

        context.add(() => {
          tl.to(".logo-leonardo", {
            ...config.logo.toFirsh,
          })
            .to(".logo-leonardo", {
              ...config.logo.toEnd,
            })
            .to(".part-top-init", {
              ...config.topLine.to,
              ease: "power2.inOut",
            })
            .to(
              ".part-down-init",
              {
                ...config.bottomLine.to,
                ease: "power2.inOut",
              },
              "<"
            )
            .set(
              ".name",
              {
                opacity: 1,
              },
              "<"
            )
            .set(
              nameElementSplited,
              {
                y: "100%",
                filter: "blur(5px)",
              },
              "<"
            )
            .set(
              ".iridescence",
              {
                scale: 6,
              },
              "<"
            )
            .to(
              ".iridescence",
              {
                ...config.background.to,
                ease: "power3.inOut",
              },
              "<"
            )
            .to(
              ".title-dev",
              {
                ...config.titleDev.toFirsh,
              },
              "<"
            )
            .to(
              ".title-dev",
              {
                ...config.titleDev.toEnd,
              },
              "<"
            )
            .to(
              nameElementSplited,
              {
                ...config.nameSplited.to,
              },
              "<"
            );
        });
      }
    },
    { scope: contextRef }
  );
}
