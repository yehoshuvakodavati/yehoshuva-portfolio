import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-glass text-mute transition-colors duration-300 hover:border-lineStrong hover:text-ink ${className}`}
    >
      <Sun
        size={15}
        strokeWidth={1.7}
        className={`absolute transition-all duration-500 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
      />
      <Moon
        size={15}
        strokeWidth={1.7}
        className={`absolute transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
      />
    </button>
  )
}
