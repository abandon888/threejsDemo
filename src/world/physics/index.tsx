import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RigidBody, Debug, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react'

export default function PhysicsPage() {
  const cube = useRef<THREE.Mesh>(null!)

  // const [hovered, setHovered] = useState(false)

  const cubeJump = () => {
    //cube.current.applyImpulse([0, 5, 0])
    console.log('jump')
  }
  return (
    <>
      <OrbitControls makeDefault />
      <Perf position="top-left" />

      <directionalLight castShadow position={[0, 10, 0]} intensity={1} />
      <ambientLight intensity={0.5} />

      <Physics>
        <Debug />
        <RigidBody>
          <mesh castShadow position={[0, 3, 0]} ref={cube}>
            <sphereGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody>
          <mesh castShadow position={[0, 5, 0]}>
            {/* <CuboidCollider args={[1, 1, 1]} /> */}
            <torusGeometry />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
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
    </>
  )
}
