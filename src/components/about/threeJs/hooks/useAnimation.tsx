import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { RefObject } from "react";
import { textAnimations } from "./helpers/textAnimations";

type CamerasContent = {
  x: number;
  y: number;
  z: number;
};

type CameraType = RefObject<CamerasContent>;

type Config = {
  heightScreen: number;
  refSection: RefObject<HTMLDivElement | null>;
  cameraLookAt: CameraType;
  cameraPosition: CameraType;
};

export default function useAnimation(config: Config) {
  useGSAP(
    (context) => {
      context.add(() => {
        gsap.to(".opacity-handler", {
          opacity: 1,
          scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen} bottom`,
            end: `${config.heightScreen * 2} bottom`,
            scrub: true,
          },
        });

        gsap.to(config.cameraPosition.current, {
          x: 0,
          y: 0,
          z: 10,
          scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen} bottom`,
            end: `${config.heightScreen * 5} bottom`,
            scrub: true,
          },
        });

        const tlLookAt = gsap.timeline({
          scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen} bottom`,
            end: `${config.heightScreen * 6.5} bottom`,
            scrub: true,
          },
        });

        tlLookAt
          .to(config.cameraLookAt.current, {
            x: 0,
            y: 0,
            z: 0,
            duration: config.heightScreen * 3.5, // relativo ao scroll
          })
          .to(config.cameraLookAt.current, {
            x: 20,
            y: -10,
            z: 0,
            ease: "power1.inOut",
            duration: config.heightScreen * 2.5, // relativo ao scroll
          });

        textAnimations({ heightScreen: config.heightScreen });
      });
    },
    { scope: config.refSection }
  );
}
