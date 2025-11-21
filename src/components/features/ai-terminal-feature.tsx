'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Terminal, Play, Copy, CheckCircle, AlertCircle, Zap, Code, Shield } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function AITerminalFeature() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [terminalCommand, setTerminalCommand] = useState('')
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: '🚀 FLOW AI Terminal v2.0.1 - Beta' },
    { type: 'system', text: '📡 Connected to AI Network' },
    { type: 'system', text: '💡 Type "help" to see available commands' },
    { type: 'output', text: '' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [copiedCommand, setCopiedCommand] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: {
      description: 'Show available commands',
      output: `📋 Available Commands:
  🔍 analyze     - Analyze market trends
  💰 price       - Get token prices
  📊 portfolio   - Show portfolio status
  🤖 predict     - AI price prediction
  🎯 simulate    - Trading simulation
  🔐 secure      - Security check
  📈 trends      - Market trends
  🚀 launch      - Launch new feature
  🔄 refresh     - Refresh data
  ❓ help        - Show this help`
    },
    analyze: {
      description: 'Analyze market trends',
      output: `🔍 Analyzing market data...
  📊 Current Trend: BULLISH 📈
  💹 Market Cap: $142,567
  📈 24h Volume: $23,456
  🔥 Hot Sectors: AI, DeFi, Gaming
  ⚡ Market Sentiment: POSITIVE (78%)`
    },
    price: {
      description: 'Get token prices',
      output: `💰 Current Prices:
  🟢 FLOW: $0.000142 (+12.5%)
  🔵 ETH: $3,456.78 (+2.3%)
  🟠 BTC: $67,890.12 (+1.8%)
  🟣 SOL: $156.78 (+5.6%)`
    },
    portfolio: {
      description: 'Show portfolio status',
      output: `📊 Portfolio Status:
  💎 Total Value: $12,456.78
  📈 Today's P&L: +$234.56 (+1.9%)
  🔥 Best Performer: FLOW (+12.5%)
  📊 Assets: 8 tokens
  🎯 Win Rate: 68.4%`
    },
    predict: {
      description: 'AI price prediction',
      output: `🤖 AI Prediction Engine:
  🎯 FLOW Prediction: BULLISH
  📊 Confidence: 78%
  🎯 Target Price: $0.000156
  ⏰ Timeframe: 7 days
  🔍 Factors: Volume, Sentiment, Tech Analysis`
    },
    simulate: {
      description: 'Trading simulation',
      output: `🎯 Trading Simulation:
  🚀 Starting simulation...
  📈 Entry: $0.000142
  🎯 Exit: $0.000156
  💰 Profit: +9.8%
  ⚡ Execution Time: 0.23s
  ✅ Status: SUCCESS`
    },
    secure: {
      description: 'Security check',
      output: `🔐 Security Analysis:
  ✅ Wallet Status: SECURE
  🛡️ Security Score: 94/100
  🔍 No threats detected
  🚨 No suspicious activities
  ✅ All connections encrypted`
    },
    trends: {
      description: 'Market trends',
      output: `📈 Market Trends:
  🔥 Trending: AI tokens, DeFi protocols
  📊 Market Sentiment: BULLISH
  💹 Fear & Greed: 72 (GREED)
  🚀 New Listings: 12 today
  📈 Volume: $2.3B (↑15%)`
    },
    launch: {
      description: 'Launch new feature',
      output: `🚀 Feature Launcher:
  ✅ Testing complete
  🚀 Launching new feature...
  💫 Feature: AI Trading Bot
  ⚡ Status: ACTIVE
  🎯 Ready to use!`
    },
    refresh: {
      description: 'Refresh data',
      output: `🔄 Refreshing data...
  ✅ Market data updated
  ✅ Portfolio synced
  ✅ AI models retrained
  ✅ Cache cleared
  🚀 System ready!`
    }
  }

  const quickCommands = [
    { cmd: 'help', icon: <Code className="w-3 h-3" />, color: 'bg-blue-500' },
    { cmd: 'price', icon: <Zap className="w-3 h-3" />, color: 'bg-green-500' },
    { cmd: 'analyze', icon: <Terminal className="w-3 h-3" />, color: 'bg-purple-500' },
    { cmd: 'predict', icon: <Shield className="w-3 h-3" />, color: 'bg-orange-500' },
    { cmd: 'simulate', icon: <Play className="w-3 h-3" />, color: 'bg-red-500' },
    { cmd: 'portfolio', icon: <AlertCircle className="w-3 h-3" />, color: 'bg-cyan-500' }
  ]

  const executeCommand = (command: string) => {
    if (!command.trim()) return

    const cmd = command.toLowerCase().trim()
    const newHistory = [
      ...terminalHistory,
      { type: 'input', text: `$ ${command}` }
    ]

    if (commands[cmd as keyof typeof commands]) {
      setIsTyping(true)
      setTimeout(() => {
        setTerminalHistory([
          ...newHistory,
          { type: 'output', text: commands[cmd as keyof typeof commands].output }
        ])
        setIsTyping(false)
      }, 800)
    } else {
      setTimeout(() => {
        setTerminalHistory([
          ...newHistory,
          { type: 'error', text: `❌ Command not found: ${command}. Type "help" for available commands.` }
        ])
        setIsTyping(false)
      }, 500)
    }

    setTerminalCommand('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(text)
    setTimeout(() => setCopiedCommand(''), 2000)
  }

  const clearTerminal = () => {
    setTerminalHistory([
      { type: 'system', text: '🚀 FLOW AI Terminal v2.0.1 - Beta' },
      { type: 'system', text: '📡 Connected to AI Network' },
      { type: 'system', text: '💡 Type "help" to see available commands' },
      { type: 'output', text: '' }
    ])
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  return (
    <div className="space-y-6">
      {/* Feature Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold", themeClasses.accent)}>AI Agent Terminal</h3>
            <p className={cn("text-sm opacity-60", themeClasses.textSecondary)}>
              Interactive command-line interface for trading simulation
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-blue-600 text-blue-600" : theme === 'dark' ? "border-green-600 text-green-600" : "border-purple-600 text-purple-600")}>
            50+ Commands
          </Badge>
          <Badge className={cn("text-xs", theme === 'light' ? "bg-blue-600 text-white" : theme === 'dark' ? "bg-green-600 text-white" : "bg-purple-600 text-white")}>
            BETA
          </Badge>
        </div>
      </div>

      {/* Terminal Interface */}
      <Card className={cn("border-0 overflow-hidden", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className={cn("text-lg", themeClasses.accent)}>Terminal Interface</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTerminal}
                className={cn("text-xs", themeClasses.textSecondary)}
              >
                Clear
              </Button>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className={cn(
            "rounded-lg p-4 font-mono text-sm overflow-hidden",
            theme === 'light' ? "bg-gray-900 text-green-400" : 
            theme === 'dark' ? "bg-black text-green-400" : 
            "bg-gray-900 text-green-400"
          )}>
            <div 
              ref={terminalRef}
              className="h-64 overflow-y-auto custom-scrollbar mb-3 space-y-1"
            >
              {terminalHistory.map((entry, index) => (
                <div key={index} className="flex items-start gap-2">
                  {entry.type === 'input' && (
                    <>
                      <span className="text-green-400">$</span>
                      <span className="text-white">{entry.text.substring(2)}</span>
                    </>
                  )}
                  {entry.type === 'system' && (
                    <span className="text-cyan-400">{entry.text}</span>
                  )}
                  {entry.type === 'output' && (
                    <span className="text-green-300 whitespace-pre-line">{entry.text}</span>
                  )}
                  {entry.type === 'error' && (
                    <span className="text-red-400">{entry.text}</span>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white">Processing...</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 border-t border-gray-700 pt-3">
              <span className="text-green-400">$</span>
              <input
                type="text"
                value={terminalCommand}
                onChange={(e) => setTerminalCommand(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    executeCommand(terminalCommand)
                  }
                }}
                placeholder="Type a command..."
                className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-600"
                disabled={isTyping}
              />
              <Button
                size="sm"
                onClick={() => executeCommand(terminalCommand)}
                disabled={isTyping || !terminalCommand.trim()}
                className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700"
              >
                <Play className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="mt-4">
            <p className={cn("text-xs font-medium mb-2", themeClasses.textSecondary)}>Quick Commands:</p>
            <div className="flex flex-wrap gap-2">
              {quickCommands.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => executeCommand(item.cmd)}
                  className={cn(
                    "text-xs px-3 py-1 hover:scale-105 transition-all duration-200",
                    theme === 'light' ? "hover:bg-blue-50 border-blue-200" :
                    theme === 'dark' ? "hover:bg-green-900/30 border-green-700" :
                    "hover:bg-purple-50 border-purple-200"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full flex items-center justify-center mr-1", item.color)}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  {item.cmd}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(item.cmd)
                    }}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    {copiedCommand === item.cmd ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-60" />
                    )}
                  </Button>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Lightning Fast</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Execute commands in milliseconds with real-time AI processing
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Secure</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              End-to-end encryption and advanced security protocols
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Smart Commands</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              AI-powered command suggestions and auto-completion
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}