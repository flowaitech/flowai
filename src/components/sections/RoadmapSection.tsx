'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'
import { Check, Loader2 } from 'lucide-react'

const RoadmapSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

  const roadmap = [
    {
      quarter: "Q4 2025",
      milestones: [
        { text: "Launch website & AI Terminal (Beta)", completed: true, loading: false },
        { text: "Token launch + liquidity pool deployment", completed: true, loading: false },
        { text: "Target: 1,000 holders / 100K market cap", completed: false, loading: true },
        { text: "Twitter Golden Badge verification at 200K MC", completed: false, loading: false }
      ]
    },
    {
      quarter: "Q1 2026",
      milestones: [
        { text: "Release DeFi dashboard & AI trading sim full version", completed: false, loading: true },
        { text: "Integrate social trading leaderboard", completed: false, loading: false },
        { text: "Launch mobile web app (PWA)", completed: false, loading: false }
      ]
    },
    {
      quarter: "Q2 2026",
      milestones: [
        { text: "$FLOW staking and reward distribution system", completed: false, loading: false },
        { text: "Governance beta and agent marketplace", completed: false, loading: false }
      ]
    },
    {
      quarter: "Q3 2026",
      milestones: [
        { text: "AI multi-agent collaboration layer", completed: false, loading: false },
        { text: "DAO formation & cross-chain token bridge", completed: false, loading: false }
      ]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }))
        })
      },
      { threshold: 0.1 }
    )
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={cn("py-20", themeClasses.bg)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn("text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent", themeClasses.gradient)}>Roadmap</h2>
          <p className={cn("text-lg max-w-2xl mx-auto", themeClasses.textSecondary)}>Our journey to revolutionize AI-powered DeFi</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((item, index) => (
            <Card key={index} className={cn("transition-all duration-300 hover:scale-105 animate-on-scroll border-0", themeClasses.cardBg, themeClasses.shadow)} id={`roadmap-${index}`} style={{ animationDelay: `${index * 100}ms`, opacity: isVisible[`roadmap-${index}`] ? 1 : 0, transform: isVisible[`roadmap-${index}`] ? 'translateY(0)' : 'translateY(30px)' }}>
              <CardHeader>
                <CardTitle className={cn("text-lg", themeClasses.accent)}>{item.quarter}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {item.milestones.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                        {m.completed ? (
                          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", theme === 'light' ? "bg-green-100" : theme === 'dark' ? "bg-green-900" : "bg-green-100")}>
                            <Check className={cn("w-3 h-3", theme === 'light' ? "text-green-600" : theme === 'dark' ? "text-green-400" : "text-green-600")} />
                          </div>
                        ) : m.loading ? <Loader2 className={cn("w-4 h-4 animate-spin", themeClasses.accent)} /> : <div className={cn("w-2 h-2 rounded-full", themeClasses.accent)}></div>}
                      </div>
                      <span className={cn("text-xs flex-1", m.completed ? "line-through opacity-60" : "", themeClasses.textSecondary)}>{m.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

RoadmapSection.displayName = "RoadmapSection"
export default RoadmapSection
