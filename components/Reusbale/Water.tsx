"use client";
import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, extend, useThree, useLoader, useFrame } from "@react-three/fiber";
import { Water } from "three-stdlib";
import { Sky } from "@react-three/drei";

extend({ Water });


export function WaterSurface() {
  const waterRef = useRef<any>(null);
  const gl = useThree((state) => state.gl);
  const { camera } = useThree();

  // Water setup
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(100000, 100000, 512, 512), []);

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(0, -1, 0),
     sunColor: 0xcfdfff,
      waterColor: 0x02040a, 
      distortionScale: 1.0,
      fog: true,
      format: gl.outputColorSpace,
    }),
    [waterNormals, gl]
  );

useFrame((_, delta) => {
  if (waterRef.current) {
    waterRef.current.material.uniforms.time.value += delta * 0.1;
    // stick water to camera XZ so edges never show
    waterRef.current.position.x = camera.position.x;
    waterRef.current.position.z = camera.position.z;
  }
});

  return (
    <primitive
      ref={waterRef}
      object={new Water(geom, config)}
      rotation-x={-Math.PI / 2}
      position={[0, 0, 0]}
    />
  );
}
