import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment } from "@react-three/drei";
import GlassesModel from "./GlassesModel";

function LoadingSpinner() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#999" wireframe />
    </mesh>
  );
}

export default function GlassesViewer() {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
        <Suspense fallback={<LoadingSpinner />}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
          >
            <GlassesModel />
            {/* Shadow plane under glasses */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.7, 0]}
              receiveShadow
            >
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.2} />
            </mesh>
          </PresentationControls>
          <ambientLight intensity={0.6} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={0.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}