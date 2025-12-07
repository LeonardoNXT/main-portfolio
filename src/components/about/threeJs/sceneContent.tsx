import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useEffect } from "react";
import EnergyModel from "./energyModel";
import { Bidimension } from "./scene";

type CameraRef = RefObject<{ x: number; y: number; z: number }>;

export default function SceneContent({
  isVisibleFirsh,
  cameraPosition,
  primitiveCameraP,
  offset,
  cameraLookAt,
  isMobile,
}: {
  isVisibleFirsh: boolean;
  cameraPosition: CameraRef;
  cameraLookAt: CameraRef;
  offset: Bidimension;
  primitiveCameraP: CameraRef;
  isMobile: boolean;
}) {
  const { camera, scene } = useThree();

  // Configura environmentIntensity
  useEffect(() => {
    scene.environmentIntensity = 1;
  }, [scene]);

  useFrame(() => {
    cameraPosition.current.x = primitiveCameraP.current.x - offset.x;
    cameraPosition.current.y = primitiveCameraP.current.y - offset.y;
    cameraPosition.current.z = primitiveCameraP.current.z;

    // aplica
    camera.position.set(
      cameraPosition.current.x,
      cameraPosition.current.y,
      cameraPosition.current.z
    );

    camera.lookAt(
      cameraLookAt.current.x,
      cameraLookAt.current.y,
      cameraLookAt.current.z
    );
  });

  return (
    <>
      {/* Luz direcional principal */}
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

      {/* HemisphereLight */}
      <hemisphereLight args={[0xffccaa, 0x333366, 1.0]} />

      {/* Luz do sol (DirectionalLight forte) */}
      {!isMobile && (
        <directionalLight
          position={[-10, 30, -5]}
          intensity={1.5}
          color={0xffddcc}
          castShadow={false}
        />
      )}

      {/* Luz ambiente */}
      <ambientLight intensity={0.3} />

      <group visible={isVisibleFirsh}>
        <EnergyModel />
      </group>
    </>
  );
}
