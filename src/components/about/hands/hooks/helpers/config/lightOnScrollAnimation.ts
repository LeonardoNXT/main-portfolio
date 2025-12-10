import { gsap } from "gsap/gsap-core";
import { CameraType } from "../../useAnimation";
import { ThreeDimension } from "../../useContentAnimation";
import { RefObject } from "react";

type Param = {
    secondCameraLookAt: CameraType;
    secondPrimitiveCameraP: CameraType;
    lightModelRotation: RefObject<ThreeDimension>;
    lightModelScale: RefObject<ThreeDimension>;
    context : gsap.Context
    heightScreen: number;
}

export function lightOnScrollAnimation(config : Param){
    if(!config.context.selector) return

    // config. circulo

    const circle = config.context.selector(".circle-hands")[0] as SVGCircleElement | null | undefined;

    if(!circle) return console.error("Não foi encontrado o circulo")

    const lengthCircle = circle.getTotalLength()
    circle.style.strokeDasharray = String(lengthCircle)
    circle.style.strokeDashoffset = String(lengthCircle)

    //config linhas 

    const lines = config.context.selector(".path-lines")[0] as SVGPathElement
    const lengthLines = lines.getTotalLength()
    lines.style.strokeDasharray = String(lengthLines)
    lines.style.strokeDashoffset = String(lengthLines)

    // começo das animações

    // configuração inicial do circulo
    gsap.set(circle, {
        opacity:0,
    })

    gsap.to(circle, { 
        opacity: 1,
        strokeDashoffset: 0,
        ease: "circ.inOut",
        scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen *  9.5} bottom`,
            end: `${config.heightScreen * 12} bottom`,
            scrub:true,
        }
    })

    // configuração inicial das linhas que tangem o circulo
    gsap.set(lines, {
        opacity:0,
    })

    gsap.to(lines, {
        opacity: 1,
        strokeDashoffset: 0,
        ease: "circ.inOut",
        scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen *  11} bottom`,
            end: `${config.heightScreen * 13} bottom`,
            scrub:true,
        }
    })

    // animação inicial da escala e da rotação da lampada

    gsap.to(config.lightModelScale.current, {
        x: 1,
        y:1,
        z:1,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen *  10} bottom`,
            end: `${config.heightScreen * 13} bottom`,
            scrub:true,
        }
    })
    gsap.to(config.lightModelRotation.current, {
        y:Math.PI * 4,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${config.heightScreen * 10} bottom`,
            end: `${config.heightScreen * 13} bottom`,
            scrub:true,
        }
    })

}