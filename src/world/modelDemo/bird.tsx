/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import React, { useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from 'react'

type GLTFResult = GLTF & {
  nodes: {
    [name: string]: THREE.Mesh
  }
  materials: {
    [name: string]: THREE.Material
  }
  animations: THREE.AnimationClip[]
}

export function Bird(props: any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/Flamingo.glb'
  ) as GLTFResult
  console.log(animations)
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    console.log(actions)
    animations.forEach((clip) => {
      const action = actions[clip.name]
      if (action) {
        action.play()
      }
    })
  }, [actions])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Object_0"
          castShadow
          receiveShadow
          geometry={nodes.Object_0.geometry}
          material={materials.Material_0_COLOR_0}
          morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
          morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => {
            console.log('click')
          }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Flamingo.glb')
