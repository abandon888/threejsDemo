import { Center, Clone, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, Material, AnimationClip } from 'three'
import Flag from '../../assets/flag'
import { Perf } from 'r3f-perf'
import { EffectComposer } from '@react-three/postprocessing'
import { Physics, RigidBody } from '@react-three/rapier'

type GLTFResult = {
  nodes: {
    [name: string]: Mesh
  }
  materials: {
    [name: string]: Material
  }
  animations: AnimationClip[]
}

export default function PostProcess() {
  return (
    <>
      {/* <EffectComposer multisampling={0}>1</EffectComposer> */}

      <Perf openByDefault position={'bottom-right'} />

      <OrbitControls makeDefault />

      <directionalLight position={[0, 10, 0]} intensity={1} />
      <ambientLight intensity={0.5} />

      <Physics>
        <RigidBody>
          <mesh castShadow position={[-2, 0, 0]} receiveShadow>
            <sphereGeometry />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </RigidBody>
        <mesh castShadow position={[2, 0, 0]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color={'Purple'} />
        </mesh>

        <RigidBody type="fixed">
          <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
      {/* <mesh castShadow position={[2, 0, 0]} receiveShadow scale={1.5}> */}
    </>
  )
}
