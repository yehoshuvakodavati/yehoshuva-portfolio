/**
 * Technology universe.
 * `tier` drives the soft proficiency meter (1 = exploring, 2 = applied, 3 = core).
 * Tier is a self-assessment signal, not a measured score — edit freely.
 */

export const tiers = {
  1: 'Exploring',
  2: 'Applied',
  3: 'Core',
}

export const skillGroups = [
  {
    id: 'programming',
    label: 'Programming',
    blurb: 'Languages I reach for when the problem needs structure.',
    accent: '#4f7cff',
    icon: 'Code2',
    skills: [
      { name: 'Java', tier: 3, note: 'Primary language · DSA & Spring services' },
      { name: 'Python', tier: 3, note: 'AI/ML experiments, automation, tooling' },
      { name: 'JavaScript', tier: 2, note: 'Web frontends and Node services' },
      { name: 'SQL', tier: 2, note: 'Relational modelling and queries' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'Services designed to stay predictable under load.',
    accent: '#7c5cff',
    icon: 'Server',
    skills: [
      { name: 'Spring Boot', tier: 3, note: 'REST services and layered architecture' },
      { name: 'Node.js', tier: 2, note: 'APIs and async tooling' },
      { name: 'Express.js', tier: 2, note: 'Lightweight HTTP services' },
      { name: 'FastAPI', tier: 2, note: 'Model-serving and AI endpoints' },
      { name: 'REST APIs', tier: 3, note: 'Design, validation, error contracts' },
      { name: 'Microservices', tier: 2, note: 'Service boundaries and event flows' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Interfaces that make complex systems feel obvious.',
    accent: '#22d3ee',
    icon: 'LayoutDashboard',
    skills: [
      { name: 'React', tier: 2, note: 'Component architecture and state' },
      { name: 'HTML', tier: 3, note: 'Semantic, accessible structure' },
      { name: 'CSS', tier: 3, note: 'Layout, motion and responsive systems' },
      { name: 'Tailwind CSS', tier: 2, note: 'Design tokens and utility systems' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    blurb: 'Where the systems start to reason, retrieve and respond.',
    accent: '#a78bfa',
    icon: 'BrainCircuit',
    skills: [
      { name: 'Machine Learning', tier: 2, note: 'Supervised learning and evaluation' },
      { name: 'NLP', tier: 2, note: 'Text processing and language tasks' },
      { name: 'RAG', tier: 2, note: 'Retrieval pipelines for grounded answers' },
      { name: 'Embeddings', tier: 2, note: 'Semantic representation and search' },
      { name: 'Vector Databases', tier: 2, note: 'Similarity retrieval over knowledge' },
      { name: 'LLM Applications', tier: 2, note: 'Prompting, routing, tool use' },
      { name: 'TensorFlow', tier: 1, note: 'Learning and experimentation' },
      { name: 'PyTorch', tier: 1, note: 'Learning and experimentation' },
      { name: 'Scikit-learn', tier: 2, note: 'Classical ML baselines' },
    ],
  },
  {
    id: 'data',
    label: 'Database',
    blurb: 'State, kept honest.',
    accent: '#34d399',
    icon: 'Database',
    skills: [
      { name: 'MySQL', tier: 3, note: 'Schema design and transactional work' },
      { name: 'PostgreSQL', tier: 2, note: 'Relational modelling' },
      { name: 'Supabase', tier: 1, note: 'Backend-as-a-service experiments' },
      { name: 'ChromaDB', tier: 2, note: 'Vector storage for RAG' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    blurb: 'The workshop around the work.',
    accent: '#f59e0b',
    icon: 'Wrench',
    skills: [
      { name: 'Git', tier: 3, note: 'Version control and collaboration' },
      { name: 'GitHub', tier: 3, note: 'Repositories and workflow' },
      { name: 'Docker', tier: 2, note: 'Containerised services' },
      { name: 'Maven', tier: 2, note: 'Java build and dependency management' },
      { name: 'IntelliJ IDEA', tier: 3, note: 'Java development environment' },
      { name: 'VS Code', tier: 3, note: 'Polyglot development environment' },
    ],
  },
]

export const skillNote =
  'Proficiency labels are a personal working assessment, not a certification. Update the tier value in src/data/skills.js to keep this honest.'
