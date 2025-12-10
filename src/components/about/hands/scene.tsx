import { Canvas } from "@react-three/fiber";
import { Dispatch, JSX, RefObject, SetStateAction } from "react";
import SceneContent from "./sceneContent";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  SMAA,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useContentAnimation } from "./hooks/useContentAnimation";

export type BgColorType = THREE.Color;

export default function Scene({
  setZindex,
  zIndex,
  refSection,
  refStickySection,
  heightScreen,
  isMobile,
}: {
  setZindex: Dispatch<SetStateAction<number>>;
  zIndex: number;
  refSection: RefObject<HTMLDivElement | null>;
  refStickySection: RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  heightScreen: number;
}) {
  const {
    modelRotation,
    firstPrimitiveCameraP,
    secondPrimitiveCameraP,
    firstCameraLookAt,
    secondCameraLookAt,
    cameraPosition,
    lightModelScale,
    lightModelRotation,
    bgColor,
    isVisibleFirsh,
    isVisibleSecond,
    offset,
    rgba,
  } = useContentAnimation({
    setZindex: setZindex,
    heightScreen: heightScreen,
    refSection: refSection,
    refStickySection: refStickySection,
  });

  return (
    <Canvas
      style={{ zIndex: zIndex }}
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
        firstCameraLookAt={firstCameraLookAt}
        secondCameraLookAt={secondCameraLookAt}
        firstPrimitiveCameraP={firstPrimitiveCameraP}
        secondPrimitiveCameraP={secondPrimitiveCameraP}
        lightModelScale={lightModelScale}
        lightModelRotation={lightModelRotation}
        offset={offset}
        isMobile={isMobile}
        isVisibleFirsh={isVisibleFirsh}
        isVisibleSecond={isVisibleSecond}
        modelRotation={modelRotation}
      />

      <Environment
        files={!isVisibleSecond ? "./panoramic.exr" : "/shanghai.hdr"}
        background={false}
        environmentIntensity={isVisibleFirsh ? 1 : 0.3}
        resolution={256}
      />

      {isVisibleFirsh && (
        <color
          attach="background"
          args={[
            `rgb(${rgba.current.r}, ${rgba.current.g}, ${rgba.current.b})`,
          ]}
          ref={bgColor}
        />
      )}

      <EffectComposer multisampling={0}>
        <SMAA />
        {
          (!isVisibleSecond && (
            <>
              <Bloom opacity={0.2} />
              <ChromaticAberration opacity={1} />
              <Vignette />
              <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            </>
          )) as JSX.Element
        }
      </EffectComposer>
    </Canvas>
  );
}
