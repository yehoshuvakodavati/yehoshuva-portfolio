import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const PALETTES = {
  dark: {
    core: '#050b1c',
    emissive: '#1f45ff',
    wire: '#7ea2ff',
    ring: '#22d3ee',
    ringAlt: '#a78bfa',
    particle: '#8fb0ff',
    satellite: '#22d3ee',
  },
  light: {
    core: '#aebfe6',
    emissive: '#2f5fe0',
    wire: '#2f5fe0',
    ring: '#0891b2',
    ringAlt: '#7c4dff',
    particle: '#4a6fd0',
    satellite: '#0891b2',
  },
}

function useImperativePointer() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      pointer.current.x = 0
      pointer.current.y = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return pointer
}

function Rig({ pointer, scroll, reduced }) {
  const { camera } = useThree()

  useFrame(() => {
    const targetX = pointer.current.x * 0.55
    const targetY = pointer.current.y * 0.38 + scroll.current * 0.35

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, reduced ? 0.2 : 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, reduced ? 0.2 : 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.4 + scroll.current * 1.2, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function DigitalCore({ palette, pointer, reduced }) {
  const group = useRef()
  const shell = useRef()
  const inner = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (!group.current) return

    if (!reduced) {
      group.current.rotation.y += delta * 0.11
      shell.current.rotation.y -= delta * 0.16
      shell.current.rotation.x += delta * 0.04
      inner.current.rotation.y += delta * 0.06
    }

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.24, 0.035)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.current.x * 0.1, 0.035)
    group.current.position.y = Math.sin(t * 0.55) * 0.1
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.92, 5]} />
        <MeshDistortMaterial
          color={palette.core}
          emissive={palette.emissive}
          emissiveIntensity={0.1}
          roughness={0.16}
          metalness={0.96}
          distort={reduced ? 0 : 0.16}
          speed={1.1}
        />
      </mesh>

      <mesh ref={inner} scale={1.02}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.5} />
      </mesh>

      <mesh ref={shell} scale={1.5}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.16} />
      </mesh>

      <mesh scale={1.75}>
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshBasicMaterial color={palette.emissive} transparent opacity={0.08} depthWrite={false} />
      </mesh>

      <pointLight color={palette.emissive} intensity={1.4} distance={5} />
    </group>
  )
}

function Ring({ radius, rotation, color, speed, reduced, opacity = 0.5, thickness = 0.004 }) {
  const mesh = useRef()

  useFrame((_, delta) => {
    if (!mesh.current || reduced) return
    mesh.current.rotation.z += delta * speed
  })

  return (
    <mesh ref={mesh} rotation={rotation}>
      <torusGeometry args={[radius, thickness, 3, 180]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Satellites({ palette, reduced }) {
  const group = useRef()

  useFrame((state, delta) => {
    if (!group.current || reduced) return
    group.current.rotation.y += delta * 0.22
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18
  })

  const bodies = useMemo(
    () => [
      { radius: 1.4, y: 0.1, size: 0.042, color: palette.satellite, angle: 0 },
      { radius: 1.66, y: -0.34, size: 0.03, color: palette.ringAlt, angle: Math.PI * 0.7 },
      { radius: 1.24, y: 0.5, size: 0.026, color: palette.wire, angle: Math.PI * 1.3 },
    ],
    [palette],
  )

  return (
    <group ref={group}>
      {bodies.map((body, index) => (
        <mesh
          key={index}
          position={[Math.cos(body.angle) * body.radius, body.y, Math.sin(body.angle) * body.radius]}
        >
          <sphereGeometry args={[body.size, 12, 12]} />
          <meshBasicMaterial color={body.color} />
        </mesh>
      ))}
    </group>
  )
}

function Stardust({ palette, reduced, count }) {
  const points = useRef()

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 3.4 + Math.random() * 7.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.7
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return buffer
  }, [count])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((_, delta) => {
    if (!points.current || reduced) return
    points.current.rotation.y += delta * 0.014
    points.current.rotation.x += delta * 0.004
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.022}
        color={palette.particle}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function SceneContent({ theme, reduced }) {
  const palette = PALETTES[theme] ?? PALETTES.dark
  const pointer = useImperativePointer()
  const scroll = useRef(0)
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 1400
    return window.innerWidth < 768 ? 900 : window.innerWidth < 1280 ? 1500 : 2200
  }, [])

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Rig pointer={pointer} scroll={scroll} reduced={reduced} />
      <ambientLight intensity={theme === 'light' ? 1.15 : 0.3} />
      <directionalLight position={[4, 5, 6]} intensity={theme === 'light' ? 2 : 2.4} color="#dfe8ff" />
      <directionalLight position={[-5, 2, -3]} intensity={theme === 'light' ? 1.2 : 1.8} color={palette.ringAlt} />
      <pointLight position={[-6, -3, -4]} intensity={18} color={palette.ringAlt} distance={14} />
      <pointLight position={[3, -4, 2]} intensity={6} color={palette.ring} distance={10} />

      <group position={[0.62, 0.06, 0]}>
        <DigitalCore palette={palette} pointer={pointer} reduced={reduced} />
        <Satellites palette={palette} reduced={reduced} />

        <Ring radius={1.42} rotation={[Math.PI / 2.15, 0.32, 0]} color={palette.ring} speed={0.16} reduced={reduced} opacity={0.42} />
        <Ring radius={1.72} rotation={[Math.PI / 2.7, -0.5, 0.4]} color={palette.ringAlt} speed={-0.1} reduced={reduced} opacity={0.26} />
        <Ring radius={1.98} rotation={[Math.PI / 1.9, 0.1, -0.3]} color={palette.wire} speed={0.06} reduced={reduced} opacity={0.16} thickness={0.003} />
      </group>

      <Stardust palette={palette} reduced={reduced} count={particleCount} />
    </>
  )
}

export default function HeroScene({ theme = 'dark', reduced = false, active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <SceneContent theme={theme} reduced={reduced} />
    </Canvas>
  )
}
