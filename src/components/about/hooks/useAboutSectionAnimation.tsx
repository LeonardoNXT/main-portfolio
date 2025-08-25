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
        const aboutTextSeparated = new SplitType(aboutText).chars;
        console.log(aboutText);
        const heightScreen = window.innerHeight;
        gsap.set(aboutText, {
          opacity: 1,
          scale: 0.8,
        });
        gsap.set(aboutTextSeparated, {
          opacity: 0,
          filter: "blur(5px)",
        });
        gsap.set(".canva-div", {
          opacity: 0,
        });
        gsap.set(".aboutText", {
          display: "flex",
        });

        const textTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top top`,
            end: `${heightScreen * 3} top`,
            scrub: true,
          },
        });

        gsap.to(LightRaysRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top bottom`,
            end: `${heightScreen} top`,
            scrub: true,
          },
        });
        textTimeline
          .to(aboutTextSeparated, {
            opacity: 1,
            stagger: 0.1,
            filter: "blur(0px)",
            duration: 0.4, // 40% da timeline
          })
          .to(
            aboutTextSeparated,
            {
              opacity: 0,
              stagger: 0.1,
              filter: "blur(5px)",
              duration: 0.4, // próximos 40%
            },
            0.6
          ); // começa aos 60% da timeline
        gsap.to(aboutText, {
          scale: 1,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top top`,
            end: `${heightScreen * 2.2} top`,
            scrub: true,
          },
        });

        gsap.to(".grid-lines", {
          y: "-100%",
          stagger: 0.01,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 4.8} top`,
            scrub: true,
          },
        });
        gsap.to(LightRaysRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 3} top`,
            scrub: true,
          },
        });
      });
    },
    { scope: contextRef }
  );
}
