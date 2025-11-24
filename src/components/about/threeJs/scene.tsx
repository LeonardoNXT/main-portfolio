import { Canvas } from "@react-three/fiber";
import { JSX, RefObject, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import SceneContent from "./sceneContent";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Noise,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Vignette } from "@react-three/postprocessing";

export default function Scene({
  refSection,
}: {
  refSection: RefObject<HTMLDivElement | null>;
}) {
  // 10 0 10
  const cameraPosition = useRef({ x: -20, y: 5, z: 2 });
  const cameraLookAt = useRef({ x: 0, y: 10, z: 0 });
  const heightScreen = window.innerHeight;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function calcIsMobile() {
      const isMobileVarible = window.innerWidth < 768;
      setIsMobile(isMobileVarible);
    }
    calcIsMobile();

    window.addEventListener("resize", calcIsMobile);

    return () => {
      window.removeEventListener("resize", calcIsMobile);
    };
  }, []);

  useGSAP(
    (context) => {
      context.add(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".mid-about-1",
            start: `top bottom`,
            end: `bottom bottom`,
            scrub: true,
          },
        });
        gsap.to(".opacity-handler", {
          opacity: 1,
          scrollTrigger: {
            trigger: ".mid-about-1",
            start: `${heightScreen} bottom`,
            end: `${heightScreen * 2} bottom`,
            scrub: true,
          },
        });
        tl.to(
          cameraPosition.current,
          {
            x: 0,
            y: 0,
            z: 10,
            duration: 0.2,
          },
          0
        ).to(
          cameraLookAt.current,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.2,
          },
          0
        );
      });
    },
    { scope: refSection }
  );

  return (
    <Canvas
      camera={{ fov: 30, near: 0.1, far: 100, position: [10, 0, 10] }}
      shadows
      style={{ background: "#ffffff" }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      gl={{
        antialias: !isMobile,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.5,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      {!isMobile && <fogExp2 attach="fog" args={[0xffffff, 0.01]} />}

      <SceneContent
        cameraPosition={cameraPosition}
        cameraLookAt={cameraLookAt}
        isMobile={isMobile}
      />
      <color attach="background" args={["#ffffff"]} />

      <Environment
        files="/panoramic.jpg"
        background={false}
        environmentIntensity={1.5}
      />

      <EffectComposer multisampling={isMobile ? 0 : 4}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        {
          (!isMobile && (
            <Noise
              opacity={0.6}
              blendFunction={BlendFunction.DARKEN}
              premultiply
            />
          )) as JSX.Element
        }
        {
          (!isMobile && (
            <Vignette
              eskil={false}
              offset={0.3} // intensidade do escurecimento nas bordas
              darkness={0.7} // quão escuro fica
            />
          )) as JSX.Element
        }
      </EffectComposer>
    </Canvas>
  );
}
