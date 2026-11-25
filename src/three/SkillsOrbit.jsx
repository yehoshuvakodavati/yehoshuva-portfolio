import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { skillGroups } from '../data/skills'

const NODE_RADIUS = 2.25

function OrbitNode({ group, index, active, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const mesh = useRef()

  const angle = (index / skillGroups.length) * Math.PI * 2
  const position = useMemo(
    () => [Math.cos(angle) * NODE_RADIUS, Math.sin(index * 1.9) * 0.55, Math.sin(angle) * NODE_RADIUS],
    [angle, index],
  )

  useFrame((state) => {
    if (!mesh.current) return
    const target = active ? 1.5 : hovered ? 1.28 : 1
    const scale = THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.12)
    mesh.current.scale.setScalar(scale)
    mesh.current.rotation.y = state.clock.elapsedTime * 0.6
  })

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(group.id)
        }}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = ''
        }}
      >
        <icosahedronGeometry args={[active ? 0.27 : 0.2, 1]} />
        <meshStandardMaterial
          color={group.accent}
          emissive={group.accent}
          emissiveIntensity={active ? 1.5 : 0.55}
          roughness={0.28}
          metalness={0.7}
        />
      </mesh>

      <mesh scale={active ? 2.1 : 1.6}>
        <sphereGeometry args={[0.27, 20, 20]} />
        <meshBasicMaterial color={group.accent} transparent opacity={active ? 0.16 : 0.06} depthWrite={false} />
      </mesh>

      <Html center distanceFactor={9} position={[0, 0.5, 0]} zIndexRange={[20, 0]}>
        <button
          type="button"
          onClick={() => onSelect(group.id)}
          className={`whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
            active
              ? 'border-cyan/50 bg-elev/90 text-ink'
              : 'border-line bg-elev/70 text-mute hover:text-ink'
          }`}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {group.label}
        </button>
      </Html>
    </group>
  )
}

function Orbit({ activeId, onSelect, reduced }) {
  const group = useRef()

  useFrame((_, delta) => {
    if (!group.current || reduced) return
    group.current.rotation.y += delta * 0.09
  })

  const ringGeometry = useMemo(() => {
    const points = []
    for (let i = 0; i <= 128; i += 1) {
      const angle = (i / 128) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * NODE_RADIUS, 0, Math.sin(angle) * NODE_RADIUS))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  useEffect(() => () => ringGeometry.dispose(), [ringGeometry])

  return (
    <group ref={group} rotation={[0.08, 0, 0.05]}>
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial color="#1b2a52" emissive="#3f6bff" emissiveIntensity={0.7} metalness={0.9} roughness={0.3} wireframe />
      </mesh>
      <mesh scale={1.55}>
        <sphereGeometry args={[0.62, 24, 24]} />
        <meshBasicMaterial color="#4f7cff" transparent opacity={0.07} depthWrite={false} />
      </mesh>

      <line>
        <primitive object={ringGeometry} attach="geometry" />
        <lineBasicMaterial color="#4f7cff" transparent opacity={0.22} />
      </line>

      {skillGroups.map((group, index) => (
        <OrbitNode key={group.id} group={group} index={index} active={activeId === group.id} onSelect={onSelect} />
      ))}
    </group>
  )
}

export default function SkillsOrbit({ activeId, onSelect, theme = 'dark', reduced = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0.9, 5.4], fov: 45 }}
      dpr={[1, 1.6]}
      frameloop={reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <ambientLight intensity={theme === 'light' ? 1.2 : 0.6} />
      <directionalLight position={[3, 4, 5]} intensity={theme === 'light' ? 1.4 : 1} />
      <pointLight position={[-4, -2, -3]} intensity={16} color="#a78bfa" distance={12} />
      <Orbit activeId={activeId} onSelect={onSelect} reduced={reduced} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.7}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}
