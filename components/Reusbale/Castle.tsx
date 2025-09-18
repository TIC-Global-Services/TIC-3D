'use client';

import React, { forwardRef, JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from "three";


type ModelProps = JSX.IntrinsicElements['group'];

interface GLTFResult {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
}
const Model = forwardRef<Group, ModelProps>((props, ref) => {
  const { nodes, materials } = useGLTF('/castle2.glb') as unknown as GLTFResult;

  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[-0.97, 30.245, 28.223]}>
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001.geometry} material={materials.Bark_Mat} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_1.geometry} material={materials.Brunches_Mat} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_2.geometry} material={materials['Material.007']} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_3.geometry} material={materials['MatID_1.002']} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_4.geometry} material={materials.MatID_1} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_5.geometry} material={materials.M_Castlewall} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_6.geometry} material={materials.M_Castleroof} />
        <mesh castShadow receiveShadow geometry={nodes.Christmas_tree_4001_7.geometry} material={materials.M_Emissive} />
      </group>

      {/* Rock meshes using a loop to avoid repetition */}
      {Array.from({ length: 7 }, (_, i) => (
        <React.Fragment key={i}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes as any)[`Aset_rock_cliff_XL_ullqbb1ga_LOD200${i + 1}`].geometry}
            material={materials['Material.007']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes as any)[`Aset_rock_cliff_XL_ullqbb1ga_LOD200${i + 1}_1`].geometry}
            material={materials['MatID_1.002']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes as any)[`Aset_rock_cliff_XL_ullqbb1ga_LOD200${i + 1}_2`].geometry}
            material={materials.MatID_1}
          />
        </React.Fragment>
      ))}
    </group>
  );
});

useGLTF.preload('/castle2.glb');

export default Model;
