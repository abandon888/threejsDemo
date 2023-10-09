import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  InstancedRigidBodies,
} from '@react-three/rapier'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFResult } from '../../types'
import { InstanceNode } from 'three/examples/jsm/nodes/Nodes.js'

export default function PhysicsPage() {
  const [hisSound] = useState(new Audio('./his.mp3'))

  const cube = useRef<THREE.Mesh>(null!)
  const twister = useRef<THREE.Mesh>(null!)
  const cubes = useRef<THREE.InstancedMesh>(null!)
  const iPhone = useGLTF('./iphone.gltf') as unknown as GLTFResult
  // const [hovered, setHovered] = useState(false)
  const cubesCount = 100

  const cubeJump = () => {
    //跳跃
    //@ts-ignore
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 })
    //旋转
    //@ts-ignore
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    })
    console.log(cube.current)
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    //@ts-ignore
    twister.current.setNextKinematicRotation(quaternionRotation)

    const angle = time * 0.5
    const x = Math.sin(angle) * 2
    const z = Math.cos(angle) * 2
    //@ts-ignore
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z })
  })

  const collisionEnter = (e: any) => {
    hisSound.currentTime = 0
    hisSound.volume = Math.random()
    hisSound.play()
  }

  const cubesTransforms = useMemo(() => {
    const positions = []
    const orientations = []
    const scales = []

    for (let i = 0; i < cubesCount; i++) {
      positions.push([i * 2, 0, 0])
      orientations.push([0, 0, 0, 1])
      scales.push([1, 1, 1])
    }

    return {
      positions,
      orientations,
      scales,
    }
  }, [])

  useEffect(() => {
    for (let i = 0; i < cubesCount; i++) {
      const matrix = new THREE.Matrix4()
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1)
      )
      cubes.current.setMatrixAt(i, matrix)
    }
  }, [])
  return (
    <>
      <OrbitControls makeDefault />
      <Perf position="top-left" />

      <directionalLight castShadow position={[0, 10, 0]} intensity={1} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.8, 0]}>
        <Debug />
        <RigidBody>
          <mesh castShadow position={[0, 3, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false}>
          <primitive object={iPhone.scene} position={[0, 0, 0]}>
            {/* <CuboidCollider args={[3, 1, 1]} /> */}
          </primitive>
        </RigidBody>

        <RigidBody
          //@ts-ignore
          ref={cube}
          gravityScale={2}
          restitution={1}
          friction={0}
          onCollisionEnter={collisionEnter}
          onSleep={() => console.log('sleep')}
          onWake={() => console.log('wake')}>
          <mesh castShadow position={[3, 5, 0]} onClick={cubeJump}>
            {/* <CuboidCollider args={[1, 1, 1]} /> */}
            <boxGeometry />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" friction={0}>
          <mesh
            receiveShadow
            position-y={-1.25}
            rotation-x={-Math.PI * 0.5}
            scale={10}>
            <boxGeometry args={[1, 1, 0.05]} />
            <meshStandardMaterial color="powderblue" />
          </mesh>
        </RigidBody>

        <RigidBody
          friction={0}
          position={[0, -1, 1]}
          type="kinematicPosition"
          //@ts-ignore
          ref={twister}>
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* add wall */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 1, 0.05]} position={[0, 0, 5]} />

          <CuboidCollider args={[5, 1, 0.05]} position={[0, 0, -5]} />

          <CuboidCollider args={[0.05, 1, 5]} position={[5, 0, 0]} />

          <CuboidCollider args={[0.05, 1, 5]} position={[-5, 0, 0]} />
        </RigidBody>

        {/* add multiple cubes */}
        <InstancedRigidBodies
          positions={cubesTransforms.positions}
          rotations={cubesTransforms.orientations}
          scales={cubesTransforms.scales}>
          <instancedMesh args={[null, null, cubesCount]} ref={cubes}>
            <boxGeometry />
            <meshStandardMaterial color="blue" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  )
}
//其它内容：改变物体质量mass,以及改变质量后仍然实现物体跳跃高度不变
