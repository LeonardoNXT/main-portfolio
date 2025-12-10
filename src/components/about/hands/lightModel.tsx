import * as THREE from "three";
import { RefObject, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeDimension } from "./hooks/useContentAnimation";
import { useFrame } from "@react-three/fiber";

export default function LightModel({
  lightModelScale,
  lightModelRotation,
}: {
  lightModelScale: RefObject<ThreeDimension>;
  lightModelRotation: RefObject<ThreeDimension>;
}) {
  const { scene } = useGLTF("/light.glb");

  useFrame(() => {
    scene.rotation.set(
      lightModelRotation.current.x,
      lightModelRotation.current.y,
      lightModelRotation.current.z
    );
    scene.scale.set(
      lightModelScale.current.x,
      lightModelScale.current.y,
      lightModelScale.current.z
    );
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // APENAS sombras - SEM forçar metalness/roughness!
        child.castShadow = true;
        child.receiveShadow = true;
      }

      // Emissivo na lâmpada (Object_81)
    });
  }, [scene]);

  return <primitive object={scene} />;
}
