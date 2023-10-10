/* eslint-disable */
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
//import { World } from './World1/World.js'
import { Leva } from 'leva'
import Experience from './world/Experience.js'
import World1 from './world/World.js'
import Portfoli from './world/Portfolio/index.js'
import Physics from './world/physics/index.js'
import GalleryPage from './world/gallery/index.js'
import { useEffect, useState } from 'react'
import { KeyboardControls, useKeyboardControls } from '@react-three/drei'

export default function App() {
  // const created = ({ scene }: any) => {
  //   scene.background = new THREE.Color('white')
  // }
  //添加第一人称控制器
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
          //  zoom: 50,
          fov: 45,
          near: 0.1,
          far: 200,
        }}>
        {/* <Experience /> */}
        {/* <World1 /> */}
        {/* <ModelExp /> */}
        {/* <PortalScene /> */}
        {/* <PostProcess /> */}
        {/* <Portfoli /> */}
        {/* {<Physics />} */}
        <GalleryPage />
      </Canvas>
    </>
  )
}
