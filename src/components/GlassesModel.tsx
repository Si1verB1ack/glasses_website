// GlassesModel.jsx
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial, Group } from "three";

export default function GlassesModel() {
  const { scene } = useGLTF("/models/glasses-5b.glb");
  const modelRef = useRef<Group | null>(null);

  // Set the glasses color and shadow properties
  useEffect(() => {
    scene.traverse((node) => {
      if (node instanceof Mesh) {
        // Enable shadow casting for all meshes
        node.castShadow = true;
        
        if (node.name.includes("Frame")) {
          if (Array.isArray(node.material)) {
            node.material.forEach((material) => {
              if (material instanceof MeshStandardMaterial) {
                material.metalness = 0.2;
                material.roughness = 0.3;
              }
            });
          } else {
            if (node.material instanceof MeshStandardMaterial) {
              node.material.metalness = 0.2;
              node.material.roughness = 0.3;
            }
          }
        }

        // Make lenses slightly transparent and reflective
        if (node.name.includes("Lens")) {
          if (node.material instanceof MeshStandardMaterial) {
            node.material.transparent = true;
            node.material.opacity = 0.8;
          }
        }
      }
    });
  }, [scene]);

  // Just a subtle floating animation without rotation
  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      modelRef.current.position.y = Math.sin(t * 0.5) * 0.10;
      // No rotation animation - glasses stay in position until user interacts
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={14}
      position={[0.05, 0, 0]}
      // Correct rotation to make glasses face forward
      rotation={[0.4, -0.3, 0.1]}
    />
  );
}