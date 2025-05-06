
export default function LoadingSpinner() {
  
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

// No props needed for LoadingSpinner component