/**
 * Single source of truth for identity, links and site metadata.
 * Update this file to change the whole portfolio — no UI edits required.
 */

export const profile = {
  name: 'Kodavati Yehoshuva',
  firstName: 'Kodavati',
  lastName: 'Yehoshuva',
  initials: 'KY',
  monogram: 'KY',
  roles: ['Software Engineer', 'AI / ML Engineer', 'Backend Developer'],
  rotatingRoles: [
    'Software Engineer',
    'AI / ML Engineer',
    'Backend Developer',
    'Technology Entrepreneur',
  ],
  eyebrow: 'Personal technology headquarters',
  headline: 'Engineering the next generation of intelligence.',
  heroSupport:
    'I build intelligent systems, scalable software and technology experiences that turn ambitious ideas into reality.',
  availability: 'Open to software engineering, backend & AI/ML opportunities',
  location: 'Visakhapatnam, India',
  timezone: 'IST · UTC+5:30',
  email: 'yehoshuvakodavati@gmail.com',
  phone: null,
  resumeUrl: '/assets/resume/Kodavati-Yehoshuva-Resume.pdf',
  /**
   * Drop your professional portrait at public/assets/portrait.jpg, then set
   * this to '/assets/portrait.jpg'. Until then the monogram placeholder is used
   * (no stock photo is ever substituted for you).
   */
  portrait: '/assets/portrait.jpg',
  portraitAlt: 'Portrait of Kodavati Yehoshuva',
  education: {
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'Anil Neerukonda Institute of Technology and Sciences (ANITS)',
    location: 'Visakhapatnam, Andhra Pradesh',
    year: '3rd year',
    graduation: '2028',
    cgpa: '8.0',
    diploma: 'Diploma in Computer Engineering — 88%',
  },
  careerDirection: [
    'AI Engineering',
    'Machine Learning',
    'Backend Engineering',
    'Full-stack Development',
    'Software Engineering',
  ],
  ambition:
    'Build intelligent products, solve real-world problems, work with leading product companies and grow into technology ventures of my own.',
  thesis: 'The future is built by those who create it.',
}

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@yehoshuvakodavati',
    url: 'https://github.com/yehoshuvakodavati',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Kodavati Yehoshuva',
    url: 'https://www.linkedin.com/in/kodavati-yehoshuva-9613073b6/',
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    handle: '@yehoshuva_63',
    url: 'https://leetcode.com/u/yehoshuva_63/',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'yehoshuvakodavati@gmail.com',
    url: 'mailto:yehoshuvakodavati@gmail.com',
  },
]

export const navigation = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'universe', label: 'Universe', index: '02' },
  { id: 'work', label: 'Work', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'certifications', label: 'Credentials', index: '05' },
  { id: 'journey', label: 'Journey', index: '06' },
  { id: 'resume', label: 'Résumé', index: '07' },
  { id: 'services', label: 'Services', index: '08' },
  { id: 'contact', label: 'Contact', index: '09' },
]

export const siteMeta = {
  url: 'https://yehoshuvaportfolio.netlify.app',
  title: 'Kodavati Yehoshuva — Software Engineer, AI/ML & Backend Developer',
  description:
    'Portfolio of Kodavati Yehoshuva, a software engineer and AI/ML developer building intelligent systems, scalable backends and production-grade web applications.',
  keywords: [
    'Kodavati Yehoshuva',
    'software engineer portfolio',
    'AI ML engineer',
    'backend developer',
    'Spring Boot developer',
    'React developer',
    'Visakhapatnam developer',
  ],
}
