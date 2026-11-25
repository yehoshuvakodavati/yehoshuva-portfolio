import { motion, useReducedMotion } from 'framer-motion'

/** Consistent, restrained scroll reveal used across every section. */
export default function Reveal({ children, delay = 0, y = 26, className = '', as = 'div', once = true }) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
