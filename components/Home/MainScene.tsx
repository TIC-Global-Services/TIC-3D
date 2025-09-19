// MainScene.tsx
"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import { CastleModel } from "../Reusbale/Castle";
import { WaterSurface } from "../Reusbale/Water";

const MainScene = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 60, 500], fov: 65, near: 0.1, far: 200000 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0b1020"]} />
        {/* Dark, stormy sky */}
        <Sky
          distance={450000}
          sunPosition={[0, -0.5, 0]}   // sun well below horizon
          turbidity={30}               // max haze → cloudy/opaque
          rayleigh={0.1}               // kills blue scattering
          mieCoefficient={0.2}         // thicker fog-like air
          mieDirectionalG={0.95}       // forward scattering → dense look
        />

        {/* Force background to dark grayish tone */}
        <color attach="background" args={["#02030a"]} />


        <ambientLight intensity={0.1} color="#1a1a2e" />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />

        <CastleModel />
        <WaterSurface />

        <OrbitControls maxDistance={5000} minDistance={50} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/castle2.glb");
export default MainScene;
