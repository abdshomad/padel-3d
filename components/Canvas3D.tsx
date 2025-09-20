// FIX: Added a triple-slash directive to help TypeScript recognize @react-three/fiber's JSX elements.
/// <reference types="@react-three/fiber" />

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import PadelCourt from './PadelCourt';
import type { CourtDesign } from '../types';

interface Canvas3DProps {
  design: CourtDesign;
}

function Canvas3D({ design }: Canvas3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 8, 20], fov: 50 }}
      shadows
      className="w-full h-full"
    >
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[10, 20, 5]} 
        intensity={2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <PadelCourt {...design} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        minDistance={5}
        maxDistance={40}
        target={[0, 2, 0]}
        maxPolarAngle={Math.PI / 2.1}
      />
      <Environment preset="sunset" background blur={0.5} />
       <Text
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.5}
          color="#555"
          anchorX="center"
          anchorY="middle"
        >
          GEMINI PADEL
        </Text>
    </Canvas>
  );
}

export default Canvas3D;
