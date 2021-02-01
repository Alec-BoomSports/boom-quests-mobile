import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useToggleTheme () {
  const { toggleTheme } = useContext(ThemeContext)
  return toggleTheme
}
