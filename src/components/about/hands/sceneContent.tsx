import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useEffect } from "react";
import EnergyModel from "./energyModel";
import { Bidimension, ThreeDimension } from "./hooks/useContentAnimation";
import LightModel from "./lightModel";

type CameraRef = RefObject<{ x: number; y: number; z: number }>;

export default function SceneContent({
  isVisibleFirsh,
  isVisibleSecond,
  cameraPosition,
  firstPrimitiveCameraP,
  secondPrimitiveCameraP,
  lightModelScale,
  lightModelRotation,
  offset,
  firstCameraLookAt,
  secondCameraLookAt,
  isMobile,
  modelRotation,
}: {
  isVisibleFirsh: boolean;
  isVisibleSecond: boolean;
  cameraPosition: CameraRef;
  firstCameraLookAt: CameraRef;
  secondCameraLookAt: CameraRef;
  lightModelScale: RefObject<ThreeDimension>;
  lightModelRotation: RefObject<ThreeDimension>;
  offset: Bidimension;
  firstPrimitiveCameraP: CameraRef;
  secondPrimitiveCameraP: CameraRef;
  isMobile: boolean;
  modelRotation: RefObject<ThreeDimension>;
}) {
  const { camera, scene } = useThree();

  // Configura environmentIntensity
  useEffect(() => {
    scene.environmentIntensity = 1;
  }, [scene]);

  useFrame(() => {
    if (isVisibleFirsh) {
      cameraPosition.current.x = firstPrimitiveCameraP.current.x - offset.x;
      cameraPosition.current.y = firstPrimitiveCameraP.current.y - offset.y;
      cameraPosition.current.z = firstPrimitiveCameraP.current.z;

      camera.lookAt(
        firstCameraLookAt.current.x,
        firstCameraLookAt.current.y,
        firstCameraLookAt.current.z
      );
    }

    if (isVisibleSecond) {
      cameraPosition.current.x = secondPrimitiveCameraP.current.x - offset.x;
      cameraPosition.current.y = secondPrimitiveCameraP.current.y - offset.y;
      cameraPosition.current.z = secondPrimitiveCameraP.current.z;

      camera.lookAt(
        secondCameraLookAt.current.x,
        secondCameraLookAt.current.y,
        secondCameraLookAt.current.z
      );
    }

    camera.position.set(
      cameraPosition.current.x,
      cameraPosition.current.y,
      cameraPosition.current.z
    );
  });

  return (
    <>
      {!isMobile && (
        <directionalLight
          position={[50, 10, -30]}
          intensity={1.0}
          color={0xffaa66}
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-normalBias={0.05}
          shadow-bias={-0.001}
        />
      )}

      <hemisphereLight args={[0xffccaa, 0x333366, 1.0]} />

      {!isMobile && (
        <directionalLight
          position={[-10, 30, -5]}
          intensity={1.5}
          color={0xffddcc}
          castShadow={false}
        />
      )}

      <ambientLight intensity={0.3} />

      <group visible={isVisibleFirsh}>
        <EnergyModel modelRotation={modelRotation} />
      </group>

      <group visible={isVisibleSecond}>
        <LightModel
          lightModelScale={lightModelScale}
          lightModelRotation={lightModelRotation}
        />
      </group>
    </>
  );
}
