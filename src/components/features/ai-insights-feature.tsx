'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, Zap, BarChart3, Activity, Eye, Lightbulb, RefreshCw } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function AIInsightsFeature() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [selectedModel, setSelectedModel] = useState('neural_network')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentPrediction, setCurrentPrediction] = useState<any>(null)

  const aiModels = [
    {
      id: 'neural_network',
      name: 'Neural Network',
      accuracy: '94.2%',
      description: 'Deep learning model for pattern recognition',
      color: 'from-blue-600 to-purple-600',
      features: ['Pattern Recognition', 'Time Series Analysis', 'Sentiment Analysis']
    },
    {
      id: 'random_forest',
      name: 'Random Forest',
      accuracy: '89.7%',
      description: 'Ensemble learning for robust predictions',
      color: 'from-green-600 to-emerald-600',
      features: ['Feature Importance', 'Risk Assessment', 'Multi-factor Analysis']
    },
    {
      id: 'lstm',
      name: 'LSTM Network',
      accuracy: '91.8%',
      description: 'Long short-term memory for sequential data',
      color: 'from-orange-600 to-red-600',
      features: ['Sequence Prediction', 'Memory Retention', 'Temporal Patterns']
    },
    {
      id: 'transformer',
      name: 'Transformer',
      accuracy: '92.5%',
      description: 'Attention-based model for complex relationships',
      color: 'from-purple-600 to-pink-600',
      features: ['Attention Mechanism', 'Context Understanding', 'Multi-head Analysis']
    }
  ]

  const predictions = [
    {
      token: 'FLOW',
      prediction: 'Bullish',
      confidence: 78,
      targetPrice: '$0.000156',
      timeframe: '7 days',
      factors: ['Volume Increase', 'Positive Sentiment', 'Technical Indicators'],
      risk: 'Low',
      model: 'neural_network'
    },
    {
      token: 'ETH',
      prediction: 'Neutral',
      confidence: 65,
      targetPrice: '$3,500',
      timeframe: '14 days',
      factors: ['Market Consolidation', 'Mixed Signals', 'Low Volatility'],
      risk: 'Medium',
      model: 'random_forest'
    },
    {
      token: 'BTC',
      prediction: 'Bearish',
      confidence: 52,
      targetPrice: '$65,000',
      timeframe: '30 days',
      factors: ['Resistance Levels', 'Negative Sentiment', 'High Volatility'],
      risk: 'High',
      model: 'lstm'
    },
    {
      token: 'SOL',
      prediction: 'Bullish',
      confidence: 82,
      targetPrice: '$180',
      timeframe: '10 days',
      factors: ['Strong Momentum', 'Positive News', 'Technical Breakout'],
      risk: 'Medium',
      model: 'transformer'
    }
  ]

  const marketInsights = [
    {
      title: 'Market Sentiment',
      value: 'Positive',
      change: '+12%',
      description: 'Overall market sentiment is improving',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-green-500'
    },
    {
      title: 'Volatility Index',
      value: 'Medium',
      change: '-5%',
      description: 'Market volatility is decreasing',
      icon: <Activity className="w-4 h-4" />,
      color: 'text-yellow-500'
    },
    {
      title: 'Trading Volume',
      value: '$2.3B',
      change: '+18%',
      description: 'Daily trading volume is increasing',
      icon: <BarChart3 className="w-4 h-4" />,
      color: 'text-blue-500'
    },
    {
      title: 'Risk Level',
      value: 'Moderate',
      change: '0%',
      description: 'Current market risk is moderate',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'text-orange-500'
    }
  ]

  const technicalIndicators = [
    { name: 'RSI', value: 65.4, status: 'Neutral', description: 'Relative Strength Index' },
    { name: 'MACD', value: 'Bullish', status: 'Positive', description: 'Moving Average Convergence Divergence' },
    { name: 'BB', value: 'Middle', status: 'Neutral', description: 'Bollinger Bands' },
    { name: 'SMA', value: 'Above', status: 'Positive', description: 'Simple Moving Average' },
    { name: 'EMA', value: 'Above', status: 'Positive', description: 'Exponential Moving Average' },
    { name: 'Stoch', value: 72.1, status: 'Overbought', description: 'Stochastic Oscillator' }
  ]

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)]
      setCurrentPrediction(randomPrediction)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'Bullish': return 'text-green-500'
      case 'Bearish': return 'text-red-500'
      case 'Neutral': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500'
    if (confidence >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Feature Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold", themeClasses.accent)}>AI-Powered Insights</h3>
            <p className={cn("text-sm opacity-60", themeClasses.textSecondary)}>
              Advanced machine learning for market analysis
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-cyan-600 text-cyan-600" : theme === 'dark' ? "border-blue-600 text-blue-600" : "border-purple-600 text-purple-600")}>
            25+ Models
          </Badge>
          <Badge className={cn("text-xs", theme === 'light' ? "bg-cyan-600 text-white" : theme === 'dark' ? "bg-blue-600 text-white" : "bg-purple-600 text-white")}>
            BETA
          </Badge>
        </div>
      </div>

      {/* AI Models Selection */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>AI Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiModels.map((model, index) => (
              <div
                key={index}
                onClick={() => setSelectedModel(model.id)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105",
                  selectedModel === model.id ?
                    (theme === 'light' ? "bg-blue-50 border-blue-500" :
                     theme === 'dark' ? "bg-green-900/30 border-green-500" :
                     "bg-purple-50 border-purple-500") :
                    (theme === 'light' ? "bg-gray-50 border-gray-200 hover:bg-gray-100" :
                     theme === 'dark' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" :
                     "bg-gray-50 border-gray-200 hover:bg-gray-100")
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center", model.color)}>
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    model.accuracy === '94.2%' ? "border-green-500 text-green-500" :
                    model.accuracy === '92.5%' ? "border-blue-500 text-blue-500" :
                    model.accuracy === '91.8%' ? "border-purple-500 text-purple-500" :
                    "border-yellow-500 text-yellow-500"
                  )}>
                    {model.accuracy}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{model.name}</h4>
                <p className={cn("text-xs mb-3", themeClasses.textSecondary)}>{model.description}</p>
                <div className="space-y-1">
                  {model.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <span className="text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg border",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", insight.color)}>
                    {insight.icon}
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    insight.change.startsWith('+') ? "border-green-500 text-green-500" :
                    insight.change.startsWith('-') ? "border-red-500 text-red-500" :
                    "border-gray-500 text-gray-500"
                  )}>
                    {insight.change}
                  </Badge>
                </div>
                <div className="font-semibold text-sm mb-1">{insight.value}</div>
                <div className={cn("text-xs", themeClasses.textSecondary)}>{insight.title}</div>
                <div className={cn("text-xs mt-1", themeClasses.textSecondary)}>{insight.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={cn("text-lg", themeClasses.accent)}>AI Predictions</CardTitle>
            <Button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((prediction, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg border transition-all duration-200 hover:scale-105",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      prediction.prediction === 'Bullish' ? 'bg-green-100' :
                      prediction.prediction === 'Bearish' ? 'bg-red-100' :
                      'bg-yellow-100'
                    )}>
                      {prediction.prediction === 'Bullish' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : prediction.prediction === 'Bearish' ? (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      ) : (
                        <Activity className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{prediction.token}</div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>
                        {prediction.timeframe}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("font-bold text-sm", getPredictionColor(prediction.prediction))}>
                      {prediction.prediction}
                    </div>
                    <div className={cn("text-xs", getConfidenceColor(prediction.confidence))}>
                      {prediction.confidence}% confidence
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Target Price</span>
                    <span className="text-xs font-medium">{prediction.targetPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Risk Level</span>
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      prediction.risk === 'Low' ? "border-green-500 text-green-500" :
                      prediction.risk === 'Medium' ? "border-yellow-500 text-yellow-500" :
                      "border-red-500 text-red-500"
                    )}>
                      {prediction.risk}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>AI Model</span>
                    <span className="text-xs font-medium">{aiModels.find(m => m.id === prediction.model)?.name}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className={cn("text-xs font-medium mb-2", themeClasses.text)}>Key Factors:</div>
                  <div className="flex flex-wrap gap-1">
                    {prediction.factors.map((factor, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Analysis Result */}
      {currentPrediction && (
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>Latest Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={cn(
              "p-4 rounded-lg border",
              theme === 'light' ? "bg-blue-50 border-blue-200" :
              theme === 'dark' ? "bg-green-900/30 border-green-700" :
              "bg-purple-50 border-purple-200"
            )}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    currentPrediction.prediction === 'Bullish' ? 'bg-green-100' :
                    currentPrediction.prediction === 'Bearish' ? 'bg-red-100' :
                    'bg-yellow-100'
                  )}>
                    {currentPrediction.prediction === 'Bullish' ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : currentPrediction.prediction === 'Bearish' ? (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    ) : (
                      <Activity className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{currentPrediction.token}</div>
                    <div className={cn("text-sm", getPredictionColor(currentPrediction.prediction))}>
                      {currentPrediction.prediction} Prediction
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">{currentPrediction.confidence}%</div>
                  <div className={cn("text-xs", themeClasses.textSecondary)}>Confidence</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className={cn("text-xs", themeClasses.textSecondary)}>Target Price</div>
                  <div className="font-semibold">{currentPrediction.targetPrice}</div>
                </div>
                <div>
                  <div className={cn("text-xs", themeClasses.textSecondary)}>Timeframe</div>
                  <div className="font-semibold">{currentPrediction.timeframe}</div>
                </div>
                <div>
                  <div className={cn("text-xs", themeClasses.textSecondary)}>Risk Level</div>
                  <div className="font-semibold">{currentPrediction.risk}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Indicators */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Technical Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalIndicators.map((indicator, index) => (
              <div key={index} className={cn(
                "p-3 rounded-lg border",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm">{indicator.name}</div>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    indicator.status === 'Positive' ? "border-green-500 text-green-500" :
                    indicator.status === 'Negative' ? "border-red-500 text-red-500" :
                    "border-yellow-500 text-yellow-500"
                  )}>
                    {indicator.status}
                  </Badge>
                </div>
                <div className="text-lg font-bold mb-1">{indicator.value}</div>
                <div className={cn("text-xs", themeClasses.textSecondary)}>{indicator.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-2">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Deep Learning</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Advanced neural networks for pattern recognition
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>High Accuracy</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Up to 94% prediction accuracy with ensemble models
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Smart Insights</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Actionable insights based on multiple data sources
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}