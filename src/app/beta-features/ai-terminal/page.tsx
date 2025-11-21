'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Terminal, 
  Send, 
  Command,
  Zap,
  Cpu,
  Activity,
  Shield,
  Sparkles,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
}

export default function AITerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'FLOW AI Terminal v2.0.1 - Initialized',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'system',
      content: 'AI Core: Online | Neural Network: Connected | Blockchain: Synced',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'ai',
      content: 'Welcome to FLOW AI Terminal. I am your AI assistant for blockchain intelligence and DeFi operations. Type "help" for available commands or ask me anything about crypto markets.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)

    // Auto scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }

    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus()
    }

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [messages])

  const aiResponses = [
    "Analyzing blockchain data... Current market sentiment: BULLISH with 78% confidence.",
    "Neural network prediction: ETH price expected to increase by 12.5% in the next 72 hours.",
    "Smart contract audit completed. Security score: 9.8/10. No vulnerabilities detected.",
    "DeFi protocol analysis shows APY optimization opportunities in liquidity pools.",
    "Cross-chain bridge status: All operational. Current gas fees: 15 Gwei (Ethereum).",
    "AI trading bot performance: 34.2% ROI this week. Risk level: MODERATE.",
    "Tokenomics analysis: Supply distribution healthy. No whale concentration detected.",
    "Market sentiment analysis: Social media mentions up 45%. Fear & Greed Index: 68 (Greed)."
  ]

  const commands = {
    help: "Available commands: balance, predict, analyze, scan, status, clear, gas, trends",
    balance: "Current portfolio value: $125,450.32 | 24h change: +5.8%",
    predict: "AI Prediction Engine activated. Select asset for price prediction...",
    analyze: "Market Analysis Module ready. Specify token or protocol for deep analysis.",
    scan: "Smart Contract Scanner initialized. Enter contract address for security audit.",
    status: "System Status: All operational | Uptime: 99.98% | Latency: 12ms",
    clear: "Terminal cleared.",
    gas: "Current Gas Prices: Ethereum: 15 Gwei | Polygon: 30 Gwei | BSC: 5 Gwei",
    trends: "Top Trending: 1. FLOW (+127%) 2. AI (+89%) 3. DEFI (+45%)"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = ''
      
      // Check for commands
      const command = input.toLowerCase().trim()
      if (commands[command as keyof typeof commands]) {
        responseContent = commands[command as keyof typeof commands]
      } else if (input.toLowerCase().includes('help')) {
        responseContent = commands.help
      } else if (input.toLowerCase().includes('predict')) {
        responseContent = aiResponses[1]
      } else if (input.toLowerCase().includes('analyze')) {
        responseContent = aiResponses[3]
      } else if (input.toLowerCase().includes('gas')) {
        responseContent = commands.gas
      } else if (input.toLowerCase().includes('status')) {
        responseContent = commands.status
      } else {
        // Random AI response
        responseContent = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseContent,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
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
        {/* Matrix-like rain effect */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 text-xs font-mono opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Math.random() > 0.5 ? '01101' : '11010'}
          </div>
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
              <Terminal className="w-8 h-8 text-cyan-500" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                AI Terminal
              </h1>
              <Terminal className="w-8 h-8 text-cyan-500" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-none">
                <Cpu className="w-3 h-3 mr-1" />
                AI CORE ONLINE
              </Badge>
              <Badge className="bg-green-600 text-white border-none animate-pulse">
                <Activity className="w-3 h-3 mr-1" />
                ACTIVE
              </Badge>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Advanced AI-powered command interface for blockchain interactions and DeFi operations
            </p>
          </div>

          {/* Terminal Container */}
          <div className="max-w-6xl mx-auto">
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
              <CardHeader className="border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    FLOW_AI_TERMINAL_v2.0.1
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">ONLINE</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date().toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Terminal Output */}
                <div 
                  ref={terminalRef}
                  className="h-96 overflow-y-auto p-4 font-mono text-sm bg-black/50"
                  style={{ minHeight: '400px' }}
                >
                  {messages.map((message) => (
                    <div key={message.id} className="mb-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-gray-500 mt-1">
                          {formatTime(message.timestamp)}
                        </span>
                        <ChevronRight className="w-3 h-3 mt-1 text-cyan-400 flex-shrink-0" />
                        <div className="flex-1">
                          {message.type === 'system' && (
                            <span className="text-yellow-400">{message.content}</span>
                          )}
                          {message.type === 'user' && (
                            <span className="text-green-400">$ {message.content}</span>
                          )}
                          {message.type === 'ai' && (
                            <span className="text-cyan-400">{message.content}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {formatTime(new Date())}
                      </span>
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
                        <span className="text-cyan-400">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terminal Input */}
                <div className="border-t border-gray-800 p-4 bg-gray-900/50">
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-green-400 font-mono">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type 'help' for commands or ask me anything..."
                      className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-gray-500"
                      disabled={isTyping}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
                      disabled={isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Quick Commands */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { command: 'balance', icon: <Zap className="w-4 h-4" />, color: 'from-green-600 to-emerald-600' },
                { command: 'predict', icon: <Cpu className="w-4 h-4" />, color: 'from-purple-600 to-pink-600' },
                { command: 'analyze', icon: <Activity className="w-4 h-4" />, color: 'from-cyan-600 to-blue-600' },
                { command: 'status', icon: <Shield className="w-4 h-4" />, color: 'from-orange-600 to-red-600' }
              ].map((cmd, index) => (
                <Button
                  key={cmd.command}
                  variant="outline"
                  className={cn(
                    "border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105",
                    "hover:shadow-lg hover:shadow-purple-500/20"
                  )}
                  onClick={() => setInput(cmd.command)}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-2",
                    "bg-gradient-to-r " + cmd.color
                  )}>
                    <div className="text-white text-xs">
                      {cmd.icon}
                    </div>
                  </div>
                  {cmd.command}
                </Button>
              ))}
            </div>

            {/* Status Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">AI Core Status</span>
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-green-400">Operational</div>
                <div className="text-xs text-gray-500 mt-1">Response time: 12ms</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Neural Network</span>
                  <Cpu className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="text-2xl font-bold text-cyan-400">Connected</div>
                <div className="text-xs text-gray-500 mt-1">Accuracy: 98.7%</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Blockchain Sync</span>
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-400">Synced</div>
                <div className="text-xs text-gray-500 mt-1">Block: 18,234,567</div>
              </div>
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
  )
}