import { CameraType } from "../useAnimation";
import { RefObject } from "react";
import { ThreeDimension } from "../useContentAnimation";
import { handOnScrollAnimation } from "./config/handOnScrollAnimation";
import { lightOnScrollAnimation } from "./config/lightOnScrollAnimation";

export type HandConfigType = {
  heightScreen: number;
  firstCameraLookAt: CameraType;
  firstcameraPosition: CameraType;
  modelRotation: RefObject<ThreeDimension>;
};

interface ConfigContext extends HandConfigType {
  context: gsap.Context;
  secondCameraLookAt: CameraType;
  secondPrimitiveCameraP: CameraType;
  lightModelRotation: RefObject<ThreeDimension>;
  lightModelScale: RefObject<ThreeDimension>;
}

export default function onScrollAnimations(config: ConfigContext) {
  handOnScrollAnimation({
    firstCameraLookAt: config.firstCameraLookAt,
    firstcameraPosition: config.firstcameraPosition,
    heightScreen: config.heightScreen,
    modelRotation: config.modelRotation,
  });
  lightOnScrollAnimation({
    context: config.context,
    heightScreen: config.heightScreen,
    secondCameraLookAt: config.secondCameraLookAt,
    secondPrimitiveCameraP: config.secondPrimitiveCameraP,
    lightModelRotation: config.lightModelRotation,
    lightModelScale: config.lightModelScale,
  });
}
