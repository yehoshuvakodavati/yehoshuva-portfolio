/**
 * Engineering experience.
 * Dates, responsibilities and outcomes that are not yet confirmed are marked
 * as placeholders rather than invented. Replace the strings as details are verified.
 */

export const experience = [
  {
    id: 'superorg',
    organization: 'SuperOrg LLP',
    role: 'Software Engineering Intern',
    type: 'Internship',
    location: 'India',
    period: 'Add dates',
    datesVerified: false,
    summary:
      'Worked inside a professional engineering team on a full-stack hospital management system, contributing to feature implementation across the application.',
    responsibilities: [
      'Contributed to full-stack hospital management features within the team codebase',
      'Implemented and integrated application modules against existing data models',
      'Worked through code review and team development workflow',
    ],
    technologies: ['Full-stack development', 'Relational database'],
    achievements: [],
    note: 'Add verified dates, exact modules and measurable outcomes in src/data/experience.js.',
  },
  {
    id: 'emertxe',
    organization: 'Emertxe Information Technologies',
    role: 'IoT Intern',
    type: 'Internship',
    location: 'India',
    period: 'Add dates',
    datesVerified: false,
    summary:
      'IoT internship focused on embedded telemetry: ESP32 prototyping, MQTT messaging and dashboard visualisation for connected devices.',
    responsibilities: [
      'Prototyped embedded circuits and firmware behaviour in Wokwi',
      'Published device telemetry over MQTT',
      'Built monitoring views for live device state',
    ],
    technologies: ['ESP32', 'MQTT', 'Wokwi', 'ThingsBoard'],
    achievements: [],
    note: 'Add verified internship dates and project scope in src/data/experience.js.',
  },
  {
    id: 'ibm',
    organization: 'IBM',
    role: 'Internship',
    type: 'Placeholder',
    location: 'India',
    period: 'march 2025 - may 2025',
    datesVerified: true,
    summary: 'AI/ML internship at IBM, working on applied machine learning and backend engineering.',
    responsibilities: ['learning and contributing to applied ML and backend engineering projects','machine learning model development and deployment','learning about supervised and unsupervised learning techniques'],
    technologies: ['machine learning', 'backend engineering', 'Python'],
    achievements: ['cirtificate of completion', 'project contributions'],
    note: 'Duplicate one of the entries above to add a new role.',
  },
]

export const experienceNote =
  'Only verified roles are listed. Anything pending confirmation appears as an explicit placeholder.'
