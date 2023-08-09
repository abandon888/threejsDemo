import { Center, Clone, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, Material, AnimationClip } from 'three'
import Flag from '../../assets/flag'
import { Perf } from 'r3f-perf'
import { EffectComposer } from '@react-three/postprocessing'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

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
      <Perf openByDefault position={'bottom-right'} />

      <OrbitControls makeDefault />

      <directionalLight position={[0, 10, 0]} intensity={1} castShadow />
      <ambientLight intensity={0.5} />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh castShadow position={[0, 5, 0]} receiveShadow>
            <sphereGeometry />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </RigidBody>

        <mesh castShadow position={[2, 0, 0]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color={'blue'} />
        </mesh>

        <RigidBody
          colliders={false}
          position={[0, 3, 0]}
          //Math.PI * 0.5相当于90度
          rotation={[Math.PI * 0.5, 0, 0]}>
          <CuboidCollider args={[1, 1, 1]} />
          <mesh castShadow receiveShadow>
            <torusGeometry args={[1, 0.4, 16, 32]} />
            <meshStandardMaterial color={'green'} />
          </mesh>
        </RigidBody>

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
