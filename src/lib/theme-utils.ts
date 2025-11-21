// src/lib/theme-utils.ts
export const themeClassesMap = {
  dark: {
    bg: 'bg-[#0a0a0a]', // Soft dark base
    bgSecondary: 'bg-[#111]',
    cardBg: 'bg-[#141414] backdrop-blur-sm border border-[#1f1f1f]',
    text: 'text-gray-100',
    textSecondary: 'text-gray-400',
    accent: 'text-[#00f5ff]', // Neon cyan
    border: 'border-[#1f1f1f]',
    gradient: 'from-[#00f5ff] via-[#00ffaa] to-[#0077ff]',
    shadow: 'shadow-lg shadow-cyan-500/20',
    shadowHover: 'shadow-xl shadow-cyan-500/30 hover:shadow-2xl',
  },
}

export type Theme = keyof typeof themeClassesMap

export function getThemeClasses(theme: Theme = 'dark') {
  return themeClassesMap[theme]
}
