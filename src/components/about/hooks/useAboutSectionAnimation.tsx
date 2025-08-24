import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import SplitType from "split-type";

type CameraControl = {
  pos: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  roll: number;
};

export default function useAboutSectionAnimation(
  contextRef: RefObject<HTMLDivElement | null>,
  LightRaysRef: RefObject<HTMLDivElement | null>,
  cameraControl: RefObject<CameraControl>
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
        gsap.to(LightRaysRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top bottom`,
            end: `${heightScreen} top`,
            scrub: true,
          },
        });
        gsap.to(aboutTextSeparated, {
          opacity: 1,
          stagger: 0.1,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `top top`,
            end: `${heightScreen * 1.2} top`,
            scrub: true,
          },
        });
        gsap.to(aboutTextSeparated, {
          y: "300%",
          filter: "blur(5px)",
          opacity: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.3} top`,
            end: `${heightScreen * 3} top`,
            scrub: true,
          },
        });
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
        gsap.set(".canva-div", {
          display: "hone",
          opacity: 0,
        });
        gsap.to(".canva-div", {
          display: "block",
          opacity: 1,

          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 3} top`,
            scrub: true,
          },
        });

        // CAMERA CONTROL CORRIGIDO
        const animateCamera = { progress: 0 };

        gsap.to(animateCamera, {
          progress: 1,
          ease: "power1.inOut",
          onUpdate: () => {
            if (cameraControl.current) {
              const t = animateCamera.progress;

              // Valores iniciais (dentro das nuvens)
              const startPosY = -1; // começar abaixo das nuvens
              const startTargetY = -1; // olhando na mesma altura

              // Valores finais (acima das nuvens)
              const endPosY = 0.5; // subir bem alto
              const endTargetY = 0.5; // manter o olhar na mesma altura

              // Interpolar entre valores inicial e final
              cameraControl.current.pos.y = gsap.utils.interpolate(
                startPosY,
                endPosY,
                t
              );
              cameraControl.current.target.y = gsap.utils.interpolate(
                startTargetY,
                endTargetY,
                t
              );
            }
          },

          scrollTrigger: {
            trigger: ".aboutsection",
            start: `${heightScreen * 1.2} top`,
            end: `${heightScreen * 3} top`,
            scrub: 1.5,
          },
        });

        // gsap.to(".grid-lines", {
        //   y: 0,
        //   stagger: 0.01,
        //   scrollTrigger: {
        //     trigger: ".aboutsection",
        //     start: `${heightScreen * 1.2} top`,
        //     end: `${heightScreen * 3} top`,
        //     scrub: true,
        //   },
        // });
        // gsap.to(".aboutsection", {
        //   background:
        //     "linear-gradient(125deg,rgba(255, 246, 176, 1) 0%, rgba(199, 211, 255, 1) 100%)",
        //   scrollTrigger: {
        //     trigger: ".aboutsection",
        //     start: `top top`,
        //     end: `${heightScreen * 2.2} top`,
        //     scrub: true,
        //   },
        // });
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
