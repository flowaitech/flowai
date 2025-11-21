'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Sparkles,
  Lightbulb,
  Database,
  Cpu,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Insight {
  id: string
  title: string
  description: string
  type: 'trend' | 'prediction' | 'anomaly' | 'opportunity'
  confidence: number
  impact: 'low' | 'medium' | 'high'
  timestamp: Date
  assets: string[]
  metrics: {
    value: number
    change: number
    changePercent: number
  }
}

interface MarketSentiment {
  overall: 'bullish' | 'bearish' | 'neutral'
  score: number
  factors: {
    social: number
    technical: number
    fundamental: number
    onchain: number
  }
}

export default function AIInsightEngine() {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      title: 'Unusual Volume Spike Detected',
      description: 'FLOW token experiencing 3x normal volume with positive price momentum',
      type: 'anomaly',
      confidence: 92,
      impact: 'high',
      timestamp: new Date(Date.now() - 300000),
      assets: ['FLOW'],
      metrics: {
        value: 0.0456,
        change: 0.0123,
        changePercent: 36.96
      }
    },
    {
      id: '2',
      title: 'DeFi TVL Growth Trend',
      description: 'Total Value Locked in DeFi protocols showing strong upward trajectory',
      type: 'trend',
      confidence: 87,
      impact: 'medium',
      timestamp: new Date(Date.now() - 600000),
      assets: ['ETH', 'USDC'],
      metrics: {
        value: 125.6,
        change: 8.4,
        changePercent: 7.18
      }
    },
    {
      id: '3',
      title: 'AI Prediction: ETH Breakout',
      description: 'Neural network indicates 78% probability of ETH breaking $4,000 resistance',
      type: 'prediction',
      confidence: 78,
      impact: 'high',
      timestamp: new Date(Date.now() - 900000),
      assets: ['ETH'],
      metrics: {
        value: 3456.78,
        change: 125.43,
        changePercent: 3.77
      }
    },
    {
      id: '4',
      title: 'Cross-Chain Bridge Activity',
      description: 'Increased bridging activity between Ethereum and Layer 2 networks',
      type: 'opportunity',
      confidence: 71,
      impact: 'medium',
      timestamp: new Date(Date.now() - 1200000),
      assets: ['ETH', 'ARB', 'OP'],
      metrics: {
        value: 89.2,
        change: 15.6,
        changePercent: 21.18
      }
    }
  ])

  const [sentiment, setSentiment] = useState<MarketSentiment>({
    overall: 'bullish',
    score: 68,
    factors: {
      social: 72,
      technical: 65,
      fundamental: 58,
      onchain: 75
    }
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSentiment(prev => ({
        ...prev,
        score: Math.max(0, Math.min(100, prev.score + (Math.random() - 0.5) * 5)),
        factors: {
          social: Math.max(0, Math.min(100, prev.factors.social + (Math.random() - 0.5) * 8)),
          technical: Math.max(0, Math.min(100, prev.factors.technical + (Math.random() - 0.5) * 6)),
          fundamental: Math.max(0, Math.min(100, prev.factors.fundamental + (Math.random() - 0.5) * 4)),
          onchain: Math.max(0, Math.min(100, prev.factors.onchain + (Math.random() - 0.5) * 7))
        }
      }))
    }, 4000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const newInsight: Insight = {
        id: Date.now().toString(),
        title: 'Real-time Analysis Complete',
        description: 'AI has identified new market patterns and trading opportunities',
        type: 'trend',
        confidence: 85 + Math.random() * 10,
        impact: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        timestamp: new Date(),
        assets: ['BTC', 'ETH', 'FLOW'][Math.floor(Math.random() * 3)].split(','),
        metrics: {
          value: Math.random() * 1000,
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 20
        }
      }
      setInsights(prev => [newInsight, ...prev.slice(0, 7)])
      setIsAnalyzing(false)
    }, 2000)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-5 h-5" />
      case 'prediction': return <Brain className="w-5 h-5" />
      case 'anomaly': return <AlertTriangle className="w-5 h-5" />
      case 'opportunity': return <Target className="w-5 h-5" />
      default: return <Eye className="w-5 h-5" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'from-blue-600 to-cyan-600'
      case 'prediction': return 'from-purple-600 to-pink-600'
      case 'anomaly': return 'from-orange-600 to-red-600'
      case 'opportunity': return 'from-green-600 to-emerald-600'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getSentimentColor = (score: number) => {
    if (score >= 66) return 'text-green-400'
    if (score >= 33) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)` 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 animate-pulse" />
        {/* AI particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/beta-features">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Beta Features
              </Button>
            </Link>
          </div>

          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-pink-500" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                AI Insight Engine
              </h1>
              <Brain className="w-8 h-8 text-pink-500" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-none">
                <Lightbulb className="w-3 h-3 mr-1" />
                AI INSIGHTS
              </Badge>
              <Badge className="bg-pink-600 text-white border-none animate-pulse">
                <Eye className="w-3 h-3 mr-1" />
                DEEP ANALYSIS
              </Badge>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Deep market analysis and trend prediction powered by advanced AI neural networks
            </p>
          </div>

          {/* Market Sentiment Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl lg:col-span-2">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Market Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400">Overall Sentiment</span>
                    <span className={cn("text-2xl font-bold", getSentimentColor(sentiment.score))}>
                      {sentiment.overall.toUpperCase()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div 
                      className={cn(
                        "h-3 rounded-full transition-all duration-500",
                        sentiment.score >= 66 ? "bg-green-600" :
                        sentiment.score >= 33 ? "bg-yellow-600" : "bg-red-600"
                      )}
                      style={{ width: `${sentiment.score}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    Score: {sentiment.score.toFixed(0)}/100
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-400">Social</span>
                    </div>
                    <div className="text-lg font-semibold text-blue-400">
                      {sentiment.factors.social.toFixed(0)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <LineChart className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-400">Technical</span>
                    </div>
                    <div className="text-lg font-semibold text-green-400">
                      {sentiment.factors.technical.toFixed(0)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-400">Fundamental</span>
                    </div>
                    <div className="text-lg font-semibold text-purple-400">
                      {sentiment.factors.fundamental.toFixed(0)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm text-gray-400">On-Chain</span>
                    </div>
                    <div className="text-lg font-semibold text-cyan-400">
                      {sentiment.factors.onchain.toFixed(0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-xl font-bold text-purple-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  AI Engine Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Neural Network</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Processing Speed</span>
                    <span className="text-cyan-400 text-sm">12ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-purple-400 text-sm">94.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Data Points</span>
                    <span className="text-pink-400 text-sm">2.3M</span>
                  </div>
                </div>

                <Button 
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className={cn(
                    "w-full mt-6 transition-all duration-300 hover:scale-105",
                    "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Run Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-pink-500" />
                AI Insights
              </h2>
              <Badge className="bg-pink-600/20 border-pink-600 text-pink-400">
                {insights.length} Active Insights
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight, index) => {
                const Icon = getInsightIcon(insight.type)
                return (
                  <Card
                    key={insight.id}
                    className="border-0 bg-gray-900/80 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          "bg-gradient-to-r " + getInsightColor(insight.type)
                        )}>
                          <div className="text-white">
                            {Icon}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-700">
                            {insight.type.toUpperCase()}
                          </Badge>
                          <Badge className={cn(
                            "text-xs",
                            insight.impact === 'high' ? "bg-red-600" :
                            insight.impact === 'medium' ? "bg-yellow-600" : "bg-green-600"
                          )}>
                            {insight.impact.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-white">
                        {insight.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {insight.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <div className="flex items-center gap-1">
                            <div className="w-16 bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-gradient-to-r from-pink-600 to-purple-600 h-1.5 rounded-full"
                                style={{ width: `${insight.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs text-cyan-400">
                              {insight.confidence.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {new Date(insight.timestamp).toLocaleTimeString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {insight.assets.map((asset, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-gray-700">
                              {asset}
                            </Badge>
                          ))}
                        </div>
                        {insight.metrics && (
                          <div className="text-right">
                            <div className="text-sm font-semibold">
                              {insight.metrics.value.toFixed(4)}
                            </div>
                            <div className={cn(
                              "text-xs",
                              insight.metrics.change >= 0 ? "text-green-400" : "text-red-400"
                            )}>
                              {insight.metrics.change >= 0 ? '+' : ''}{insight.metrics.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <PieChart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-pink-400">2.3M</div>
                <div className="text-sm text-gray-400">Data Points Analyzed</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">94.7%</div>
                <div className="text-sm text-gray-400">Prediction Accuracy</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">156</div>
                <div className="text-sm text-gray-400">Trends Identified</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">24/7</div>
                <div className="text-sm text-gray-400">AI Monitoring</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}