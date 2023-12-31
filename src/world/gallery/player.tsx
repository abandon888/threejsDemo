// 导入 Three.js
import * as THREE from 'three'
import { Vector3 } from 'three'
// 导入 Rapier 物理引擎
import * as RAPIER from '@dimforge/rapier3d-compat'

// 从 React 中导入 useRef 和 useFrame Hook
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// 从 drei 中导入键盘控制 Hook
import { useKeyboardControls } from '@react-three/drei'

// 从 Rapier 中导入碰撞体、刚体和 Hook
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier'

// 移动速度
const SPEED = 5

// 存储移动方向的向量
const direction: THREE.Vector3 = new THREE.Vector3()

// 正前方方向向量
const frontVector: THREE.Vector3 = new THREE.Vector3()

// 正左方方向向量
const sideVector: THREE.Vector3 = new THREE.Vector3()

// 绕 Y 轴旋转的角度向量
const rotation = new THREE.Vector3()

export function Player({ lerp = THREE.MathUtils.lerp }) {
  // 保存对斧头和玩家游戏对象的引用
  // const axe = useRef()
  const ref = useRef<RAPIER.RigidBody>()

  // 初始化 Rapier 物理引擎
  const rapier = useRapier()

  // 获取键盘输入
  const [, get] = useKeyboardControls()

  useFrame((state) => {
    // 获取键盘输入方向
    const { forward, backward, left, right, jump } = get()
    //console.log(forward, backward, left, right, jump)

    // 当前速度向量
    const velocity = ref.current.linvel()
    // console.log(velocity)
    // 更新摄像机位置跟随玩家
    state.camera.position.set(
      ref.current.translation().x,
      ref.current.translation().y,
      ref.current.translation().z
    )

    // // 更新斧头朝向
    // axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
    // axe.current.rotation.copy(state.camera.rotation)
    // axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))

    // 根据键盘输入计算前进和左右移动方向
    //@ts-ignore
    frontVector.set(0, 0, backward - forward)
    //console.log(frontVector)
    //@ts-ignore
    sideVector.set(left - right, 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation)

    // 设置线性速度
    ref.current.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    )

    // 判断是否在地面,从而实现跳跃
    const world: RAPIER.World = rapier.world.raw()
    const ray = world.castRay(
      new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }),
      1,
      true
    )
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 }, true)
  })

  // useEffect(() => {
  //   // 设置玩家的初始位置
  //   ref.current.setTranslation({ x: -5, y: 0, z: 15 })
  // }, [])
  return (
    <>
      {/* 刚体组件 */}
      <RigidBody
        //@ts-ignore
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        //position={[-5, 0, 15]}
        enabledRotations={[false, false, false]}>
        {/* 胶囊碰撞体 */}
        <CapsuleCollider args={[0.6, 0.4]} />
      </RigidBody>

      {/* 斧头 */}
      {/* <group
        ref={axe}
        onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}
      >
        <Axe position={[0.3, -0.35, 0.5]} />
      </group> */}
    </>
  )
}
