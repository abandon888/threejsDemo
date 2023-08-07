/* eslint-disable react-hooks/rules-of-hooks */
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFResult } from '../../types'

export default function portfoli() {
  const computer = useGLTF('./mac.gltf') as unknown as GLTFResult

  return (
    <>
      <Environment preset="city" />

      <color attach="background" args={['#000']} />

      <OrbitControls makeDefault />

      <primitive object={computer.scene} />
    </>
  )
}
