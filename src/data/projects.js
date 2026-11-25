/**
 * Project galaxy.
 * Only verified links are populated. Missing links render as an explicit
 * "link pending" state instead of a dead or invented URL.
 *
 * status options: 'In development' | 'Working prototype' | 'Internship build' | 'Academic project'
 */

export const projects = [
  {
    id: 'stockm',
    index: '01',
    title: 'stockM',
    subtitle: 'AI-driven market intelligence',
    category: 'AI / ML · Data',
    year: '2025 — now',
    status: 'In development',
    motif: 'candles',
    accent: '#4f7cff',
    thumbnail: '/assets/projects/stockM1.png', // add /assets/projects/stockm.jpg to override generated art
    description:
      'A market intelligence workspace that turns years of price history into features a model can reason over, then answers questions about it with retrieval-grounded context.',
    problem:
      'Raw market data is noisy and unstructured. Most retail analysis stops at a chart — there is no layer that explains movement in language a decision-maker can act on.',
    architecture: [
      { label: 'Ingest', detail: 'Historical market data collection and normalisation' },
      { label: 'Feature engineering', detail: 'Indicators, returns, volatility and windowed features' },
      { label: 'Index', detail: 'Embeddings stored in a vector database' },
      { label: 'Retrieve', detail: 'RAG layer pulls relevant context per query' },
      { label: 'Experiment', detail: 'Predictive model iterations and evaluation' },
    ],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'RAG', 'Vector Database'],
    features: [
      'Historical market data processing pipeline',
      'Feature engineering for model input',
      'Retrieval-augmented analysis over indexed context',
      'Model experimentation and evaluation loop',
    ],
    contributions: [
      'Designed the data preparation and feature pipeline',
      'Built the retrieval layer and vector store integration',
      'Ran model experiments and compared results',
    ],
    challenges: [
      {
        challenge: 'Market series are non-stationary and full of gaps.',
        solution: 'Feature windows and validation splits that respect chronology instead of random shuffling.',
      },
      {
        challenge: 'Retrieval was returning loosely related context.',
        solution: 'Chunking and metadata filters tuned around time windows and symbol scope.',
      },
    ],
    links: {
      github: 'https://github.com/yehoshuvakodavati/stockM',
      live: null,
    },
    media: [
      '/public/assets/projects/stockM1.png',
      '/public/assets/projects/stockM2.png',
      '/public/assets/projects/stockM3.png',
    ],
    note: 'Active build — model results are experimental and not published as performance claims.',
  },
  {
    id: 'jarvis',
    index: '02',
    title: 'Jarvis AI Assistant',
    subtitle: 'A local-first voice operating layer',
    category: 'AI · Systems',
    year: '2025',
    status: 'In development',
    motif: 'waveform',
    accent: '#7c5cff',
    thumbnail: null,
    description:
      'A Python assistant that listens, understands intent and executes real work on the machine — from web search and code generation to opening apps and controlling system settings.',
    problem:
      'Voice assistants are cloud-locked and generic. A developer needs something local, private and able to act on the operating system.',
    architecture: [
      { label: 'Capture', detail: 'Microphone input with voice activity detection' },
      { label: 'Transcribe', detail: 'Faster-Whisper speech-to-text' },
      { label: 'Route', detail: 'Intent classifier picks the right tool or model' },
      { label: 'Reason', detail: 'Local LLM via Ollama (Mistral / LLaMA 3)' },
      { label: 'Act', detail: 'Tool execution: search, code, apps, settings, power' },
      { label: 'Speak', detail: 'pyttsx3 real-time speech response' },
    ],
    stack: ['Python', 'Faster-Whisper', 'pyttsx3', 'Ollama', 'Mistral', 'LLaMA 3'],
    features: [
      'Voice interaction loop with low-latency transcription',
      'AI-driven command router across multiple intent classes',
      'System-level actions: applications, settings and power control',
      'Web search and code generation tools',
      'Modular multi-model support',
    ],
    contributions: [
      'Built the transcription and speech response loop',
      'Designed the modular router between tools and models',
      'Implemented system action handlers and safety checks',
    ],
    challenges: [
      {
        challenge: 'Transcription latency made conversation feel unnatural.',
        solution: 'Streamed audio chunks and trimmed the pipeline to the smallest viable model size.',
      },
      {
        challenge: 'Free-form LLM output cannot be executed directly.',
        solution: 'Constrained tool schemas with validation before any system action runs.',
      },
    ],
    links: {
      github: 'https://github.com/yehoshuvakodavati/Jarvis-AI-Assistant-',
      live: null,
    },
    media: [],
    note: 'Runs locally; no hosted demo by design.',
  },
  {
    id: 'multiagents',
    index: '03',
    title: 'MultiAgents',
    subtitle: 'RAG-powered travel planning',
    category: 'RAG · Agents',
    year: '2025',
    status: 'Working prototype',
    motif: 'graph',
    accent: '#22d3ee',
    thumbnail: null,
    description:
      'A retrieval-augmented planning system that composes personalised itineraries from user preferences, location context and live search results.',
    problem:
      'Generic travel lists ignore taste, budget and location. Planning well requires current information and a model that can reason over it without hallucinating venues.',
    architecture: [
      { label: 'Preferences', detail: 'Interest, budget and pace capture' },
      { label: 'Ground', detail: 'Location parsing from city, address or coordinates' },
      { label: 'Search', detail: 'Live search for current events and venues' },
      { label: 'Retrieve', detail: 'RAG over collected context' },
      { label: 'Orchestrate', detail: 'Agent roles split research and composition' },
      { label: 'Compose', detail: 'Max three distinct activities with detail per plan' },
    ],
    stack: ['Python', 'LLM', 'RAG', 'NLP', 'Vector Search'],
    features: [
      'Personalised plans driven by stated interests',
      'Location-aware recommendations',
      'Real-time search grounding for current venues',
      'Deliberate limit of three distinct activities per plan',
      'Detailed location information for each suggestion',
    ],
    contributions: [
      'Built the retrieval pipeline and agent orchestration',
      'Integrated live search into the planning flow',
      'Shaped the output contract to keep plans usable',
    ],
    challenges: [
      {
        challenge: 'Models invented venues that did not exist.',
        solution: 'Ground every suggestion in retrieved search context and reject unsupported items.',
      },
      {
        challenge: 'Long plans became generic filler.',
        solution: 'Hard cap on activity count with a minimum detail requirement per item.',
      },
    ],
    links: {
      github: 'https://github.com/yehoshuvakodavati/MultiAgents',
      live: null,
    },
    media: [],
    note: null,
  },
  {
    id: 'ecommerce',
    index: '04',
    title: 'E-commerce Microservices',
    subtitle: 'Event-driven order and inventory',
    category: 'Backend · Distributed',
    year: '2025',
    status: 'In development',
    motif: 'grid',
    accent: '#a78bfa',
    thumbnail: null,
    description:
      'A production-style commerce backend split into independent services that communicate through events, modelling how orders and stock stay consistent in the real world.',
    problem:
      'A monolith couples checkout to inventory. Under load, one slow path takes down the whole purchase flow.',
    architecture: [
      { label: 'Client', detail: 'React storefront' },
      { label: 'Order Service', detail: 'Spring Boot order lifecycle and validation' },
      { label: 'Event bus', detail: 'Apache Kafka topics for order events' },
      { label: 'Inventory Service', detail: 'Stock reservation and release' },
      { label: 'Storage', detail: 'MySQL per-service schemas' },
      { label: 'Runtime', detail: 'Dockerised service deployment' },
    ],
    stack: ['Java', 'Spring Boot', 'Apache Kafka', 'Docker', 'MySQL', 'React'],
    features: [
      'Independent Order and Inventory services',
      'Asynchronous event-driven communication',
      'Order lifecycle modelling',
      'Containerised local environment',
    ],
    contributions: [
      'Designed service boundaries around order and stock domains',
      'Implemented Kafka producers and consumers',
      'Containerised services for reproducible runs',
    ],
    challenges: [
      {
        challenge: 'Stock could be double-reserved on retries.',
        solution: 'Idempotent consumers keyed by event id with explicit reservation states.',
      },
      {
        challenge: 'Debugging async flows was opaque.',
        solution: 'Structured event logging with correlation ids across services.',
      },
    ],
    links: {
      github: 'https://github.com/yehoshuvakodavati/Ecommerce-System',
      live: null,
    },
    media: [],
    note: null,
  },
  {
    id: 'hospital',
    index: '05',
    title: 'Hospital Management System',
    subtitle: 'Full-stack clinical operations',
    category: 'Full-stack · Internship',
    year: 'Internship',
    status: 'Internship build',
    motif: 'pulse',
    accent: '#34d399',
    thumbnail: null,
    description:
      'A hospital operations platform built during software engineering internship work, covering the administrative flow between patients, staff and records.',
    problem:
      'Clinical administration still runs on disconnected spreadsheets, which makes patient flow and record lookup slow and error-prone.',
    architecture: [
      { label: 'Client', detail: 'Web frontend for staff roles' },
      { label: 'API', detail: 'Service layer for patients, appointments and records' },
      { label: 'Data', detail: 'Relational storage for operational entities' },
    ],
    stack: ['Full-stack', 'Relational database'],
    features: ['Patient and appointment administration', 'Staff-facing operational views', 'Record management'],
    contributions: [
      'Contributed to full-stack feature implementation during the internship',
      'Worked within the team codebase and review process',
    ],
    challenges: [],
    links: { github: null, live: null },
    media: [],
    note: 'Implementation details are pending verification and will be updated with confirmed scope. The repository is not public.',
  },
  {
    id: 'ev-charging',
    index: '06',
    title: 'Smart EV Charging Station',
    subtitle: 'IoT telemetry and monitoring',
    category: 'IoT · Embedded',
    year: 'Academic',
    status: 'Academic project',
    motif: 'bolt',
    accent: '#f59e0b',
    thumbnail: null,
    description:
      'An IoT prototype that streams charging-station telemetry from an ESP32 to a live monitoring dashboard, with MQTT as the transport layer.',
    problem:
      'Charging infrastructure is opaque to operators. Without live telemetry, faults and utilisation are invisible until a customer reports them.',
    architecture: [
      { label: 'Sense', detail: 'ESP32 reads station metrics' },
      { label: 'Simulate', detail: 'Wokwi circuit and firmware prototyping' },
      { label: 'Transport', detail: 'MQTT publish over lightweight topics' },
      { label: 'Platform', detail: 'ThingsBoard ingestion and rules' },
      { label: 'Monitor', detail: 'Live dashboard for station state' },
    ],
    stack: ['ESP32', 'MQTT', 'Wokwi', 'ThingsBoard'],
    features: [
      'Simulated sensor telemetry from an ESP32',
      'MQTT publish/subscribe data flow',
      'Live ThingsBoard monitoring dashboard',
    ],
    contributions: [
      'Built the circuit and firmware prototype in Wokwi',
      'Configured MQTT topics and device provisioning',
      'Assembled the ThingsBoard dashboard',
    ],
    challenges: [
      {
        challenge: 'MQTT payloads needed a stable schema for the dashboard.',
        solution: 'Fixed topic structure with consistent telemetry keys and device ids.',
      },
    ],
    links: { github: null, live: null },
    media: [],
    note: 'Academic prototype. Repository link pending.',
  },
]

export const projectFilters = ['All', 'AI / ML · Data', 'AI · Systems', 'RAG · Agents', 'Backend · Distributed', 'Full-stack · Internship', 'IoT · Embedded']

export const projectCTA = {
  title: 'More experiments live on GitHub.',
  body: 'Repositories, commits and work-in-progress builds — updated as the systems evolve.',
  href: 'https://github.com/yehoshuvakodavati',
}
