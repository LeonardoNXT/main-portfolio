import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import { textAnimations } from "./helpers/textAnimations";
import onScrollAnimations from "./helpers/onScrollAnimations";
import { ThreeDimension } from "./useContentAnimation";
type CamerasContent = {
  x: number;
  y: number;
  z: number;
};

export type RGBA = {
  r: number;
  g: number;
  b: number;
};

export type CameraType = RefObject<CamerasContent>;

type Config = {
  heightScreen: number;
  refSection: RefObject<HTMLDivElement | null>;
  firstCameraLookAt: CameraType;
  secondCameraLookAt: CameraType;
  firstPrimitiveCameraP: CameraType;
  secondPrimitiveCameraP: CameraType;
  modelRotation: RefObject<ThreeDimension>;
  lightModelRotation: RefObject<ThreeDimension>;
  lightModelScale: RefObject<ThreeDimension>;
};

export default function useAnimation(config: Config) {
  useGSAP(
    (context) => {
      context.add(() => {
        onScrollAnimations({
          context: context,
          heightScreen: config.heightScreen,
          firstCameraLookAt: config.firstCameraLookAt,
          secondCameraLookAt: config.secondCameraLookAt,
          firstcameraPosition: config.firstPrimitiveCameraP,
          secondPrimitiveCameraP: config.secondPrimitiveCameraP,
          modelRotation: config.modelRotation,
          lightModelRotation: config.lightModelRotation,
          lightModelScale: config.lightModelScale,
        });
        textAnimations({ heightScreen: config.heightScreen });
      });
    },
    {
      scope: config.refSection,
      dependencies: [config.heightScreen],
      revertOnUpdate: true,
    }
  );
}
