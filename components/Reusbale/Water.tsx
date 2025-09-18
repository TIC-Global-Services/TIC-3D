"use client";

import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Water } from "three-stdlib";

extend({ Water });

function WaterSurface() {
  const waterRef = useRef<any>(null);
  const gl = useThree((state) => state.gl);

  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000, 512, 512), []);

  // Night water config with bigger waves
  const config = useMemo(
    () => ({
      textureWidth: 2048,
      textureHeight: 2048,
      waterNormals,
      sunDirection: new THREE.Vector3(0, -1, 0), // moonlight
      sunColor: 0x111144,
      waterColor: 0x0a0a1e,
      distortionScale: 1295.0,  // BIGGER waves
      fog: true,
      format: gl.outputColorSpace,
    }),
    [waterNormals, gl]
  );

  // Animate violent night waves
  useFrame((_, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta * 1; // faster motion
    }
  });

  return <primitive object={new Water(geom, config)} ref={waterRef} rotation-x={-Math.PI / 2} />;
}

export default function WaterScene() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 50, 150], fov: 75 }}
        gl={{ antialias: true }}
      >
        {/* Dark night sky */}
        <Sky
          distance={450000}
          sunPosition={[0, -1, 0]}
          inclination={0}
          azimuth={0.25}
          turbidity={10}
          rayleigh={0.1}
          mieCoefficient={0.005}
        />

        {/* Subtle ambient light */}
        <ambientLight intensity={0.15} color={0x666699} />

        <WaterSurface />

      </Canvas>
    </div>
  );
}
