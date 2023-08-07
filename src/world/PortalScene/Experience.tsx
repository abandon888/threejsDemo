import { Center, Clone, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, Material, AnimationClip, Object3D } from 'three'
import Flag from '../../assets/flag'

type GLTFResult = {
  scene: Object3D<Event> | Object3D<Event>[]
  nodes: {
    [name: string]: Mesh
    scene: Mesh
  }
  materials: {
    [name: string]: Material
  }
  animations: AnimationClip[]
}

export default function PortalScene() {
  const nodes = useGLTF('./dev_interior.glb') as unknown as GLTFResult
  useEffect(() => {
    console.log(nodes)
  }, [nodes])
  return (
    <>
      光照
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={1} />
      <color attach="background" args={['#f1f1']} />
      <OrbitControls makeDefault />
      <Center>
        <mesh scale={1.5}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
        <Html>
          <Flag />
        </Html>
      </Center>
      <Clone object={nodes.scene} position={[0, 1, 1]} />
    </>
  )
}
