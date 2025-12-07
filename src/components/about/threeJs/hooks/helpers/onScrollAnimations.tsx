import { gsap } from "gsap/gsap-core";
import { CameraType } from "../useAnimation";

type Config = {
  heightScreen: number;
  cameraLookAt: CameraType;
  cameraPosition: CameraType;
};

export default function onScrollAnimations(config: Config) {
  gsap.to(".opacity-handler", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".mid-about-1",
      start: `${config.heightScreen} bottom`,
      end: `${config.heightScreen * 2} bottom`,
      scrub: true,
    },
  });

  const tlCameraP = gsap.timeline({
    scrollTrigger: {
      trigger: ".mid-about-1",
      start: `${config.heightScreen} bottom`,
      end: `${config.heightScreen * 10} bottom`,
      scrub: true,
    },
  });

  tlCameraP
    .to(config.cameraPosition.current, {
      x: 0,
      y: 0,
      z: 15,
      duration: config.heightScreen * 3.5,
    })
    .to(config.cameraPosition.current, {
      x: 0,
      y: 0,
      z: 0,
      duration: config.heightScreen * 2,
      ease: "power1.inOut",
    });

  const tlLookAt = gsap.timeline({
    scrollTrigger: {
      trigger: ".mid-about-1",
      start: `${config.heightScreen} bottom`,
      end: `${config.heightScreen * 10} bottom`,
      scrub: true,
    },
  });

  tlLookAt
    .to(config.cameraLookAt.current, {
      x: 0,
      y: 0,
      z: 0,
      duration: config.heightScreen * 4.5, // relativo ao scroll
    })
    .to(config.cameraLookAt.current, {
      x: 0,
      y: 0,
      z: -10,
      duration: config.heightScreen * 2.5, // relativo ao scroll
    });
  gsap.to(".circle-increase", {
    width: window.innerWidth * 2,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".mid-about-1",
      start: `${config.heightScreen * 8.5} bottom`,
      end: `${config.heightScreen * 11.5} bottom`,
      scrub: true,
    },
  });
}
