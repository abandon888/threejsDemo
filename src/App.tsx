/* eslint-disable */
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
//import { World } from './World1/World.js'
import { Leva } from 'leva'
import Experience from './world/Experience.js'
import World1 from './world/World.js'
import Portfoli from './world/Portfolio/index.js'
import Physics from './world/physics/index.js'

export default function App() {
  const created = ({ scene }: any) => {
    scene.background = new THREE.Color('white')
  }
  return (
    <>
      <Leva collapsed></Leva>
      <Canvas
        //dir='2'
        // orthographic
        //flat
        //   gl={ { antialias: true,
        //   toneMapping: THREE.ACESFilmicToneMapping,
        //   outputEncoding: THREE.sRGBEncoding,
        // } }
        shadows
        camera={{
          position: [3, 2, 6],
          //  zoom: 50,
          fov: 45,
          near: 0.1,
          far: 200,
        }}
        onCreated={created}>
        {/* <Experience /> */}
        {/* <World1 /> */}
        {/* <ModelExp /> */}
        {/* <PortalScene /> */}
        {/* <PostProcess /> */}
        {/* <Portfoli /> */}
        {<Physics />}
      </Canvas>
    </>
  )
}
