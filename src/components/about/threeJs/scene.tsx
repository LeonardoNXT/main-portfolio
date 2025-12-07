import { Canvas } from "@react-three/fiber";
import { RefObject, useRef, useState } from "react";
import SceneContent from "./sceneContent";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  SMAA,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import useAnimation from "./hooks/useAnimation";
import useOffset from "./hooks/useOffset";
import useVisibilityGlobal from "@/app/hooks/useVisibilityGlobal";

export type Bidimension = {
  x: number;
  y: number;
};

export type BgColorType = THREE.Color;

export default function Scene({
  refSection,
  refStickySection,
  heightScreen,
  isMobile,
}: {
  refSection: RefObject<HTMLDivElement | null>;
  refStickySection: RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  heightScreen: number;
}) {
  // 10 0 10
  const cameraPosition = useRef({ x: -20, y: 5, z: 2 });
  const cameraLookAt = useRef({ x: 0, y: 10, z: 0 });
  const primitiveCameraP = useRef({ x: -20, y: 5, z: 2 });
  const primiteCameraLookAt = useRef({ x: 0, y: 0, z: 0 });
  const rgba = useRef({ r: 255, g: 255, b: 255 });
  const [offset, setOffset] = useState<Bidimension>({ x: 0, y: 0 });

  const bgColor = useRef<BgColorType | null>(null);

  const isVisible = useVisibilityGlobal({
    ref: refStickySection,
    heightScreen,
    start: 0,
    end: heightScreen * 10,
  });

  useOffset(setOffset);

  useAnimation({
    cameraLookAt: cameraLookAt,
    cameraPosition: cameraPosition,
    primitiveCameraP: primitiveCameraP,
    primiteCameraLookAt: primiteCameraLookAt,
    heightScreen: heightScreen,
    refSection: refSection,
  });

  return (
    <Canvas
      camera={{ fov: 30, near: 0.1, far: 100, position: [10, 0, 10] }}
      shadows
      dpr={Math.min(window.devicePixelRatio, 1)}
      gl={{
        antialias: !isMobile,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.5,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      {!isMobile && <fog attach="fog" args={[0xffffff, 0.01]} />}

      <SceneContent
        cameraPosition={cameraPosition}
        cameraLookAt={cameraLookAt}
        primitiveCameraP={primitiveCameraP}
        offset={offset}
        isMobile={isMobile}
        isVisibleFirsh={isVisible}
      />

      <color
        attach="background"
        args={[`rgb(${rgba.current.r}, ${rgba.current.g}, ${rgba.current.b})`]}
        ref={bgColor}
      />

      <Environment
        files="/panoramic.exr"
        background={false}
        environmentIntensity={1}
        resolution={256}
      />

      <EffectComposer multisampling={0}>
        <SMAA />
        <Bloom opacity={0.2} />

        <ChromaticAberration opacity={0} />

        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
