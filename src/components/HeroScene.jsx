// src/components/HeroScene.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Dodecahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// This component is the core 3D object for the hero section.
function MorphingShape() {
  const meshRef = useRef();

  // useFrame hook for continuous animation based on mouse position.
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the shape slowly for a constant, gentle motion.
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;

      // Move the shape towards the mouse position for an interactive feel.
      const mousePosition = new THREE.Vector3(state.mouse.x, state.mouse.y, 0.5);
      meshRef.current.position.lerp(mousePosition.multiplyScalar(0.7), 0.1);
    }
  });

  return (
    <Dodecahedron ref={meshRef} args={[1.5, 0]}>
      {/* 
        MeshDistortMaterial is a powerful material from @react-three/drei 
        that displaces the vertices of a mesh.
        - `distort`: how much to distort the mesh (0 is no distortion).
        - `speed`: how fast the distortion effect animates.
      */}
      <MeshDistortMaterial
        color="#1a202c"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.9}
        metalness={0.9}
      />
    </Dodecahedron>
  );
}

const HeroScene = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
       <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
        <MorphingShape />
      </Canvas>
    </div>
  );
};

export default HeroScene;
