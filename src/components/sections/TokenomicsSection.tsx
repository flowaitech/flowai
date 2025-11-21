'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/theme-context'

const TokenomicsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const tokenomics = [
    { name: "Liquidity Pool", percentage: 94, description: "Locked for on-chain liquidity & stability", color: "bg-blue-600" },
    { name: "CEX Listing", percentage: 3, description: "Reserved for exchange listings & fees", color: "bg-purple-600" },
    { name: "Marketing", percentage: 2, description: "Community growth & partnerships", color: "bg-green-600" },
    { name: "Airdrop", percentage: 1, description: "Reward early adopters & testnet participants", color: "bg-orange-600" }
  ]

  const [animatedPercentages, setAnimatedPercentages] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    tokenomics.forEach((item, index) => {
      setTimeout(() => setAnimatedPercentages(prev => ({ ...prev, [item.name]: item.percentage })), index * 200)
    })
  }, [])

  return (
    <section ref={ref} className={cn("py-20", themeClasses.bgSecondary)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn("text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent", themeClasses.gradient)}>Tokenomics</h2>
          <p className={cn("text-lg max-w-2xl mx-auto", themeClasses.textSecondary)}>Total Supply: 1,000,000,000 $FLOW</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenomics.map((item, index) => (
            <Card key={index} className={cn("transition-all duration-300 hover:scale-105 border-0", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={cn("text-base", themeClasses.accent)}>{item.name}</CardTitle>
                  <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-blue-600 text-blue-600" : theme === 'dark' ? "border-green-600 text-green-600" : "border-purple-600 text-purple-600")}>{item.percentage}%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className={cn("text-xs mb-3", themeClasses.textSecondary)}>{item.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-1000 flex items-center justify-center", item.color)} style={{ width: `${animatedPercentages[item.name] || 0}%` }}>
                    {(animatedPercentages[item.name] || 0) > 10 && <span className="text-xs font-semibold text-white">{animatedPercentages[item.name]}%</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

TokenomicsSection.displayName = "TokenomicsSection"
export default TokenomicsSection
