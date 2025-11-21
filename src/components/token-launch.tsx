'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  ExternalLink,
  Activity,
  Zap,
  Target,
  Rocket,
  Star,
  Eye,
  BarChart3
} from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

interface TokenStats {
  price: number
  marketCap: number
  holders: number
  liquidity: number
  volume24h: number
  priceChange24h: number
}

export default function TokenLaunch() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const [stats, setStats] = useState<TokenStats>({
    price: 0.0001,
    marketCap: 95000,
    holders: 847,
    liquidity: 89300,
    volume24h: 12450,
    priceChange24h: 12.5
  })

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // 1️⃣ Simulate real-time token stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.02),
        marketCap: prev.marketCap + (Math.random() - 0.5) * 1000,
        holders: Math.max(0, prev.holders + Math.floor((Math.random() - 0.3) * 2)),
        volume24h: prev.volume24h + Math.random() * 100,
        priceChange24h: prev.priceChange24h + (Math.random() - 0.5) * 0.5
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // 2️⃣ Countdown timer
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setHours(targetDate.getHours() + 24) // countdown 24 jam

    const interval = setInterval(() => {
      const now = Date.now()
      const difference = targetDate.getTime() - now

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0
      })

      if (difference <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 3️⃣ Helpers
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) return `$${(marketCap / 1000000).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  const progressToGoal = (stats.marketCap / 100000) * 100

  // 4️⃣ Render
  return (
    <section id="token-launch" className={cn("py-20", themeClasses.bgSecondary)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className={cn("w-8 h-8", themeClasses.accent)} />
            <h2 className={cn(
              "text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              themeClasses.gradient
            )}>
              Token Launch
            </h2>
          </div>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            themeClasses.textSecondary
          )}>
            Join the $FLOW revolution and be part of the AI-powered DeFi ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Token Card */}
          <Card className={cn("lg:col-span-2 border-0", themeClasses.cardBg, themeClasses.shadow)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={cn(themeClasses.text)}>$FLOW Token</CardTitle>
                    <p className="text-sm opacity-60">Flow AI Utility Token</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Price Display */}
              <div className="text-center py-6">
                <div className="text-4xl font-bold mb-2">{formatPrice(stats.price)}</div>
                <div className={cn(
                  "flex items-center justify-center gap-2",
                  stats.priceChange24h >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {stats.priceChange24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                  <span>{Math.abs(stats.priceChange24h).toFixed(2)}%</span>
                  <span className="text-sm opacity-60">24h</span>
                </div>
              </div>

              {/* Progress to Goal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to $100K Market Cap</span>
                  <span>{progressToGoal.toFixed(1)}%</span>
                </div>
                <Progress value={progressToGoal} className="h-3" />
                <div className="flex items-center justify-between text-xs opacity-60">
                  <span>{formatMarketCap(stats.marketCap)}</span>
                  <span>$100K</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Users className="w-5 h-5 mx-auto mb-1 opacity-60" />
                  <div className="font-semibold">{stats.holders}</div>
                  <div className="text-xs opacity-60">Holders</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <DollarSign className="w-5 h-5 mx-auto mb-1 opacity-60" />
                  <div className="font-semibold">{formatMarketCap(stats.liquidity)}</div>
                  <div className="text-xs opacity-60">Liquidity</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <BarChart3 className="w-5 h-5 mx-auto mb-1 opacity-60" />
                  <div className="font-semibold">{formatMarketCap(stats.volume24h)}</div>
                  <div className="text-xs opacity-60">24h Volume</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Target className="w-5 h-5 mx-auto mb-1 opacity-60" />
                  <div className="font-semibold">1B</div>
                  <div className="text-xs opacity-60">Supply</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className={cn(
                    "flex-1 font-semibold transition-all duration-300 hover:scale-105",
                    theme === 'light' ? "bg-blue-600 hover:bg-blue-700 text-white" :
                    theme === 'dark' ? "bg-green-600 hover:bg-green-700 text-white" :
                    "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  )}
                  asChild
                >
                  <a href="https://pump.fun" target="_blank" rel="noopener noreferrer">
                    <Zap className="w-4 h-4 mr-2" />
                    Buy on Pump.fun
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 font-semibold hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    View Chart
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Side Cards */}
          <div className="space-y-6">
            {/* Launch Countdown */}
            <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-lg flex items-center gap-2", themeClasses.accent)}>
                  <Clock className="w-5 h-5" />
                  Launch Phase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Star className="w-3 h-3 mr-1" />
                    Early Stage
                  </Badge>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="text-lg font-bold">{timeLeft.hours}</div>
                      <div className="text-xs opacity-60">Hours</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="text-lg font-bold">{timeLeft.minutes}</div>
                      <div className="text-xs opacity-60">Minutes</div>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="text-lg font-bold">{timeLeft.seconds}</div>
                      <div className="text-xs opacity-60">Seconds</div>
                    </div>
                  </div>
                  <p className="text-xs opacity-60">Next milestone in</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-lg flex items-center gap-2", themeClasses.accent)}>
                  <Activity className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-60">Market Cap Rank</span>
                  <span className="font-semibold">#1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-60">24h Trades</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-60">Avg. Trade Size</span>
                  <span className="font-semibold">$36.4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-60">Liquidity/TVL</span>
                  <span className="font-semibold">94%</span>
                </div>
              </CardContent>
            </Card>

            {/* Contract Info */}
            <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-lg flex items-center gap-2", themeClasses.accent)}>
                  <Target className="w-5 h-5" />
                  Contract
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs font-mono break-all">
                    0x742d35Cc6634C0532925a3b8D4C9db96C4b4Db45
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Etherscan
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
