import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useEffect } from "react";
import EnergyModel from "./energyModel";

type CameraRef = RefObject<{ x: number; y: number; z: number }>;

export default function SceneContent({
  cameraPosition,
  cameraLookAt,
}: {
  cameraPosition: CameraRef;
  cameraLookAt: CameraRef;
}) {
  const { camera, scene } = useThree();

  // Configura environmentIntensity
  useEffect(() => {
    scene.environmentIntensity = 1;
  }, [scene]);

  useFrame(() => {
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
      <directionalLight
        position={[50, 10, -30]}
        intensity={1.0}
        color={0xffaa66}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-normalBias={0.05}
        shadow-bias={-0.001}
      />

      {/* HemisphereLight */}
      <hemisphereLight args={[0xffccaa, 0x333366, 1.0]} />

      {/* Luz do sol (DirectionalLight forte) */}
      <directionalLight
        position={[20, 80, 20]}
        intensity={5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={10}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
        shadow-radius={0.5}
      />

      {/* Luz ambiente */}
      <ambientLight intensity={0.3} />

      <EnergyModel />
    </>
  );
}
