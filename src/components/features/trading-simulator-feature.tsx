'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Play, TrendingUp, TrendingDown, BarChart3, DollarSign, Target, Zap, Award, AlertCircle } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function TradingSimulatorFeature() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentSimulation, setCurrentSimulation] = useState<any>(null)
  const [simulationHistory, setSimulationHistory] = useState([
    { pair: 'ETH/USDT', profit: '+2.4%', status: 'win', entry: '$3,456.78', exit: '$3,540.45', time: '2m 34s' },
    { pair: 'BTC/USDT', profit: '-1.2%', status: 'loss', entry: '$67,890.12', exit: '$67,076.78', time: '1m 12s' },
    { pair: 'FLOW/USDT', profit: '+5.8%', status: 'win', entry: '$0.000134', exit: '$0.000142', time: '3m 45s' },
    { pair: 'SOL/USDT', profit: '+3.2%', status: 'win', entry: '$156.78', exit: '$161.79', time: '4m 23s' },
    { pair: 'MATIC/USDT', profit: '-0.8%', status: 'loss', entry: '$0.89', exit: '$0.88', time: '1m 56s' }
  ])
  const [stats, setStats] = useState({
    totalTrades: 156,
    winRate: 68.4,
    totalProfit: '+12.4%',
    avgProfit: '+2.1%'
  })

  const tradingPairs = [
    { symbol: 'FLOW/USDT', price: '$0.000142', change: '+12.5%', volume: '$2.3M' },
    { symbol: 'ETH/USDT', price: '$3,456.78', change: '+2.3%', volume: '$1.2B' },
    { symbol: 'BTC/USDT', price: '$67,890.12', change: '+1.8%', volume: '$2.8B' },
    { symbol: 'SOL/USDT', price: '$156.78', change: '+5.6%', volume: '$456M' },
    { symbol: 'MATIC/USDT', price: '$0.89', change: '-2.1%', volume: '$234M' },
    { symbol: 'AVAX/USDT', price: '$45.67', change: '+3.4%', volume: '$123M' }
  ]

  const strategies = [
    { name: 'Scalping', risk: 'Low', reward: '1-3%', time: '1-5 min', success: '72%' },
    { name: 'Day Trading', risk: 'Medium', reward: '3-8%', time: '5-30 min', success: '68%' },
    { name: 'Swing Trading', risk: 'High', reward: '8-15%', time: '30-120 min', success: '64%' },
    { name: 'AI Predictive', risk: 'Medium', reward: '5-12%', time: '2-10 min', success: '78%' }
  ]

  const runSimulation = (pair: string, strategy: string) => {
    setIsSimulating(true)
    setCurrentSimulation({ pair, strategy, progress: 0 })

    const interval = setInterval(() => {
      setCurrentSimulation(prev => {
        if (prev && prev.progress >= 100) {
          clearInterval(interval)
          const profit = (Math.random() * 10 - 2).toFixed(1)
          const status = parseFloat(profit) > 0 ? 'win' : 'loss'
          const newTrade = {
            pair,
            profit: `${profit > 0 ? '+' : ''}${profit}%`,
            status,
            entry: tradingPairs.find(p => p.symbol === pair)?.price || '$0.00',
            exit: `$${(Math.random() * 1000).toFixed(2)}`,
            time: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`
          }
          
          setSimulationHistory(prev => [newTrade, ...prev.slice(0, 4)])
          setStats(prev => ({
            totalTrades: prev.totalTrades + 1,
            winRate: status === 'win' ? Math.min(100, prev.winRate + 0.5) : Math.max(0, prev.winRate - 0.3),
            totalProfit: status === 'win' ? `${(parseFloat(prev.totalProfit) + parseFloat(profit)).toFixed(1)}%` : prev.totalProfit,
            avgProfit: `${(parseFloat(prev.avgProfit) + parseFloat(profit) * 0.1).toFixed(1)}%`
          }))
          
          setIsSimulating(false)
          return null
        }
        return { ...prev, progress: prev.progress + 10 }
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      {/* Feature Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold", themeClasses.accent)}>AI Trading Simulator</h3>
            <p className={cn("text-sm opacity-60", themeClasses.textSecondary)}>
              Risk-free simulation using live market data
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-green-600 text-green-600" : theme === 'dark' ? "border-blue-600 text-blue-600" : "border-purple-600 text-purple-600")}>
            94% Accuracy
          </Badge>
          <Badge className={cn("text-xs", theme === 'light' ? "bg-green-600 text-white" : theme === 'dark' ? "bg-blue-600 text-white" : "bg-purple-600 text-white")}>
            BETA
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.totalTrades}</div>
            <div className={cn("text-xs", themeClasses.textSecondary)}>Total Trades</div>
          </CardContent>
        </Card>
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.winRate}%</div>
            <div className={cn("text-xs", themeClasses.textSecondary)}>Win Rate</div>
          </CardContent>
        </Card>
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.totalProfit}</div>
            <div className={cn("text-xs", themeClasses.textSecondary)}>Total Profit</div>
          </CardContent>
        </Card>
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{stats.avgProfit}</div>
            <div className={cn("text-xs", themeClasses.textSecondary)}>Avg Profit</div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Interface */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Simulation Interface</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Trading Pairs */}
          <div>
            <h4 className={cn("text-sm font-semibold mb-3", themeClasses.text)}>Available Pairs</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tradingPairs.map((pair, index) => (
                <div key={index} className={cn(
                  "p-3 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer",
                  theme === 'light' ? "bg-blue-50 border-blue-200 hover:bg-blue-100" :
                  theme === 'dark' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" :
                  "bg-purple-50 border-purple-200 hover:bg-purple-100"
                )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">{pair.symbol}</div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>{pair.price}</div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-xs font-semibold",
                        pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      )}>
                        {pair.change}
                      </div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>{pair.volume}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategies */}
          <div>
            <h4 className={cn("text-sm font-semibold mb-3", themeClasses.text)}>Trading Strategies</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {strategies.map((strategy, index) => (
                <div key={index} className={cn(
                  "p-3 rounded-lg border transition-all duration-200 hover:scale-105",
                  theme === 'light' ? "bg-green-50 border-green-200 hover:bg-green-100" :
                  theme === 'dark' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" :
                  "bg-green-50 border-green-200 hover:bg-green-100"
                )}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm">{strategy.name}</div>
                    <Badge variant="outline" className={cn("text-xs", strategy.success === '78%' ? "border-green-500 text-green-500" : "border-blue-500 text-blue-500")}>
                      {strategy.success} Success
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className={cn("font-medium", themeClasses.textSecondary)}>Risk</div>
                      <div className={cn(
                        "font-semibold",
                        strategy.risk === 'Low' ? 'text-green-500' :
                        strategy.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                      )}>{strategy.risk}</div>
                    </div>
                    <div>
                      <div className={cn("font-medium", themeClasses.textSecondary)}>Reward</div>
                      <div className="font-semibold text-blue-500">{strategy.reward}</div>
                    </div>
                    <div>
                      <div className={cn("font-medium", themeClasses.textSecondary)}>Time</div>
                      <div className="font-semibold text-purple-500">{strategy.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => runSimulation('FLOW/USDT', 'AI Predictive')}
              disabled={isSimulating}
              className={cn(
                "flex items-center gap-2",
                theme === 'light' ? "bg-green-600 hover:bg-green-700" :
                theme === 'dark' ? "bg-blue-600 hover:bg-blue-700" :
                "bg-purple-600 hover:bg-purple-700"
              )}
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Quick Simulation
                </>
              )}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Advanced Mode
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Custom Strategy
            </Button>
          </div>

          {/* Progress Bar */}
          {currentSimulation && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className={cn("font-medium", themeClasses.text)}>
                  Simulating {currentSimulation.pair} with {currentSimulation.strategy}
                </span>
                <span className={cn("font-medium", themeClasses.accent)}>
                  {currentSimulation.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    theme === 'light' ? "bg-green-500" :
                    theme === 'dark' ? "bg-blue-500" :
                    "bg-purple-500"
                  )}
                  style={{ width: `${currentSimulation.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Recent Simulations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {simulationHistory.map((trade, index) => (
              <div key={index} className={cn(
                "p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      trade.status === 'win' ? 'bg-green-100' : 'bg-red-100'
                    )}>
                      {trade.status === 'win' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{trade.pair}</div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>
                        {trade.entry} → {trade.exit} • {trade.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "font-bold text-sm",
                      trade.status === 'win' ? 'text-green-500' : 'text-red-500'
                    )}>
                      {trade.profit}
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      trade.status === 'win' ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                    )}>
                      {trade.status === 'win' ? 'WIN' : 'LOSS'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Risk-Free</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Practice trading without risking real capital
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Real-Time Data</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Live market data feeds for accurate simulations
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>AI Powered</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Advanced algorithms for optimal trading strategies
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}