import {
  KeyboardControls,
  OrbitControls,
  PointerLockControls,
  useGLTF,
  useKeyboardControls,
} from '@react-three/drei'
import { useThree, useFrame, Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useState, useEffect } from 'react'
import { extend } from '@react-three/fiber'
import { Debug, Physics, RigidBody } from '@react-three/rapier'
import { Player } from './player'

export default function GalleryPage() {
  const gallery = useGLTF('./gallery/scene_collision.gltf')
  const { camera } = useThree()
  const [position, setPositon] = useState([0, 0, 0])
  // const controls = new OrbitControls(camera)

  // //使用useFrame持续更新相机的位置
  // useFrame((state) => {
  //   // const position = state.camera.position
  //   // const quaternion = state.camera.quaternion
  //   // const euler = state.camera.rotation
  //   // console.log(position)
  //   //更新相机的位置
  //   camera.position.set(position[0], position[1], position[2])
  //   const controls = new OrbitControls(camera,camera.domElement)
  // })

  // const changePosition = (e: any) => {
  //   //根据按下的键盘按键，改变相机的位置,w向前，s向后，a向左，d向右
  //   switch (e.key) {
  //     case 'w':
  //       setPositon([position[0], position[1], position[2] - 1])
  //       break
  //     case 's':
  //       setPositon([position[0], position[1], position[2] + 1])
  //       break
  //     case 'a':
  //       setPositon([position[0] - 1, position[1], position[2]])
  //       break
  //     case 'd':
  //       setPositon([position[0] + 1, position[1], position[2]])
  //       break
  //     default:
  //       break
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('keydown', changePosition)
  //   return () => {
  //     window.removeEventListener('keydown', changePosition)
  //   }
  // }, [])

  // useEffect(() => {
  //   //设置相机的位置
  //   camera.position.set(position[0], position[1], position[2])
  // }, [])

  return (
    <>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
        ]}>
        <Physics>
          <Debug />
          {/* <Canvas camera={{ position: [0, 0, 0] }}> */}
          <Perf position="top-left" />
          <directionalLight castShadow position={[0, 10, 0]} intensity={1} />
          <ambientLight intensity={0.5} />
          {/* 引入模型 */}
          <Player />
          <RigidBody type="fixed" colliders="cuboid">
            <primitive object={gallery.scene} />;{/* </Canvas> */}
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
        </Physics>
        <PointerLockControls />
      </KeyboardControls>
    </>
  )
}
