type GLTFResult = GLTF & {
  nodes: { robot: THREE.Mesh; rocket: THREE.Mesh }
  materials: {
    metal: THREE.MeshStandardMaterial
    wood: THREE.MeshStandardMaterial
  }
}
