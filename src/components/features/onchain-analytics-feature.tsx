'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Database, TrendingUp, TrendingDown, Activity, Users, DollarSign, Hash, Clock, BarChart3, PieChart, RefreshCw, Download } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function OnChainAnalyticsFeature() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

  const timeframes = [
    { id: '1h', label: '1 Hour' },
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' }
  ]

  const metrics = [
    {
      name: 'Transactions',
      value: 1247,
      change: '+12%',
      icon: <Activity className="w-4 h-4" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      description: 'Total transactions on the network'
    },
    {
      name: 'Active Users',
      value: 892,
      change: '+8%',
      icon: <Users className="w-4 h-4" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      description: 'Unique active addresses'
    },
    {
      name: 'Volume',
      value: 2400000,
      change: '+24%',
      icon: <DollarSign className="w-4 h-4" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      description: 'Total trading volume'
    },
    {
      name: 'Block Height',
      value: 156789,
      change: '+156',
      icon: <Hash className="w-4 h-4" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      description: 'Current block number'
    }
  ]

  const networkStats = [
    {
      title: 'Network Health',
      value: 'Excellent',
      change: 'Stable',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Gas Price',
      value: '15 Gwei',
      change: '-2.1%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Block Time',
      value: '12.3s',
      change: '+0.2s',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Difficulty',
      value: '12.5T',
      change: '+1.8%',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const tokenDistribution = [
    { name: 'Holders', value: 847, percentage: 45, color: 'bg-blue-500' },
    { name: 'Liquidity', value: 423, percentage: 25, color: 'bg-green-500' },
    { name: 'Treasury', value: 312, percentage: 20, color: 'bg-purple-500' },
    { name: 'Team', value: 156, percentage: 10, color: 'bg-orange-500' }
  ]

  const recentTransactions = [
    {
      hash: '0x7f9a...3b2c',
      type: 'Transfer',
      from: '0x8a2b...4c1d',
      to: '0x3d4e...5f6g',
      amount: '1,234 FLOW',
      timestamp: '2 mins ago',
      status: 'success'
    },
    {
      hash: '0x2b3c...4d5e',
      type: 'Swap',
      from: '0x5f6g...7h8i',
      to: '0x9j0k...1l2m',
      amount: '567 FLOW',
      timestamp: '5 mins ago',
      status: 'success'
    },
    {
      hash: '0x8d9e...0f1g',
      type: 'Add Liquidity',
      from: '0x2h3i...4j5k',
      to: '0x6l7m...8n9o',
      amount: '890 FLOW',
      timestamp: '12 mins ago',
      status: 'success'
    },
    {
      hash: '0x1a2b...3c4d',
      type: 'Remove Liquidity',
      from: '0x5e6f...7g8h',
      to: '0x9i0j...1k2l',
      amount: '345 FLOW',
      timestamp: '18 mins ago',
      status: 'success'
    }
  ]

  const topHolders = [
    { address: '0x7f8a...9b0c', balance: '12,345,678', percentage: '12.3%', rank: 1 },
    { address: '0x1d2e...3f4g', balance: '9,876,543', percentage: '9.8%', rank: 2 },
    { address: '0x5h6i...7j8k', balance: '7,654,321', percentage: '7.6%', rank: 3 },
    { address: '0x9l0m...1n2o', balance: '5,432,109', percentage: '5.4%', rank: 4 },
    { address: '0x3p4q...5r6s', balance: '3,210,987', percentage: '3.2%', rank: 5 }
  ]

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      // Animate values
      metrics.forEach((metric, index) => {
        setTimeout(() => {
          setAnimatedValues(prev => ({
            ...prev,
            [metric.name]: metric.value
          }))
        }, index * 200)
      })
    }, 2000)
  }

  useEffect(() => {
    // Initial animation
    metrics.forEach((metric, index) => {
      setTimeout(() => {
        setAnimatedValues(prev => ({
          ...prev,
          [metric.name]: metric.value
        }))
      }, index * 200)
    })
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Feature Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold", themeClasses.accent)}>On-Chain Analytics</h3>
            <p className={cn("text-sm opacity-60", themeClasses.textSecondary)}>
              Comprehensive blockchain data analysis
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-indigo-600 text-indigo-600" : theme === 'dark' ? "border-purple-600 text-purple-600" : "border-purple-600 text-purple-600")}>
            1M+ Data Points
          </Badge>
          <Badge className={cn("text-xs", theme === 'light' ? "bg-indigo-600 text-white" : theme === 'dark' ? "bg-purple-600 text-white" : "bg-purple-600 text-white")}>
            BETA
          </Badge>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", themeClasses.text)}>Timeframe:</span>
          <div className="flex gap-2">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.id}
                variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className="text-xs"
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            {isRefreshing ? (
              <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", metric.bgColor)}>
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                </div>
                <Badge variant="outline" className={cn(
                  "text-xs",
                  metric.change.startsWith('+') ? "border-green-500 text-green-500" :
                  "border-red-500 text-red-500"
                )}>
                  {metric.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">
                {metric.name === 'Volume' ? formatNumber(animatedValues[metric.name] || 0) : (animatedValues[metric.name] || 0).toLocaleString()}
              </div>
              <div className="font-semibold text-sm mb-1">{metric.name}</div>
              <div className={cn("text-xs", themeClasses.textSecondary)}>{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Statistics */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Network Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkStats.map((stat, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg border",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center", stat.color)}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    stat.change.startsWith('+') ? "border-green-500 text-green-500" :
                    stat.change.startsWith('-') ? "border-red-500 text-red-500" :
                    "border-gray-500 text-gray-500"
                  )}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-lg font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium mb-1">{stat.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Token Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>Token Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tokenDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", item.color)}></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.value.toLocaleString()}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("h-2 rounded-full transition-all duration-1000", item.color)}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>Top Holders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topHolders.map((holder, index) => (
                <div key={index} className={cn(
                  "p-3 rounded-lg border flex items-center justify-between",
                  theme === 'light' ? "bg-gray-50 border-gray-200" :
                  theme === 'dark' ? "bg-gray-800 border-gray-700" :
                  "bg-gray-50 border-gray-200"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      holder.rank === 1 ? "bg-yellow-500 text-white" :
                      holder.rank === 2 ? "bg-gray-400 text-white" :
                      holder.rank === 3 ? "bg-orange-600 text-white" :
                      "bg-gray-300 text-gray-700"
                    )}>
                      {holder.rank}
                    </div>
                    <div>
                      <div className="font-mono text-sm">{holder.address}</div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>
                        {holder.balance} FLOW
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {holder.percentage}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <div key={index} className={cn(
                "p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{tx.type}</span>
                        <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                          {tx.status}
                        </Badge>
                      </div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>
                        {tx.hash} • {tx.timestamp}
                      </div>
                      <div className={cn("text-xs mt-1", themeClasses.textSecondary)}>
                        From: <span className="font-mono">{tx.from}</span> → To: <span className="font-mono">{tx.to}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-green-500">{tx.amount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>Volume Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className={cn("w-16 h-16 mx-auto mb-4", themeClasses.textSecondary)} />
                <p className={cn("text-sm", themeClasses.textSecondary)}>
                  Interactive volume chart visualization
                </p>
                <p className={cn("text-xs mt-2", themeClasses.textSecondary)}>
                  Real-time trading volume over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>Activity Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <PieChart className={cn("w-16 h-16 mx-auto mb-4", themeClasses.textSecondary)} />
                <p className={cn("text-sm", themeClasses.textSecondary)}>
                  Network activity heatmap
                </p>
                <p className={cn("text-xs mt-2", themeClasses.textSecondary)}>
                  Visual representation of transaction patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-2">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Real-Time Data</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Live blockchain data updates every second
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Advanced Charts</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Interactive visualizations and analytics
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Trend Analysis</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Identify patterns and predict future trends
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}