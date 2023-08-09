/* eslint-disable react-hooks/rules-of-hooks */
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  useGLTF,
  Text,
} from '@react-three/drei'
import { GLTFResult } from '../../types'
import './index.css'

export default function portfoli() {
  const computer = useGLTF('./mac.gltf') as unknown as GLTFResult

  return (
    <>
      {/* <Environment preset="sunset" /> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} />

      <color attach="background" args={['#000']} />

      <PresentationControls
        global
        rotation={[0.13, 1.3, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}>
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#ff6900'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <primitive object={computer.scene} position={[0, -1.2, 0]}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}>
              <iframe src="https://incu.ncuos.com/" />
            </Html>
          </primitive>

          <Text
            fontSize={0.5}
            position={[2.0, 0.75, 0.65]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center">
            Made by WangYuhan
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={1.4}
        opacity={0.4}
        scale={5}
        blur={2.4}></ContactShadows>
    </>
  )
}
