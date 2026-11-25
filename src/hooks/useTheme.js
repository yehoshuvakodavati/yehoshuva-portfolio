import { useCallback, useSyncExternalStore } from 'react'
import { getTheme, setTheme, subscribeTheme } from '../lib/theme'

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark')

  const toggle = useCallback(() => {
    setTheme(getTheme() === 'light' ? 'dark' : 'light')
  }, [])

  return { theme, toggle, setTheme }
}
