import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTFResult } from '../../types'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

type BookCaseProps = React.PropsWithChildren<Record<string, unknown>>

export function BookCase(props: BookCaseProps) {
  type GLTFResult = GLTF & {
    nodes: {
      [name: string]: THREE.Mesh
    }
    materials: {
      [name: string]: THREE.Material
    }
  }

  const { nodes, materials } = useGLTF('/bookcase.gltf') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bookcase_1?.geometry}
        material={materials['RS Material.10']}
        position={[-0.777, -0.62, -1.174]}
      />
    </group>
  )
}

useGLTF.preload('/bookcase.gltf')
