import * as THREE from "three";
import { RefObject, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeDimension } from "./hooks/useContentAnimation";
import { useFrame } from "@react-three/fiber";

export default function EnergyModel({
  modelRotation,
}: {
  modelRotation: RefObject<ThreeDimension>;
}) {
  const { scene } = useGLTF("/teste3.glb");

  useFrame(() => {
    scene.rotation.set(
      modelRotation.current.x,
      modelRotation.current.y,
      modelRotation.current.z
    ); // X=1, Y=2, Z=3
  });

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // APENAS sombras - SEM forçar metalness/roughness!
        child.castShadow = true;
        child.receiveShadow = true;
      }

      // Emissivo na lâmpada (Object_81)
      if (child.name === "Object_81" && child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const mat = child.material.clone();
          mat.emissive = new THREE.Color(0xff6600);
          mat.emissiveIntensity = 10;
          child.material = mat;
        }

        // PointLight
        const bulb = new THREE.PointLight(0xff6600, 4, 40);
        child.updateWorldMatrix(true, false);
        bulb.position.copy(child.getWorldPosition(new THREE.Vector3()));
        scene.add(bulb);
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}
