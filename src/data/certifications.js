/**
 * Certifications & badges.
 * IMPORTANT: only verified items are marked `verified: true`.
 * Unverified items stay visibly pending — no invented credential IDs or links.
 */

export const certifications = [
  {
    id: 'emertxe-edgeai',
    title: 'EdgeAI Quiz Badge',
    issuer: 'Emertxe Information Technologies',
    date: 'Add issue date',
    dateVerified: false,
    credentialId: null,
    score: '10 / 10',
    verified: true,
    verificationUrl: null,
    image: null,
    summary: 'Scored a perfect 10/10 on the EdgeAI assessment quiz.',
    note: 'Add the credential link and issue date to make this fully verifiable.',
    accent: '#22d3ee',
  },
  {
    id: 'ibm-internship',
    title: 'Internship Completion Certificate',
    issuer: 'IBM',
    date: 'Verification pending',
    dateVerified: false,
    credentialId: null,
    score: null,
    verified: false,
    verificationUrl: null,
    image: null,
    summary: 'Internship completion certificate — details are being verified before publication.',
    note: 'Upload the certificate and confirm the programme name before marking verified.',
    accent: '#4f7cff',
  },
]

export const certificationNote =
  'Nothing in this gallery is fabricated. Items marked “Pending verification” are placeholders until the credential image and verification link are supplied.'
