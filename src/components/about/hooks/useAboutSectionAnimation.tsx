import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import SplitType from "split-type";
import { SizeType } from "@/app/hooks/useSize";

export default function useAboutSectionAnimation(
  contextRef: RefObject<HTMLDivElement | null>,
  LightRaysRef: RefObject<HTMLDivElement | null>,
  NoiseRef: RefObject<HTMLDivElement | null>,
  size: SizeType
) {
  useGSAP(
    (context) => {
      // Se heightScreen for 0, não inicializa nada

      const heightScreen = size.height;
      const widthScreen = size.width;

      if (!heightScreen || !widthScreen) return;

      context.add(() => {
        if (!context || !context.selector) return;
        const aboutText = context.selector(".abouttext");
        const circles = context?.selector?.(".circle");
        const aboutTextSeparated = new SplitType(aboutText).chars;

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
            invalidateOnRefresh: true,
          },
        });

        textTimeline
          .to(aboutTextSeparated, {
            opacity: 1,
            stagger: 0.1,
            filter: "blur(0px)",
            duration: 0.4,
          })
          .to(
            aboutTextSeparated,
            {
              opacity: 0,
              stagger: 0.1,
              filter: "blur(5px)",
              duration: 0.4,
            },
            0.6
          );

        gsap.to(aboutText, {
          scale: 1,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top top`,
            end: `${heightScreen * 2.2} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".grid-lines", {
          y: `-100%`,
          stagger: 0.01,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 4.8} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".grid-lines-1", {
          y: `100%`,
          stagger: 0.01,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 4.8} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(".slider", {
          x: `-${
            document.querySelector(".slider")?.getBoundingClientRect().width ||
            widthScreen
          }px`,
        });

        gsap.to(".slider", {
          x: 0,
          "--start": "black",
          "--end": "white",
          stagger: 0.01,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 2} top`,
            end: `${heightScreen * 2.8} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const tl = gsap.timeline();

        // Fade in
        tl.to(LightRaysRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: "top bottom",
            end: `${heightScreen} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Fade out
        tl.to(LightRaysRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 3} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // termina o aboutpartone

        gsap.to(".lines-3", {
          opacity: 0,
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen * 0.2} top`,
            end: `${heightScreen} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (circles) {
          circles.forEach((circle: SVGCircleElement) => {
            const length = circle.getTotalLength();
            circle.style.strokeDasharray = String(length);
            circle.style.strokeDashoffset = String(length);
          });

          gsap.to(circles, {
            strokeDashoffset: 0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: ".init-about",
              start: `${heightScreen * 0.2} top`,
              end: `${heightScreen} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          gsap.to(circles, {
            opacity: 0,
            stagger: 1,
            scrollTrigger: {
              trigger: ".init-about",
              start: `${heightScreen} top`,
              end: `${heightScreen * 2} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          gsap.to(".circle-content", {
            scale: 4,
            scrollTrigger: {
              trigger: ".init-about",
              start: `${heightScreen} top`,
              end: `${heightScreen * 5} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          const growthCircle =
            window.innerWidth < 800
              ? window.innerHeight * 1.5
              : window.innerWidth * 2;

          gsap.to(".circle-fill", {
            width: growthCircle,
            stagger: 0.05,
            scrollTrigger: {
              trigger: ".init-about",
              start: `${heightScreen + heightScreen / 2} top`,
              end: `${heightScreen * 3.5} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        const tlCircle = gsap.timeline({
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen + heightScreen} top`,
            end: `${heightScreen * 4.5} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (!NoiseRef.current) return;

        tlCircle
          .to(
            ".circle-transition",
            {
              background: "#ffffff",
              duration: 0.5,
            },
            0
          )
          .to(
            NoiseRef.current,
            {
              opacity: 0,
            },
            0
          )
          .to(
            ".circle-transition",
            {
              background: "#ebebeb",
              duration: 0.5,
            },
            0.5
          );

        gsap.to(".letter-1", {
          opacity: 1,
          bottom: `${window.innerHeight + window.innerHeight * 0.5}px`,
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen * 2.7} top`,
            end: `${heightScreen * 4.5} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".letter-2", {
          opacity: 1,
          bottom: `${window.innerHeight + window.innerHeight * 0.5}px`,
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen * 3.5} top`,
            end: `${heightScreen * 5.5} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".letter-3", {
          opacity: 1,
          bottom: `${window.innerHeight + window.innerHeight * 0.5}px`,
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen * 4} top`,
            end: `${heightScreen * 6.0} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        const welcome = new SplitType(".welcome").chars;

        gsap.to(welcome, {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen * 2.4} top`,
            end: `${heightScreen * 3.5} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(welcome, {
          color: "transparent",
          ease: "power1.inOut",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".init-about",
            start: `${heightScreen * 3.5} top`,
            end: `${heightScreen * 4.5} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // FIM do aboutPartTWO

        gsap.to(".line-4", {
          translateY: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".mid-about",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    {
      scope: contextRef,
      dependencies: [size.height, size.width],
      revertOnUpdate: true,
    }
  );
}
