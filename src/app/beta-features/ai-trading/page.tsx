'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Activity,
  Zap,
  Brain,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  RefreshCw,
  Wifi,
  WifiOff
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Header from '@/components/header'

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  prediction: 'bullish' | 'bearish' | 'neutral'
  confidence: number
  lastUpdate: Date
  dayHigh: number
  dayLow: number
  bid: number
  ask: number
  spread: number
}

interface TradePosition {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  amount: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  timestamp: Date
}

export default function AITrading() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: 'BTC/USD',
      price: 67890.12,
      change: -234.56,
      changePercent: -0.34,
      volume: '28.5B',
      marketCap: '1.32T',
      prediction: 'neutral',
      confidence: 62,
      lastUpdate: new Date(),
      dayHigh: 68500,
      dayLow: 67200,
      bid: 67885.50,
      ask: 67894.75,
      spread: 9.25
    },
    {
      symbol: 'ETH/USD',
      price: 3456.78,
      change: 125.43,
      changePercent: 3.77,
      volume: '2.3B',
      marketCap: '415B',
      prediction: 'bullish',
      confidence: 87,
      lastUpdate: new Date(),
      dayHigh: 3500,
      dayLow: 3380,
      bid: 3455.20,
      ask: 3458.35,
      spread: 3.15
    },
    {
      symbol: 'SOL/USD',
      price: 178.90,
      change: 8.45,
      changePercent: 4.96,
      volume: '2.1B',
      marketCap: '78B',
      prediction: 'bullish',
      confidence: 78,
      lastUpdate: new Date(),
      dayHigh: 182.50,
      dayLow: 170.20,
      bid: 178.75,
      ask: 179.05,
      spread: 0.30
    },
    {
      symbol: 'FLOW/USD',
      price: 0.0456,
      change: 0.0123,
      changePercent: 36.96,
      volume: '125M',
      marketCap: '45.6M',
      prediction: 'bullish',
      confidence: 94,
      lastUpdate: new Date(),
      dayHigh: 0.0480,
      dayLow: 0.0330,
      bid: 0.0455,
      ask: 0.0457,
      spread: 0.0002
    },
    {
      symbol: 'BNB/USD',
      price: 595.30,
      change: 12.45,
      changePercent: 2.14,
      volume: '890M',
      marketCap: '91B',
      prediction: 'bullish',
      confidence: 71,
      lastUpdate: new Date(),
      dayHigh: 600.00,
      dayLow: 585.20,
      bid: 595.10,
      ask: 595.50,
      spread: 0.40
    },
    {
      symbol: 'XRP/USD',
      price: 0.5234,
      change: -0.0123,
      changePercent: -2.29,
      volume: '1.2B',
      marketCap: '28.5B',
      prediction: 'bearish',
      confidence: 68,
      lastUpdate: new Date(),
      dayHigh: 0.5400,
      dayLow: 0.5200,
      bid: 0.5232,
      ask: 0.5236,
      spread: 0.0004
    }
  ])

  const [positions, setPositions] = useState<TradePosition[]>([
    {
      id: '1',
      symbol: 'ETH/USD',
      type: 'buy',
      amount: 2.5,
      entryPrice: 3200.00,
      currentPrice: 3456.78,
      pnl: 641.95,
      pnlPercent: 8.02,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      symbol: 'FLOW/USD',
      type: 'buy',
      amount: 10000,
      entryPrice: 0.0333,
      currentPrice: 0.0456,
      pnl: 123.00,
      pnlPercent: 36.94,
      timestamp: new Date(Date.now() - 7200000)
    }
  ])

  const [selectedAsset, setSelectedAsset] = useState<MarketData>(marketData[0])
  const [tradeAmount, setTradeAmount] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [priceUpdates, setPriceUpdates] = useState<{[key: string]: boolean}>({})
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected')
  const [tradeHistory, setTradeHistory] = useState<{symbol: string, price: number, time: Date}[]>([])
  const wsRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate WebSocket connection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)

    // Simulate connection status
    setConnectionStatus('connecting')
    setTimeout(() => setConnectionStatus('connected'), 1000)

    // Simulate real-time WebSocket updates
    const simulateWebSocket = () => {
      // Random disconnection simulation (rare)
      if (Math.random() < 0.01) {
        setConnectionStatus('disconnected')
        setTimeout(() => setConnectionStatus('connecting'), 2000)
        setTimeout(() => setConnectionStatus('connected'), 3000)
        return
      }

      setMarketData(prev => prev.map(asset => {
        // Different volatility for different assets
        const baseVolatility = {
          'BTC/USD': 0.0008,
          'ETH/USD': 0.0012,
          'SOL/USD': 0.0025,
          'FLOW/USD': 0.004,
          'BNB/USD': 0.0015,
          'XRP/USD': 0.002
        }

        const volatility = baseVolatility[asset.symbol as keyof typeof baseVolatility] || 0.002
        
        // Add market trend influence
        const marketTrend = Math.sin(Date.now() / 10000) * 0.0005
        const randomWalk = (Math.random() - 0.5) * volatility
        const priceChange = marketTrend + randomWalk
        
        const newPrice = Math.max(0.001, asset.price * (1 + priceChange))
        const priceDiff = newPrice - asset.price
        
        // Update bid/ask spread
        const newBid = newPrice - (asset.spread / 2)
        const newAsk = newPrice + (asset.spread / 2)
        
        // Update day high/low
        const newDayHigh = Math.max(asset.dayHigh, newPrice)
        const newDayLow = Math.min(asset.dayLow, newPrice)
        
        // Calculate new change percentage based on day's opening price
        const dayOpen = asset.dayLow - (asset.dayHigh - asset.dayLow) * 0.3
        const newChangePercent = ((newPrice - dayOpen) / dayOpen) * 100
        
        // Trigger animation
        setPriceUpdates(prev => ({ ...prev, [asset.symbol]: true }))
        setTimeout(() => {
          setPriceUpdates(prev => ({ ...prev, [asset.symbol]: false }))
        }, 500)
        
        // Add to trade history
        setTradeHistory(prev => {
          const newEntry = { symbol: asset.symbol, price: newPrice, time: new Date() }
          return [newEntry, ...prev.slice(0, 49)]
        })
        
        return {
          ...asset,
          price: newPrice,
          change: asset.change + priceDiff,
          changePercent: newChangePercent,
          lastUpdate: new Date(),
          dayHigh: newDayHigh,
          dayLow: newDayLow,
          bid: newBid,
          ask: newAsk
        }
      }))
    }

    // Update prices every 500ms for ultra-real-time feel
    wsRef.current = setInterval(simulateWebSocket, 500)

    // Update positions with new prices
    const positionInterval = setInterval(() => {
      setPositions(prev => prev.map(position => {
        const updatedAsset = marketData.find(asset => asset.symbol === position.symbol)
        if (updatedAsset) {
          const newPnl = position.type === 'buy' 
            ? (updatedAsset.price - position.entryPrice) * position.amount
            : (position.entryPrice - updatedAsset.price) * position.amount
          const newPnlPercent = (newPnl / (position.entryPrice * position.amount)) * 100
          
          return {
            ...position,
            currentPrice: updatedAsset.price,
            pnl: newPnl,
            pnlPercent: newPnlPercent
          }
        }
        return position
      }))
    }, 1000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (wsRef.current) clearInterval(wsRef.current)
      clearInterval(positionInterval)
    }
  }, [])

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!tradeAmount || parseFloat(tradeAmount) <= 0) return

    const newPosition: TradePosition = {
      id: Date.now().toString(),
      symbol: selectedAsset.symbol,
      type,
      amount: parseFloat(tradeAmount),
      entryPrice: selectedAsset.price,
      currentPrice: selectedAsset.price,
      pnl: 0,
      pnlPercent: 0,
      timestamp: new Date()
    }

    setPositions(prev => [newPosition, ...prev])
    setTradeAmount('')
  }

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getPredictionBadge = (prediction: string) => {
    switch (prediction) {
      case 'bullish': 
        return <Badge className="bg-green-600 hover:bg-green-700">Bullish</Badge>
      case 'bearish': 
        return <Badge className="bg-red-600 hover:bg-red-700">Bearish</Badge>
      default: 
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Neutral</Badge>
    }
  }

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 1) return 'Now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  }

  return (
    <>
      <Header />
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
          {/* Trading particles */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-500 rounded-full animate-pulse"
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

            {/* Title Section with Connection Status */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  AI Trading
                </h1>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-green-600 to-cyan-600 text-white border-none">
                  <Brain className="w-3 h-3 mr-1" />
                  AI POWERED
                </Badge>
                <Badge className={cn(
                  "text-white border-none flex items-center gap-1",
                  connectionStatus === 'connected' ? "bg-green-600" : 
                  connectionStatus === 'connecting' ? "bg-yellow-600 animate-pulse" : "bg-red-600"
                )}>
                  {connectionStatus === 'connected' ? (
                    <><Wifi className="w-3 h-3" /> LIVE</>
                  ) : connectionStatus === 'connecting' ? (
                    <><RefreshCw className="w-3 h-3 animate-spin" /> CONNECTING</>
                  ) : (
                    <><WifiOff className="w-3 h-3" /> OFFLINE</>
                  )}
                </Badge>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Real-time trading simulation with AI market predictions and live portfolio management
              </p>
            </div>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Total P&L</span>
                    <DollarSign className="w-4 h-4 text-green-500" />
                  </div>
                  <div className={cn(
                    "text-2xl font-bold transition-all duration-300",
                    totalPnL >= 0 ? "text-green-400" : "text-red-400"
                  )}>
                    ${totalPnL.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Real-time performance</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Active Positions</span>
                    <BarChart3 className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">{positions.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Open trades</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Market Updates</span>
                    <Activity className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-purple-500">500ms</div>
                  <div className="text-xs text-gray-500 mt-1">Update frequency</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Market Status</span>
                    <Activity className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-400">ACTIVE</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {connectionStatus === 'connected' ? 'All systems operational' : 'Reconnecting...'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Market Data */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-gray-900/80 backdrop-blur-xl mb-6">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Live Market Data
                      <span className="text-xs text-green-400 ml-2 animate-pulse">
                        {connectionStatus === 'connected' ? '● REAL-TIME' : '● OFFLINE'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {marketData.map((asset) => (
                        <div
                          key={asset.symbol}
                          className={cn(
                            "p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-102 relative overflow-hidden",
                            selectedAsset.symbol === asset.symbol
                              ? "border-cyan-500 bg-cyan-500/10"
                              : "border-gray-700 hover:border-gray-600",
                            priceUpdates[asset.symbol] && "ring-2 ring-cyan-500/50"
                          )}
                          onClick={() => setSelectedAsset(asset)}
                        >
                          {/* Update flash effect */}
                          {priceUpdates[asset.symbol] && (
                            <div className="absolute inset-0 bg-cyan-500/10 animate-ping" />
                          )}
                          
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold text-lg">{asset.symbol}</div>
                                <div className={cn(
                                  "text-2xl font-bold transition-all duration-300",
                                  priceUpdates[asset.symbol] ? "text-cyan-400 scale-105" : ""
                                )}>
                                  ${asset.price.toFixed(asset.symbol === 'FLOW/USD' || asset.symbol === 'XRP/USD' ? 4 : 2)}
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatLastUpdate(asset.lastUpdate)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    H: ${asset.dayHigh.toFixed(asset.symbol === 'FLOW/USD' || asset.symbol === 'XRP/USD' ? 4 : 2)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    L: ${asset.dayLow.toFixed(asset.symbol === 'FLOW/USD' || asset.symbol === 'XRP/USD' ? 4 : 2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={cn(
                                "flex items-center gap-1 font-semibold text-lg",
                                asset.change >= 0 ? "text-green-400" : "text-red-400"
                              )}>
                                {asset.change >= 0 ? (
                                  <ArrowUpRight className="w-4 h-4" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4" />
                                )}
                                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                              </div>
                              <div className="text-sm text-gray-400">Vol: {asset.volume}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Bid: ${asset.bid.toFixed(asset.symbol === 'FLOW/USD' || asset.symbol === 'XRP/USD' ? 4 : 2)} | 
                                Ask: ${asset.ask.toFixed(asset.symbol === 'FLOW/USD' || asset.symbol === 'XRP/USD' ? 4 : 2)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              {getPredictionBadge(asset.prediction)}
                              <span className="text-xs text-gray-400">
                                Confidence: {asset.confidence}%
                              </span>
                            </div>
                            <div className={cn(
                              "text-xs font-medium",
                              getPredictionColor(asset.prediction)
                            )}>
                              AI: {asset.prediction.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Positions */}
                <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-xl font-bold text-purple-400 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Active Positions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {positions.map((position) => (
                        <div key={position.id} className="p-4 rounded-lg border border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{position.symbol}</span>
                                <Badge variant={position.type === 'buy' ? 'default' : 'destructive'}>
                                  {position.type.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-400">
                                {position.amount} @ ${position.entryPrice.toFixed(4)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={cn(
                                "font-bold text-lg",
                                position.pnl >= 0 ? "text-green-400" : "text-red-400"
                              )}>
                                ${position.pnl.toFixed(2)}
                              </div>
                              <div className={cn(
                                "text-sm",
                                position.pnl >= 0 ? "text-green-400" : "text-red-400"
                              )}>
                                {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trading Panel */}
              <div>
                <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-xl font-bold text-green-400 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Quick Trade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Selected Asset</label>
                        <div className="p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                          <div className="font-bold">{selectedAsset.symbol}</div>
                          <div className="text-sm text-gray-400">
                            ${selectedAsset.price.toFixed(selectedAsset.symbol === 'FLOW/USD' || selectedAsset.symbol === 'XRP/USD' ? 4 : 2)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Spread: ${selectedAsset.spread.toFixed(selectedAsset.symbol === 'FLOW/USD' || selectedAsset.symbol === 'XRP/USD' ? 4 : 2)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Amount</label>
                        <input
                          type="number"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800/50 text-white outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => handleTrade('buy')}
                          className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                          disabled={!tradeAmount || connectionStatus !== 'connected'}
                        >
                          BUY
                        </Button>
                        <Button
                          onClick={() => handleTrade('sell')}
                          variant="destructive"
                          className="transition-all duration-300 hover:scale-105"
                          disabled={!tradeAmount || connectionStatus !== 'connected'}
                        >
                          SELL
                        </Button>
                      </div>

                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400">AI Analysis</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsAnalyzing(!isAnalyzing)}
                            className="text-cyan-400 hover:text-cyan-300"
                            disabled={connectionStatus !== 'connected'}
                          >
                            <RefreshCw className={cn("w-4 h-4", isAnalyzing && "animate-spin")} />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">Strong momentum detected</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-cyan-500" />
                            <span className="text-sm">Target: ${(selectedAsset.price * 1.1).toFixed(selectedAsset.symbol === 'FLOW/USD' || selectedAsset.symbol === 'XRP/USD' ? 4 : 2)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">Stop loss: ${(selectedAsset.price * 0.95).toFixed(selectedAsset.symbol === 'FLOW/USD' || selectedAsset.symbol === 'XRP/USD' ? 4 : 2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
    </>
  )
}