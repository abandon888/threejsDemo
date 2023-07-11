import { Clone, OrbitControls, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, Material, AnimationClip } from 'three'

type GLTFResult = {
  nodes: {
    [name: string]: Mesh
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
      <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
      <Clone object={nodes.scene} position={[0, 1, 1]} />
    </>
  )
}
