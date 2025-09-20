// FIX: Added a triple-slash directive to help TypeScript recognize @react-three/fiber's JSX elements.
/// <reference types="@react-three/fiber" />

import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import type { CourtDesign } from '../types';
import { Text } from '@react-three/drei';

const COURT_LENGTH = 20;
const COURT_WIDTH = 10;
const WALL_HEIGHT = 4;
const SERVICE_LINE_Z = 6.95;

const GlassMaterial = ({ opacity }: { opacity: number }) => (
    <meshStandardMaterial
        color="lightblue"
        transparent
        opacity={opacity}
        roughness={0.1}
        metalness={0.2}
        side={THREE.DoubleSide}
    />
);

function CourtLines({ color }: { color: string }) {
    const lineThickness = 0.05;

    return (
        <group position={[0, 0.01, 0]}>
            {/* Base lines are drawn on the court mesh itself, these are the inner lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[COURT_WIDTH, COURT_LENGTH]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Center Line */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[lineThickness, COURT_LENGTH]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Net line */}
             <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[COURT_WIDTH, lineThickness]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Service Lines */}
            <mesh position={[0, 0.02, SERVICE_LINE_Z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[COURT_WIDTH, lineThickness]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 0.02, -SERVICE_LINE_Z]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[COURT_WIDTH, lineThickness]} />
                <meshStandardMaterial color={color} />
            </mesh>
             {/* Center service line */}
            <mesh position={[0, 0.02, (SERVICE_LINE_Z/2)]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[lineThickness, SERVICE_LINE_Z]} />
                <meshStandardMaterial color={color} />
            </mesh>
             <mesh position={[0, 0.02, -(SERVICE_LINE_Z/2)]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[lineThickness, SERVICE_LINE_Z]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    )
}

const DimensionLabel = ({ text, position, rotation = [0, 0, 0] }: { text: string, position: [number, number, number], rotation?: [number, number, number] }) => (
    <Text
        position={position}
        rotation={rotation}
        fontSize={0.4}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000000"
        outlineWidth={0.01}
    >
        {text}
    </Text>
);

function PadelCourt({
    courtColor,
    linesColor,
    outOfPlayColor,
    frameColor,
    glassOpacity,
    netColor,
    logoColor
}: CourtDesign) {
    
    return (
        <group>
            {/* Floor */}
            <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[COURT_WIDTH + 4, COURT_LENGTH + 4]} />
                <meshStandardMaterial color={outOfPlayColor} />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[COURT_WIDTH, COURT_LENGTH]} />
                <meshStandardMaterial color={courtColor} />
            </mesh>

            {/* Lines */}
            <CourtLines color={linesColor} />

            {/* Walls */}
            <group>
                {/* Back Wall */}
                <mesh position={[0, WALL_HEIGHT / 2, -COURT_LENGTH / 2]} castShadow receiveShadow>
                    <boxGeometry args={[COURT_WIDTH, WALL_HEIGHT, 0.1]} />
                    <GlassMaterial opacity={glassOpacity} />
                </mesh>
                 {/* Front Wall */}
                 <mesh position={[0, WALL_HEIGHT / 2, COURT_LENGTH / 2]} castShadow receiveShadow>
                    <boxGeometry args={[COURT_WIDTH, WALL_HEIGHT, 0.1]} />
                    <GlassMaterial opacity={glassOpacity} />
                </mesh>
                {/* Side Walls */}
                <mesh position={[-COURT_WIDTH / 2, WALL_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[COURT_LENGTH, WALL_HEIGHT, 0.1]} />
                    <GlassMaterial opacity={glassOpacity} />
                </mesh>
                <mesh position={[COURT_WIDTH / 2, WALL_HEIGHT / 2, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[COURT_LENGTH, WALL_HEIGHT, 0.1]} />
                    <GlassMaterial opacity={glassOpacity} />
                </mesh>
            </group>

            {/* Frame */}
            <group>
                <mesh position={[0, WALL_HEIGHT, 0]} castShadow>
                    <boxGeometry args={[COURT_WIDTH + 0.2, 0.1, 0.1]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
                 <mesh position={[0, WALL_HEIGHT, COURT_LENGTH / 2]} castShadow>
                    <boxGeometry args={[COURT_WIDTH + 0.2, 0.1, 0.1]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
                 <mesh position={[0, WALL_HEIGHT, -COURT_LENGTH / 2]} castShadow>
                    <boxGeometry args={[COURT_WIDTH + 0.2, 0.1, 0.1]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
                <mesh position={[COURT_WIDTH / 2, WALL_HEIGHT / 2, 0]} rotation={[0,0,Math.PI/2]} castShadow>
                    <boxGeometry args={[WALL_HEIGHT, 0.1, 0.1]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
                 <mesh position={[-COURT_WIDTH / 2, WALL_HEIGHT / 2, 0]} rotation={[0,0,Math.PI/2]} castShadow>
                    <boxGeometry args={[WALL_HEIGHT, 0.1, 0.1]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
            </group>

            {/* Net */}
            <group position={[0, 0.44, 0]}>
                <mesh castShadow receiveShadow>
                    <planeGeometry args={[COURT_WIDTH, 0.88]} />
                    <meshStandardMaterial color={netColor} side={THREE.DoubleSide} />
                </mesh>
                 <Text
                    position={[0, 0, 0.01]}
                    fontSize={0.5}
                    color={logoColor}
                    anchorX="center"
                    anchorY="middle"
                 >
                    GEMINI
                 </Text>
                <mesh position={[-COURT_WIDTH / 2, 0, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 1, 32]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
                <mesh position={[COURT_WIDTH / 2, 0, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 1, 32]} />
                    <meshStandardMaterial color={frameColor} />
                </mesh>
            </group>

            {/* Dimensions */}
            <group>
                 {/* Court Length (Right) */}
                <DimensionLabel text={`Panjang: ${COURT_LENGTH}m`} position={[COURT_WIDTH / 2 + 1, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
                {/* Court Length (Left) */}
                <DimensionLabel text={`Panjang: ${COURT_LENGTH}m`} position={[-COURT_WIDTH / 2 - 1, 0.1, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} />
                
                {/* Court Width (Back) */}
                <DimensionLabel text={`Lebar: ${COURT_WIDTH}m`} position={[0, 0.1, -COURT_LENGTH / 2 - 1]} rotation={[-Math.PI / 2, 0, 0]} />
                {/* Court Width (Front) */}
                <DimensionLabel text={`Lebar: ${COURT_WIDTH}m`} position={[0, 0.1, COURT_LENGTH / 2 + 1]} rotation={[-Math.PI / 2, 0, 0]} />

                {/* Wall Height (Back Right Corner) */}
                <DimensionLabel text={`Tinggi Dinding: ${WALL_HEIGHT}m`} position={[COURT_WIDTH / 2 + 3, 0.1, -COURT_LENGTH / 2 - 1]} rotation={[-Math.PI / 2, 0, 0]} />
            </group>
        </group>
    );
}

export default React.memo(PadelCourt);