'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, ExternalLink, Rocket, Target, DollarSign } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function TokenCountdown() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [copied, setCopied] = useState(false)
  const contractAddress = 'Bc99ss8kpWe4yckpRiftuN29QQKf8X9vsR4N2KBnpump'

  // Countdown
  useEffect(() => {
    let target: Date
    const saved = localStorage.getItem('tokenLaunch')
    if (saved) {
      target = new Date(saved)
    } else {
      target = new Date(Date.now() + ((2 * 24 + 17) * 60 * 60 * 1000))
      localStorage.setItem('tokenLaunch', target.toISOString())
    }

    const updateTimeLeft = () => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimeLeft()
    const timer = setInterval(updateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyContractAddress = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="token-countdown" className={cn("py-20", themeClasses.bgSecondary)}>
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 mb-4">
            <Rocket className={cn("w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10", themeClasses.accent)} />
            <h2 className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent", themeClasses.gradient)}>
              Token Is Live
            </h2>
            <Badge className="hidden sm:flex bg-yellow-500 text-white border-none ml-2 animate-pulse">LIVE</Badge>
          </div>

          <p className={cn("text-lg max-w-2xl mx-auto", themeClasses.textSecondary)}>
            Be ready for the $FLOW token launch. Get your wallets prepared!
          </p>
        </div>

        {/* CENTERED CARD FIX */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto justify-center items-center">

          <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
            <CardHeader>
              <CardTitle className={cn("text-center", themeClasses.accent)}>
                <div className="flex items-center justify-center gap-2">
                  <Target className="w-5 h-5" />
                  Contract & Actions
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* CONTRACT */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Contract Address</label>

                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex-1 p-3 rounded-lg text-xs font-mono break-all",
                    theme === 'light' ? "bg-gray-100" :
                    theme === 'dark' ? "bg-gray-800" :
                    "bg-gray-100"
                  )}>
                    {contractAddress}
                  </div>

                  <Button size="sm" onClick={copyContractAddress} className="px-3">
                    {copied
                      ? <Check className="w-4 h-4 text-green-500" />
                      : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                {copied && <p className="text-xs text-green-600">Contract address copied!</p>}
              </div>

              {/* BUTTONS */}
              <div className="space-y-3">
                <Button
                  className={cn(
                    "w-full font-semibold transition-all duration-300 hover:scale-105",
                    theme === 'light'
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : theme === 'dark'
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  )}
                  asChild
                >
                  <a href="https://pump.fun/coin/Bc99ss8kpWe4yckpRiftuN29QQKf8X9vsR4N2KBnpump" target="_blank" rel="noopener noreferrer">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Buy on Pump.fun
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-semibold hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <a href="https://solscan.io/token/Bc99ss8kpWe4yckpRiftuN29QQKf8X9vsR4N2KBnpump" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on SOLSCAN
                  </a>
                </Button>
              </div>

              {/* INFO */}
              <div className={cn(
                "p-4 rounded-lg text-center text-sm",
                theme === 'light'
                  ? "bg-blue-50"
                  : theme === 'dark'
                  ? "bg-blue-900/20"
                  : "bg-purple-50"
              )}>
                <div className="font-semibold mb-1">🚀 Get Ready!</div>
                <div className="text-xs opacity-60">
                  Prepare your wallet for the launch. Join our community for updates.
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}
