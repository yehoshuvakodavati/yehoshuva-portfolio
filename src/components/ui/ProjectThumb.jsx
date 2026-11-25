import { useId } from 'react'

/**
 * Generated, dependency-free project artwork.
 * Set `thumbnail` on a project in src/data/projects.js to use a real screenshot instead.
 */
export default function ProjectThumb({ project, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const accent = project.accent || '#4f7cff'
  const motif = project.motif || 'grid'
  const gridId = `grid-${uid}`
  const glowId = `glow-${uid}`
  const fadeId = `fade-${uid}`

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={`${project.title} — generated visual identity`}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#060a18" />
          <stop offset="55%" stopColor="#08122a" />
          <stop offset="100%" stopColor="#05070f" />
        </linearGradient>
        <radialGradient id={glowId} cx="72%" cy="28%" r="70%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="#8fb0ff" strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="#04060f" stopOpacity="0" />
          <stop offset="100%" stopColor="#04060f" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill={`url(#bg-${uid})`} />
      <rect width="640" height="400" fill={`url(#${gridId})`} />
      <rect width="640" height="400" fill={`url(#${glowId})`} />

      <g stroke="#9db4ff" strokeOpacity="0.16" fill="none">
        <circle cx="520" cy="120" r="86" strokeDasharray="2 7" />
        <circle cx="520" cy="120" r="132" strokeOpacity="0.08" />
      </g>

      <g transform="translate(180 90)">
        {motif === 'candles' && <Candles accent={accent} />}
        {motif === 'waveform' && <Waveform accent={accent} />}
        {motif === 'graph' && <Graph accent={accent} />}
        {motif === 'grid' && <GridMotif accent={accent} />}
        {motif === 'pulse' && <Pulse accent={accent} />}
        {motif === 'bolt' && <Bolt accent={accent} />}
      </g>

      <text x="36" y="52" fill="#93a6cf" fillOpacity="0.55" fontFamily="monospace" fontSize="12" letterSpacing="4">
        {project.index} / {project.category.toUpperCase()}
      </text>

      <rect width="640" height="400" fill={`url(#${fadeId})`} />
    </svg>
  )
}

function Candles({ accent }) {
  const bars = [
    [22, 74, 120],
    [62, 46, 96],
    [102, 92, 148],
    [142, 58, 108],
    [182, 104, 176],
    [222, 70, 132],
  ]
  return (
    <g>
      <line x1="0" y1="190" x2="260" y2="190" stroke="#7f93c4" strokeOpacity="0.18" />
      {bars.map(([x, top, height], i) => (
        <g key={i}>
          <rect x={x} y={top} width="16" height={height} rx="2" fill={i % 2 ? accent : '#1a2a52'} fillOpacity={i % 2 ? 0.85 : 1} />
          <line x1={x + 8} y1={top - 14} x2={x + 8} y2={top + height + 14} stroke={accent} strokeOpacity="0.6" strokeWidth="1.4" />
        </g>
      ))}
      <path d="M18 168 L62 132 L106 146 L150 104 L194 118 L238 72" fill="none" stroke="#22d3ee" strokeOpacity="0.85" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="238" cy="72" r="4.5" fill="#22d3ee" />
    </g>
  )
}

function Waveform({ accent }) {
  const bars = Array.from({ length: 34 }, (_, i) => {
    const center = 110
    const amp = 12 + Math.abs(Math.sin(i * 0.62)) * 58 + (i % 7 === 0 ? 32 : 0)
    return { x: i * 8, h: Math.min(amp, 104), center }
  })
  return (
    <g>
      {bars.map(({ x, h, center }, i) => (
        <rect
          key={i}
          x={x}
          y={center - h / 2}
          width="3.4"
          height={h}
          rx="1.7"
          fill={i < 22 ? accent : '#22d3ee'}
          fillOpacity={0.35 + (h / 104) * 0.6}
        />
      ))}
      <line x1="0" y1="110" x2="272" y2="110" stroke="#9db4ff" strokeOpacity="0.22" />
    </g>
  )
}

function Graph({ accent }) {
  const nodes = [
    [20, 150],
    [80, 70],
    [96, 176],
    [158, 108],
    [206, 44],
    [222, 150],
    [252, 96],
  ]
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
  ]
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={accent}
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 3 ? 26 : 15} fill={accent} fillOpacity={i === 3 ? 0.16 : 0.07} />
          <circle cx={x} cy={y} r={i === 3 ? 6 : 4} fill={i === 4 ? '#22d3ee' : accent} />
        </g>
      ))}
    </g>
  )
}

function GridMotif({ accent }) {
  return (
    <g stroke={accent}>
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 40}
            y={row * 40}
            width="28"
            height="28"
            rx="4"
            fill={accent}
            fillOpacity={(row + col) % 5 === 0 ? 0.28 : 0.05}
            strokeOpacity="0.3"
          />
        )),
      )}
      <path d="M12 158 H240" stroke="#22d3ee" strokeOpacity="0.6" strokeDasharray="3 5" />
    </g>
  )
}

function Pulse({ accent }) {
  return (
    <g>
      <path
        d="M0 120 H62 L78 84 L96 158 L118 52 L138 140 L156 120 H272"
        fill="none"
        stroke={accent}
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M0 120 H62 L78 84 L96 158 L118 52 L138 140 L156 120 H272"
        fill="none"
        stroke={accent}
        strokeWidth="9"
        strokeOpacity="0.14"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="52" r="5" fill="#22d3ee" />
    </g>
  )
}

function Bolt({ accent }) {
  return (
    <g>
      <circle cx="132" cy="112" r="88" fill="none" stroke={accent} strokeOpacity="0.2" strokeDasharray="3 8" />
      <circle cx="132" cy="112" r="62" fill="none" stroke={accent} strokeOpacity="0.3" />
      <path d="M146 24 L84 124 H128 L112 200 L184 96 H136 Z" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="132" cy="112" r="4" fill="#22d3ee" />
    </g>
  )
}
