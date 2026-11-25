import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'

const SESSION_KEY = 'ky-booted'

/** A single, short cinematic handshake on first visit. Never blocks a repeat visit. */
export default function BootScreen() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return !sessionStorage.getItem(SESSION_KEY)
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!visible) return
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    const timer = setTimeout(() => setVisible(false), reduced ? 350 : 1650)
    return () => clearTimeout(timer)
  }, [visible, reduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[160] flex flex-col items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 grid-plane opacity-40" />
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-lineStrong bg-glass"
            >
              <span className="font-display text-xl tracking-tight text-gradient">{profile.monogram}</span>
              <span className="absolute inset-0 rounded-2xl border border-cyan/20" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8 font-mono text-[9px] uppercase tracking-[0.42em] text-faint"
            >
              Initialising technology headquarters
            </motion.p>

            <div className="mt-5 h-px w-52 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-cyan to-violet"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: reduced ? 0.2 : 1.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <p className="absolute bottom-8 font-mono text-[8px] uppercase tracking-[0.3em] text-faint/70">
            KODAVATI YEHOSHUVA · VISAKHAPATNAM · IN
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
