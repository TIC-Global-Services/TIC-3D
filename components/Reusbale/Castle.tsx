"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { JSX } from "react";

// Castle component that works inside Canvas
export function CastleModel(props: JSX.IntrinsicElements["group"]) {
  const gltf = useGLTF("/castle2.glb");
  
  return (
    <group {...props} dispose={null} position={[0, -50, 0]} // adjust to move model
      scale={[3, 3, 3]}>
      <primitive object={gltf.scene} />
      <ambientLight intensity={0.4} color={"#ffffff"} />
      <directionalLight
        position={[20, 40, 20]}
        intensity={1.2} // like exposure bump
        color={"#ffdca8"}
        castShadow
      />
    </group>
  );
}

// Main component with Canvas wrapper
// Preload the model for better performance
useGLTF.preload("/castle2.glb");