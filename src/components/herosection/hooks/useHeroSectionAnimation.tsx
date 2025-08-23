import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultHeroSectionConfig = {
  logo: {
    toFirst: {
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
    toAfterNameSplitted: {
      y: "-60%",
      ease: "power1.inout",
    },
  },
  bottomLine: {
    to: {
      y: "100%",
      duration: 3,
    },
    toAfterNameSplitted: {
      y: "60%",
      ease: "power1.inout",
    },
  },
  background: {
    to: {
      scale: "1",
      duration: 8,
    },
    toAfterNameSplitted: {
      scale: 2,
      opacity: 0,
      borderRadius: "20px",
      ease: "power2.inout",
      scrollTrigger: {
        trigger: ".trigger",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    },
  },
  titleDev: {
    toFirst: {
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
  nameSplit: {
    to: {
      y: "0%",
      stagger: 0.15,
      opacity: 1,
      duration: 1,
      delay: 2,
      filter: "blur(0px)",
    },
    toScrollTriggerSettings: {
      filter: "blur(5px)",
      stagger: 0.1,
      opacity: 0,
      ease: "power2.inout",
      scrollTrigger: {
        trigger: ".trigger",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    },
  },
  generalNameAfterSplitted: {
    to: {
      scale: 0.8,
      ease: "power2.inout",
      scrollTrigger: {
        trigger: ".trigger",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    },
  },
};

// Introdução / ligação à nova função.

export default function useHeroSectionAnimation(
  contextRef: RefObject<HTMLDivElement | null>,
  lenisRef: RefObject<Lenis | null>,
  config = defaultHeroSectionConfig
) {
  useGSAP(
    (context) => {
      const nameElement = context?.selector?.(".name");
      if (nameElement) {
        const nameElementSplited = new SplitType(nameElement).chars as
          | HTMLElement[]
          | null;

        const lenis = lenisRef?.current;
        lenis?.scrollTo(0, {
          offset: 0,
          onComplete: () => {
            lenis?.stop();
          },
        });

        context.add(() => {
          // GSAP SET
          gsap.set(".name", {
            opacity: 1,
          });
          gsap.set(nameElementSplited, {
            y: "100%",
            filter: "blur(5px)",
          });
          gsap.set(".iridescence", {
            scale: 6,
          });

          // GSAP TIMELINE
          const tl = gsap.timeline();

          tl.to(".logo-leonardo", {
            ...config.logo.toFirst,
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
            .to(
              ".iridescence",
              {
                ...config.background.to,
                ease: "power3.inOut",
                onComplete: () => {
                  lenis?.start();
                  afterNameSplited(nameElementSplited);
                },
              },
              "<"
            )
            .to(
              ".title-dev",
              {
                ...config.titleDev.toFirst,
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
                ...config.nameSplit.to,
              },
              "<"
            );
        });
      }
    },
    { scope: contextRef }
  );
}

// Introdução / ligação à nova função.

const afterNameSplited = (
  lastChange: HTMLElement[] | null,
  config = defaultHeroSectionConfig
) => {
  const ScreenHeight = window.innerHeight;
  gsap.to(lastChange, {
    ...config.nameSplit.toScrollTriggerSettings,
  });

  gsap.to(".iridescence", {
    ...config.background.toAfterNameSplitted,
  });
  gsap.to(".name", {
    ...config.generalNameAfterSplitted.to,
  });
  // gsap.to(".part-top-init", {
  //   ...config.topLine.toAfterNameSplitted,
  //   scrollTrigger: {
  //     trigger: ".trigger",
  //     start: "top top",
  //     end: `${ScreenHeight * 2.6}px bottom`, // represents 260 vh
  //     scrub: true,
  //   },
  // });
  // gsap.to(".part-down-init", {
  //   ...config.bottomLine.toAfterNameSplitted,
  //   scrollTrigger: {
  //     trigger: ".trigger",
  //     start: "top top",
  //     end: `${ScreenHeight * 2.6}px bottom`, // represents 260 vh
  //     scrub: true,
  //   },
  // });
};
