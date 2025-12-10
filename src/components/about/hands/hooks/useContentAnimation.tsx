import useVisibilityGlobal from "@/app/hooks/useVisibilityGlobal";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import useOffset from "./useOffset";
import useAnimation from "./useAnimation";
import { BgColorType } from "../scene";

export type Bidimension = {
  x: number;
  y: number;
};

export type ThreeDimension = {
  x: number;
  y: number;
  z: number;
};

type Config = {
  heightScreen: number;
  refSection: RefObject<HTMLDivElement | null>;
  refStickySection: RefObject<HTMLDivElement | null>;
  setZindex: Dispatch<SetStateAction<number>>;
};

export function useContentAnimation(config: Config) {
  const modelRotation = useRef<ThreeDimension>({ x: 0, y: 0, z: 0 });
  const cameraPosition = useRef({ x: -20, y: 5, z: 2 });
  const lightModelScale = useRef({ x: 0, y: 0, z: 0 });
  const lightModelRotation = useRef({ x: 0, y: 0, z: -Math.PI / 8 });
  const firstCameraLookAt = useRef({ x: 0, y: 10, z: 0 });
  const secondCameraLookAt = useRef({ x: 0, y: 0, z: 0 });
  const firstPrimitiveCameraP = useRef({ x: -20, y: 5, z: 2 });
  const secondPrimitiveCameraP = useRef({ x: 0, y: 0, z: 10 });
  const rgba = useRef({ r: 255, g: 255, b: 255 });
  const [offset, setOffset] = useState<Bidimension>({ x: 0, y: 0 });

  const bgColor = useRef<BgColorType | null>(null);

  const isVisibleFirsh = useVisibilityGlobal({
    ref: config.refStickySection,
    heightScreen: config.heightScreen,
    start: 0,
    end: config.heightScreen * 9.9,
  });

  const isVisibleSecond = useVisibilityGlobal({
    ref: config.refStickySection,
    heightScreen: config.heightScreen,
    start: config.heightScreen * 10,
    end: config.heightScreen * 15,
  });

  useOffset(setOffset);

  useAnimation({
    firstCameraLookAt: firstCameraLookAt,
    secondCameraLookAt: secondCameraLookAt,
    firstPrimitiveCameraP: firstPrimitiveCameraP,
    secondPrimitiveCameraP: secondPrimitiveCameraP,
    lightModelScale: lightModelScale,
    lightModelRotation: lightModelRotation,
    modelRotation: modelRotation,
    heightScreen: config.heightScreen,
    refSection: config.refSection,
  });

  // calcular z-index da cena

  const setZindex = config.setZindex;

  useEffect(() => {
    if (isVisibleSecond) {
      setZindex(30);
    } else {
      setZindex(1);
    }
  }, [isVisibleSecond, setZindex]);

  return {
    modelRotation,
    firstPrimitiveCameraP,
    secondPrimitiveCameraP,
    firstCameraLookAt,
    secondCameraLookAt,
    lightModelScale,
    lightModelRotation,
    cameraPosition,
    rgba,
    offset,
    bgColor,
    isVisibleFirsh,
    isVisibleSecond,
  };
}
