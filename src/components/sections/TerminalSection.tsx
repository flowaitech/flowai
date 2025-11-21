'use client'

import React, { forwardRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'
import AITerminal from '@/components/ai-terminal'

const TerminalSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)

  return (
    <section ref={ref} className={cn("py-20", themeClasses.bg)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={cn("text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent", themeClasses.gradient)}>AI Terminal</h2>
          <p className={cn("text-lg max-w-2xl mx-auto", themeClasses.textSecondary)}>Experience AI-powered DeFi terminal</p>
        </div>
        <AITerminal />
      </div>
    </section>
  )
})

TerminalSection.displayName = "TerminalSection"
export default TerminalSection
