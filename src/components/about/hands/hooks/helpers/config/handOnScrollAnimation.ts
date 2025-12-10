import { HandConfigType } from "../onScrollAnimations";
import { gsap } from "gsap/gsap-core";

export function handOnScrollAnimation(config: HandConfigType) {
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
        .to(config.firstcameraPosition.current, {
          x: 0,
          y: 0,
          z: 15,
          duration: config.heightScreen * 3.5,
        })
        .to(config.firstcameraPosition.current, {
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
        .to(config.firstCameraLookAt.current, {
          x: 0,
          y: 0,
          z: 0,
          duration: config.heightScreen * 4.5, // relativo ao scroll
        })
        .to(config.firstCameraLookAt.current, {
          x: 0,
          y: 0,
          z: -10,
          duration: config.heightScreen * 2.5, // relativo ao scroll
        });
      gsap.to(".circle-increase", {
        width: window.innerWidth * 2,
        ease: "power1.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".mid-about-1",
          start: `${config.heightScreen * 8.5} bottom`,
          end: `${config.heightScreen * 11.5} bottom`,
          scrub: true,
        },
      });
      gsap.to(config.modelRotation.current, {
        x: Math.PI / 6,
        y: 0,
        z: Math.PI / 4,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".mid-about-1",
          start: `${config.heightScreen * 7.5} bottom`,
          end: `${config.heightScreen * 10.5} bottom`,
          scrub: true,
        },
      });
}