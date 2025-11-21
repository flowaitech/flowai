'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Terminal, 
  Send, 
  Command, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Cpu,
  Brain,
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

interface TerminalMessage {
  id: string
  type: 'user' | 'system' | 'success' | 'error' | 'info'
  content: string
  timestamp: Date
}

interface Command {
  command: string
  description: string
  category: string
}

export default function AITerminal() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<TerminalMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: Command[] = [
    { command: 'help', description: 'Show available commands', category: 'General' },
    { command: 'price', description: 'Get current $FLOW token price', category: 'Token' },
    { command: 'market', description: 'Display market statistics', category: 'Market' },
    { command: 'simulate', description: 'Run trading simulation', category: 'Trading' },
    { command: 'analyze', description: 'AI market analysis', category: 'Analysis' },
    { command: 'wallet', description: 'Check wallet status', category: 'Wallet' },
    { command: 'stake', description: 'View staking options', category: 'DeFi' },
    { command: 'predict', description: 'AI price prediction', category: 'AI' },
    { command: 'news', description: 'Latest market news', category: 'Info' },
    { command: 'clear', description: 'Clear terminal', category: 'General' }
  ]

  const commandResponses: Record<string, string[]> = {
    help: [
      'Available commands:',
      '',
      '📊 Market Commands:',
      '  price     - Get current $FLOW token price',
      '  market    - Display market statistics',
      '  analyze   - AI market analysis',
      '  predict   - AI price prediction',
      '',
      '💰 Trading Commands:',
      '  simulate  - Run trading simulation',
      '  stake     - View staking options',
      '',
      '🔐 Wallet Commands:',
      '  wallet    - Check wallet status',
      '',
      'ℹ️  General Commands:',
      '  help      - Show this help message',
      '  news      - Latest market news',
      '  clear     - Clear terminal',
      '',
      'Type any command to get started!'
    ],
    price: [
      '🔍 Fetching real-time price data...',
      '',
      '💎 $FLOW Token Information:',
      '┌─────────────────────────────────┐',
      '│ Current Price:    $0.000142     │',
      '│ 24h Change:       +12.5%        │',
      '│ Market Cap:       $95,000       │',
      '│ Liquidity:        $89,300       │',
      '│ 24h Volume:       $12,450       │',
      '└─────────────────────────────────┘',
      '',
      '📈 Price is trending upward with strong momentum'
    ],
    market: [
      '📊 Market Analysis Loading...',
      '',
      '🌍 Market Overview:',
      '• Total Supply: 1,000,000,000 $FLOW',
      '• Circulating: 847,000,000 $FLOW',
      '• Holders: 847 active wallets',
      '• Liquidity Pool: 94% of supply',
      '',
      '🔥 Top Holders:',
      '1. 0x742d...4Db45 - 125M $FLOW',
      '2. 0x1234...56789 - 89M $FLOW',
      '3. 0x9876...54321 - 67M $FLOW',
      '',
      '💹 Market Sentiment: BULLISH 🚀'
    ],
    simulate: [
      '🎯 Starting Trading Simulation...',
      '',
      '⚡ AI Trading Bot Initialized',
      '📊 Analyzing market conditions...',
      '',
      '🤖 Simulation Results:',
      '┌─────────────────────────────────┐',
      '│ Initial Capital:   $1,000       │',
      '│ Final Value:       $1,247       │',
      '│ Profit:            +24.7%       │',
      '│ Trades Executed:   47           │',
      '│ Win Rate:          68.1%        │',
      '└─────────────────────────────────┘',
      '',
      '✅ Simulation completed successfully!'
    ],
    analyze: [
      '🧠 AI Analysis Engine Starting...',
      '',
      '📈 Technical Indicators:',
      '• RSI (14): 65.4 - Neutral',
      '• MACD: Bullish crossover detected',
      '• Volume: Above average',
      '• Support: $0.000125',
      '• Resistance: $0.000150',
      '',
      '🎯 AI Prediction:',
      'Short-term: BULLISH (78% confidence)',
      'Medium-term: BULLISH (65% confidence)',
      '',
      '⚠️  Risk Level: MODERATE'
    ],
    wallet: [
      '🔐 Checking wallet connection...',
      '',
      '💼 Wallet Status:',
      '┌─────────────────────────────────┐',
      '│ Status:           CONNECTED     │',
      '│ Address:          0x742d...4Db45│',
      '│ Network:          Ethereum      │',
      '│ Balance:          1,234.56 ETH  │',
      '│ $FLOW Balance:    50,000        │',
      '└─────────────────────────────────┘',
      '',
      '✅ Wallet is ready for trading'
    ],
    stake: [
      '🌟 Staking Opportunities:',
      '',
      '💎 Available Pools:',
      '1. $FLOW-ETH Pool',
      '   • APY: 18.5%',
      '   • TVL: $2.3M',
      '   • Your stake: 0 $FLOW',
      '',
      '2. $FLOW-USDC Pool',
      '   • APY: 22.1%',
      '   • TVL: $1.8M',
      '   • Your stake: 0 $FLOW',
      '',
      '🎯 Best APY: $FLOW-USDC Pool'
    ],
    predict: [
      '🔮 AI Price Prediction Model:',
      '',
      '📊 Predictions for next 7 days:',
      '┌─────────────────────────────────┐',
      '│ Day 1:  $0.000145  (+2.1%)     │',
      '│ Day 3:  $0.000151  (+6.3%)     │',
      '│ Day 7:  $0.000162  (+14.1%)    │',
      '└─────────────────────────────────┘',
      '',
      '🎯 Confidence: 73%',
      '⚡ Model: Deep Learning v3.2',
      '',
      '💡 Tip: Consider dollar-cost averaging'
    ],
    news: [
      '📰 Latest Market News:',
      '',
      '🔥 Breaking:',
      '• $FLOW listed on major DEX',
      '• Liquidity pool reaches 94%',
      '• Community grows to 847 holders',
      '',
      '📈 Market Updates:',
      '• AI tokens trending upward',
      '• DeFi sector sees 15% growth',
      '• Ethereum gas fees stable',
      '',
      '🎯 Next milestone: 1,000 holders'
    ],
    clear: []
  }

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: TerminalMessage = {
      id: 'welcome',
      type: 'system',
      content: [
        '🚀 Welcome to FLOW AI Terminal v1.0',
        '',
        '🤖 AI-powered DeFi interface ready',
        '💡 Type "help" to see available commands',
        '⚡ All commands are processed by our AI',
        '',
        '🎯 Current Status: BETA TESTING',
        '📊 Market: ACTIVE',
        '🔐 Wallet: READY',
        ''
      ].join('\n'),
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const processCommand = async (command: string) => {
    setIsProcessing(true)
    
    // Add user message
    const userMessage: TerminalMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: `$ ${command}`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Get response
    const response = commandResponses[command.toLowerCase()] || [
      `❌ Unknown command: "${command}"`,
      '',
      '💡 Available commands:',
      ...commands.map(cmd => `  ${cmd.command} - ${cmd.description}`),
      '',
      'Type "help" for more information.'
    ]

    const responseMessage: TerminalMessage = {
      id: `response-${Date.now()}`,
      type: commandResponses[command.toLowerCase()] ? 'success' : 'error',
      content: response.join('\n'),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, responseMessage])
    setIsProcessing(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isProcessing) {
      processCommand(input.trim())
      setInput('')
    }
  }

  const clearTerminal = () => {
    setMessages([])
    setShowHelp(false)
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'user':
        return <ArrowRight className="w-4 h-4" />
      case 'system':
        return <Terminal className="w-4 h-4" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  return (
    <Card className={cn(
      "border-0",
      themeClasses.cardBg,
      themeClasses.shadow
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={cn("flex items-center gap-2", themeClasses.accent)}>
            <div className="relative">
              <Terminal className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            AI Terminal
            <Badge variant="outline" className="text-xs">
              <Brain className="w-3 h-3 mr-1" />
              BETA
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="text-xs"
            >
              <Command className="w-3 h-3 mr-1" />
              Commands
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearTerminal}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Help Panel */}
        {showHelp && (
          <div className={cn(
            "p-4 rounded-lg border",
            theme === 'light' ? "bg-blue-50 border-blue-200" :
            theme === 'dark' ? "bg-gray-800 border-gray-700" :
            "bg-purple-50 border-purple-200"
          )}>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Command className="w-4 h-4" />
              Available Commands
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {commands.map((cmd) => (
                <div key={cmd.command} className="flex items-start gap-2">
                  <Badge variant="outline" className="text-xs">
                    {cmd.command}
                  </Badge>
                  <span className="text-xs opacity-60">{cmd.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Output */}
        <div className={cn(
          "rounded-lg border p-4 font-mono text-sm",
          theme === 'light' ? "bg-gray-900 text-green-400 border-gray-700" :
          theme === 'dark' ? "bg-black text-green-400 border-gray-800" :
          "bg-gray-900 text-green-400 border-gray-700"
        )}>
          <ScrollArea 
            className="h-96 mb-4" 
            ref={scrollAreaRef}
          >
            <div className="space-y-2">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIconForType(message.type)}
                  </div>
                  <div className="flex-1 whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command..."
              className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-600"
              disabled={isProcessing}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isProcessing || !input.trim()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {['price', 'market', 'simulate', 'predict'].map((cmd) => (
            <Button
              key={cmd}
              variant="outline"
              size="sm"
              onClick={() => processCommand(cmd)}
              disabled={isProcessing}
              className="text-xs"
            >
              {cmd}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}