import React, { createContext, useContext, useState, useEffect } from 'react'

/**
 * Theme Context
 * Provides theme state and toggle functionality throughout the app
 */
const ThemeContext = createContext()

/**
 * ThemeProvider Component
 * 
 * Manages application theme (light/dark mode) and persists preference.
 * 
 * Features:
 * - Persists theme preference in localStorage
 * - Applies dark-mode class to document root
 * - Provides toggle function to child components
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  /**
   * Load saved theme preference on mount
   */
  useEffect(() => {
    try {
      // Check if user has a preference in localStorage
      const savedTheme = localStorage.getItem('theme')
      
      if (savedTheme === 'dark') {
        setDarkMode(true)
        document.documentElement.classList.add('dark-mode')
      } else if (savedTheme === 'light') {
        setDarkMode(false)
        document.documentElement.classList.remove('dark-mode')
      } else {
        // Check system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          setDarkMode(true)
          document.documentElement.classList.add('dark-mode')
          localStorage.setItem('theme', 'dark')
        }
      }
    } catch (error) {
      console.error('Error loading theme preference:', error)
      // Default to light mode on error
      setDarkMode(false)
    }
  }, [])

  // ============================================================================
  // THEME TOGGLE
  // ============================================================================

  /**
   * Toggle between light and dark mode
   * Updates state, DOM, and localStorage
   */
  const toggleTheme = () => {
    try {
      setDarkMode(prevDarkMode => {
        const newDarkMode = !prevDarkMode
        
        // Update DOM
        if (newDarkMode) {
          document.documentElement.classList.add('dark-mode')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark-mode')
          localStorage.setItem('theme', 'light')
        }
        
        return newDarkMode
      })
    } catch (error) {
      console.error('Error toggling theme:', error)
      alert('Failed to toggle theme. Please try again.')
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme Hook
 * 
 * Custom hook to access theme context.
 * Must be used within a ThemeProvider.
 * 
 * @returns {Object} { darkMode: boolean, toggleTheme: function }
 * @throws {Error} If used outside ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}
