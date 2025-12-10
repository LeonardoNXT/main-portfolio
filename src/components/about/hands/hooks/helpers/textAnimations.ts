import { gsap } from "gsap/gsap-core";
import TextSplit from "./spliTextHelper";
import { ConfigTextObj } from "./config/textAnimationsObj";


type Config = {
    heightScreen: number,
}



export function textAnimations(config : Config) {
    const CONFIG = ConfigTextObj(config.heightScreen)

    const welcomeEnd = new TextSplit(".welcome-end")

    if(!welcomeEnd.chars?.length) return

    gsap.to(welcomeEnd.chars,{
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".mid-about-1",
        start: `${config.heightScreen} bottom`,
        end: `${config.heightScreen * 1.5} bottom`,
        scrub: true,
      }
    })
    gsap.to(welcomeEnd.chars,{
      color: "#FFF0",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".mid-about-1",
        start: `${config.heightScreen * 2} bottom`,
        end: `${config.heightScreen * 3} bottom`,
        scrub: true,
      }
    })


  

    const textIntro = new TextSplit(".text-introdution")
    textIntro.insertParagraph("inner-char")
  
    if (!textIntro.chars?.length) return;
  
    gsap.set(textIntro.chars, {
        opacity: 1,
      });

      gsap.to(".title-introduction", {
        opacity: 1,
        scrollTrigger: {
          trigger: ".mid-about-1",
          start: `${CONFIG.FIRSH_TEXT.INITIAL.START} bottom`,
          end: `${CONFIG.FIRSH_TEXT.INITIAL.END} bottom`,
          scrub: true,
        },
      });

      gsap.to(".inner-char", {
        translateX: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".mid-about-1",
          start: `${CONFIG.FIRSH_TEXT.INITIAL.START} bottom`,
          end: `${CONFIG.FIRSH_TEXT.INITIAL.END} bottom`,
          scrub: true,
        },
      });
      gsap.to(".content-introduction", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".mid-about-1",
          start: `${CONFIG.FIRSH_TEXT.FINAL.START} bottom`,
          end: `${CONFIG.FIRSH_TEXT.FINAL.END} bottom`,
          scrub: true,
        },
      });
  }