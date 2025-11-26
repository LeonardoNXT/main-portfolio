import { Canvas } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import SceneContent from "./sceneContent";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import useAnimation from "./hooks/useAnimation";
import useResize from "./hooks/useResize";
import useVisibility from "./hooks/useVisibility";

export default function Scene({
  refSection,
  refStickySection,
}: {
  refSection: RefObject<HTMLDivElement | null>;
  refStickySection: RefObject<HTMLDivElement | null>;
}) {
  // 10 0 10
  const cameraPosition = useRef({ x: -20, y: 5, z: 2 });
  const cameraLookAt = useRef({ x: 0, y: 10, z: 0 });
  const bgColor = useRef<THREE.Color | null>(null);

  const { heightScreen, isMobile } = useResize();

  const { isVisibleFirsh } = useVisibility({
    heightScreen,
    refStickySection,
  });

  useAnimation({
    cameraLookAt: cameraLookAt,
    cameraPosition: cameraPosition,
    heightScreen: heightScreen,
    refSection: refSection,
  });

  return (
    <Canvas
      camera={{ fov: 30, near: 0.1, far: 100, position: [10, 0, 10] }}
      shadows
      style={{ background: "#ffffff" }}
      dpr={Math.min(window.devicePixelRatio, 1)}
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
        isVisibleFirsh={isVisibleFirsh}
      />

      <color attach="background" args={["#ffffff"]} ref={bgColor} />

      <Environment
        files="/panoramic.exr"
        background={false}
        environmentIntensity={1}
        resolution={256}
      />

      <EffectComposer multisampling={0}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
