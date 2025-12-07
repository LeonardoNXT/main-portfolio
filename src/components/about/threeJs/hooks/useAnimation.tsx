import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import { textAnimations } from "./helpers/textAnimations";
import onScrollAnimations from "./helpers/onScrollAnimations";

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
  cameraLookAt: CameraType;
  cameraPosition: CameraType;
  primitiveCameraP: CameraType;
  primiteCameraLookAt: CameraType;
};

export default function useAnimation(config: Config) {
  useGSAP(
    (context) => {
      context.add(() => {
        onScrollAnimations({
          heightScreen: config.heightScreen,
          cameraLookAt: config.cameraLookAt,
          cameraPosition: config.primitiveCameraP,
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
