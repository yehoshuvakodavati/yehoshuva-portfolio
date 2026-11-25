/** Minimal theme store shared by the 3D scene and the UI toggle. */

const listeners = new Set()
let current = 'dark'
let initialised = false

function readDom() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function getTheme() {
  if (!initialised && typeof document !== 'undefined') {
    current = readDom()
    initialised = true
  }
  return current
}

export function setTheme(next) {
  current = next === 'light' ? 'light' : 'dark'
  initialised = true
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.classList.toggle('light', current === 'light')
    root.classList.toggle('dark', current === 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', current === 'light' ? '#f4f6fc' : '#04060f')
    try {
      localStorage.setItem('ky-theme', current)
    } catch {
      /* storage can be unavailable in private mode */
    }
  }
  listeners.forEach((listener) => listener())
}

export function subscribeTheme(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
