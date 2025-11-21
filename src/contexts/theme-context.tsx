'use client'

import React, { createContext, useContext } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext({
  theme: 'dark' as Theme,
  getThemeClasses: (theme: Theme = 'dark') => ({
    bg: 'bg-[#0b0b0f] text-gray-100',
    cardBg: 'bg-[#121218]',
    border: 'border border-gray-800',
    shadow: 'shadow-[0_0_25px_rgba(120,0,255,0.15)]',
    gradient: 'from-purple-500 to-blue-500',
    accent: 'text-purple-400',
    textSecondary: 'text-gray-400',
  }),
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{
      theme: 'dark',
      getThemeClasses: (theme: Theme = 'dark') => ({
        bg: 'bg-[#0b0b0f] text-gray-100',
        cardBg: 'bg-[#121218]',
        border: 'border border-gray-800',
        shadow: 'shadow-[0_0_25px_rgba(120,0,255,0.15)]',
        gradient: 'from-purple-500 to-blue-500',
        accent: 'text-purple-400',
        textSecondary: 'text-gray-400',
      }),
    }}>
      <div className="dark bg-[#0b0b0f] text-gray-100 min-h-screen">{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

// Ekspor global untuk kompatibilitas import langsung
export function getThemeClasses(theme: Theme = 'dark') {
  return {
    bg: 'bg-[#0b0b0f] text-gray-100',
    cardBg: 'bg-[#121218]',
    border: 'border border-gray-800',
    shadow: 'shadow-[0_0_25px_rgba(120,0,255,0.15)]',
    gradient: 'from-purple-500 to-blue-500',
    accent: 'text-purple-400',
    textSecondary: 'text-gray-400',
  }
}
