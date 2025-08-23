import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import SplitType from "split-type";
export default function useAboutSectionAnimation(
  contextRef: RefObject<HTMLDivElement | null>,
  LightRaysRef: RefObject<HTMLDivElement | null>
) {
  useGSAP(
    (context) => {
      context.add(() => {
        const aboutText = context?.selector?.(".abouttext");
        const heightScreen = window.innerHeight;
        const aboutTextSeparated = new SplitType(aboutText).chars;

        gsap.set(aboutText, {
          opacity: 1,
        });
        gsap.set(aboutTextSeparated, {
          opacity: 0,
          filter: "blur(5px)",
          scale: 0.8,
        });

        gsap.to(LightRaysRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top bottom`,
            end: `${heightScreen}  top`,
            scrub: true,
          },
        });
        gsap.to(aboutTextSeparated, {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top top`,
            end: `bottom bottom`,
            scrub: true,
          },
        });
      });
    },
    { scope: contextRef, dependencies: [] }
  );
}
