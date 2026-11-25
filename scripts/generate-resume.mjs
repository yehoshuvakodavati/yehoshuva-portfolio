/**
 * Generates the downloadable résumé PDF from the portfolio data files.
 * Run: npm run resume:build
 * Output: public/assets/resume/Kodavati-Yehoshuva-Resume.pdf
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import { profile, socials } from '../src/data/profile.js'
import { about } from '../src/data/about.js'
import { skillGroups } from '../src/data/skills.js'
import { projects } from '../src/data/projects.js'
import { experience } from '../src/data/experience.js'
import { certifications } from '../src/data/certifications.js'
import { education } from '../src/data/journey.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.resolve(__dirname, '../public/assets/resume')
const outputFile = path.join(outputDir, 'Kodavati-Yehoshuva-Resume.pdf')

fs.mkdirSync(outputDir, { recursive: true })

const INK = '#0d1526'
const MUTED = '#46536e'
const ACCENT = '#2f5fe0'
const LINE = '#d9e0ef'

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 42, bottom: 40, left: 46, right: 46 },
  info: {
    Title: `${profile.name} — Résumé`,
    Author: profile.name,
    Subject: 'Software Engineer · AI/ML Engineer · Backend Developer',
    Keywords: 'Software Engineer, AI, Machine Learning, Backend, Spring Boot, React',
  },
})

doc.pipe(fs.createWriteStream(outputFile))

const left = doc.page.margins.left
const contentWidth = doc.page.width - left - doc.page.margins.right
const bottomLimit = doc.page.height - doc.page.margins.bottom

function ensure(space) {
  if (doc.y + space > bottomLimit) doc.addPage()
}

function section(title) {
  ensure(42)
  doc.moveDown(0.85)
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(7.6).text(title.toUpperCase(), left, doc.y, {
    characterSpacing: 1.5,
  })
  doc.moveDown(0.25)
  const y = doc.y
  doc.strokeColor(LINE).lineWidth(0.6).moveTo(left, y).lineTo(left + contentWidth, y).stroke()
  doc.moveDown(0.45)
}

function row(title, meta, detail, bullets = [], tech = '') {
  ensure(50)
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(9.2)
  const titleWidth = contentWidth - 118
  doc.text(title, left, doc.y, { width: titleWidth, continued: false })
  if (meta) {
    doc.fillColor(MUTED).font('Helvetica').fontSize(7.8).text(meta, left + titleWidth + 6, doc.y - 10.5, {
      width: 112,
      align: 'right',
    })
  }
  if (detail) {
    doc.fillColor(MUTED).font('Helvetica').fontSize(8.2).text(detail, left, doc.y + 1, { width: contentWidth, lineGap: 1 })
  }
  bullets.forEach((bullet) => {
    ensure(14)
    doc.fillColor(MUTED).font('Helvetica').fontSize(7.9).text(`•   ${bullet}`, left + 6, doc.y + 2, {
      width: contentWidth - 6,
      lineGap: 1.6,
    })
  })
  if (tech) {
    doc.fillColor(ACCENT).font('Helvetica').fontSize(7).text(tech, left, doc.y + 3, { width: contentWidth, characterSpacing: 0.3 })
  }
  doc.moveDown(0.55)
}

/* ---------------------------------- header --------------------------------- */
doc.fillColor(INK).font('Helvetica-Bold').fontSize(23).text(profile.name.toUpperCase(), left, doc.y, {
  characterSpacing: 0.4,
})
doc.moveDown(0.18)
doc.fillColor(ACCENT).font('Helvetica').fontSize(9).text('SOFTWARE ENGINEER  ·  AI / ML ENGINEER  ·  BACKEND DEVELOPER', {
  characterSpacing: 0.9,
})
doc.moveDown(0.32)
doc
  .fillColor(MUTED)
  .font('Helvetica')
  .fontSize(8)
  .text(
    `${profile.email}  ·  ${profile.location}  ·  github.com/yehoshuvakodavati  ·  linkedin.com/in/kodavati-yehoshuva-9613073b6`,
    { width: contentWidth, lineGap: 1 },
  )

/* ---------------------------------- summary -------------------------------- */
section('Profile')
doc.fillColor(MUTED).font('Helvetica').fontSize(8.4).text(about.intro, left, doc.y, { width: contentWidth, lineGap: 2 })

/* --------------------------------- education ------------------------------- */
section('Education')
education.forEach((item) => {
  row(
    item.qualification,
    item.period,
    `${item.institution} · ${item.detail}`,
    item.highlights ?? [],
  )
})

/* ----------------------------------- skills -------------------------------- */
section('Technical Skills')
skillGroups.forEach((group) => {
  ensure(20)
  doc
    .fillColor(INK)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(`${group.label}: `, left, doc.y, { continued: true })
    .fillColor(MUTED)
    .font('Helvetica')
    .text(group.skills.map((skill) => skill.name).join(', '), { width: contentWidth, lineGap: 1.6 })
})

/* --------------------------------- experience ------------------------------ */
section('Experience')
experience
  .filter((role) => role.type !== 'Placeholder')
  .forEach((role) => {
    row(role.organization, role.period === 'Add dates' ? '' : role.period, role.role, role.responsibilities, role.technologies.join(' · '))
  })

/* ---------------------------------- projects ------------------------------- */
section('Selected Projects')
projects.forEach((project) => {
  row(
    project.title,
    project.status,
    project.description.length > 200 ? `${project.description.slice(0, 197)}…` : project.description,
    [],
    project.stack.join(' · '),
  )
})

/* ------------------------------- certifications ---------------------------- */
const verified = certifications.filter((cert) => cert.verified)
if (verified.length) {
  section('Certifications')
  verified.forEach((cert) => {
    row(cert.title, cert.score ?? '', `${cert.issuer}${cert.date !== 'Add issue date' ? ` · ${cert.date}` : ''}`)
  })
}

/* ----------------------------------- footer -------------------------------- */
ensure(30)
doc.moveDown(0.8)
doc.strokeColor(LINE).lineWidth(0.6).moveTo(left, doc.y).lineTo(left + contentWidth, doc.y).stroke()
doc.moveDown(0.5)
doc
  .fillColor(MUTED)
  .font('Helvetica')
  .fontSize(7)
  .text(
    `${profile.name} · ${profile.email} · ${socials.find((s) => s.id === 'github')?.url ?? ''} · Portfolio: yehoshuvaportfolio.netlify.app`,
    { width: contentWidth, align: 'center' },
  )

doc.end()

console.log(`Résumé written to ${path.relative(process.cwd(), outputFile)}`)
