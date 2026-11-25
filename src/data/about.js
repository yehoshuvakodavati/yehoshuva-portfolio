/** About section: narrative, philosophy and grounded facts. */

export const about = {
  kicker: 'The human behind the code',
  heading: 'I design systems that think, and ship them like products.',
  intro:
    "I'm Kodavati Yehoshuva — a third-year Computer Science student at ANITS, Visakhapatnam, working at the intersection of backend engineering and applied AI. My work starts with a simple question: what would this system look like if it had to survive real users?",
  paragraphs: [
    "I began with a Diploma in Computer Engineering, where I graduated with 88%, and moved into a B.Tech in Computer Science and Engineering. Along the way the interesting problems stopped being about syntax and started being about architecture — how services talk to each other, how data stays trustworthy, how a model earns its place in a product.",
    "Today I build across that stack. Java and Spring Boot for services that need structure. Python for retrieval pipelines, LLM tooling and experiments. React when the interface has to make a complicated system feel obvious. My current CGPA is 8.0, and the part of the transcript I care about most is the part that turns into working software.",
    "I'm most alive when a project has a real constraint — a flaky data source, a latency budget, a model that confidently invents things. That is where engineering stops being coursework and becomes craft.",
  ],
  facts: [
    { label: 'CGPA', value: '8.0', note: 'B.Tech CSE · current' },
    { label: 'Diploma', value: '88%', note: 'Computer Engineering' },
    { label: 'Graduating', value: '2028', note: 'ANITS, Visakhapatnam' },
    { label: 'Projects', value: '06', note: 'Shipped & in progress' },
  ],
  focus: [
    'Backend architecture and service design',
    'Retrieval-augmented generation and LLM tooling',
    'Data pipelines for applied machine learning',
    'Interfaces that explain complex systems',
  ],
  philosophy: {
    title: 'Engineering philosophy',
    body: 'Build the smallest honest version. Measure it. Then make it faster, safer and clearer — in that order. Elegance is what remains after the requirements are respected.',
  },
  motivation:
    'Intelligent software is becoming infrastructure. I want to be one of the engineers who builds it carefully — systems that are useful, explainable and fast enough that people forget the machinery underneath.',
  strengths: [
    { title: 'Problem decomposition', body: 'Break an ambiguous brief into the smallest set of decisions that actually matter.' },
    { title: 'Continuous learning', body: 'New stack, new paper, new failure mode — the loop never really closes.' },
    { title: 'Engineering mindset', body: 'Prefer explicit contracts, predictable failure and code someone else can inherit.' },
    { title: 'Practical building', body: 'Working software over slideware; prototypes that answer a question.' },
  ],
}

export const principles = [
  {
    index: '01',
    title: 'Clarity before cleverness',
    body: 'A system nobody can debug is not finished. Naming, boundaries and error paths get designed, not discovered.',
  },
  {
    index: '02',
    title: 'Measure, then claim',
    body: 'No performance or accuracy statement without a number behind it. Experiments are documented, including the ones that failed.',
  },
  {
    index: '03',
    title: 'Ground the intelligence',
    body: 'Models get retrieval, validation and fallbacks. Confident output is not the same thing as correct output.',
  },
  {
    index: '04',
    title: 'Ship the smallest honest version',
    body: 'A narrow system that works teaches more than a broad system that almost does.',
  },
]
