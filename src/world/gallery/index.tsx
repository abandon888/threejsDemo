import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function GalleryPage() {
  const gallery = useGLTF('./gallery/scene_collision.gltf')
  return (
    <>
      <OrbitControls makeDefault />
      <Perf position="top-left" />
      <directionalLight castShadow position={[0, 10, 0]} intensity={1} />
      <ambientLight intensity={0.5} />
      {/* 引入模型 */}
      <primitive object={gallery.scene} />;
    </>
  )
}
