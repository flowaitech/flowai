'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Code, 
  Terminal, 
  Zap, 
  Shield, 
  Network,
  ChevronRight,
  Copy,
  ExternalLink,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function DocumentationPage() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => (
    <div className="relative group">
      <pre className={cn(
        "p-4 rounded-lg overflow-x-auto text-sm font-mono",
        theme === 'dark' ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      )}>
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copyToClipboard(code)}
      >
        {copiedCode === code ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  )

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/ai/generate',
      description: 'Generate AI content based on prompt',
      example: '{\n  "prompt": "Explain DeFi in simple terms",\n  "model": "flow-ai-v1",\n  "max_tokens": 500\n}'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/blockchain/status',
      description: 'Get blockchain network status',
      example: '{\n  "network": "ethereum",\n  "block_number": 18543210,\n  "gas_price": "20 gwei"\n}'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/wallet/connect',
      description: 'Connect Web3 wallet',
      example: '{\n  "provider": "metamask",\n  "chain_id": 1\n}'
    }
  ]

  const quickStartSteps = [
    {
      title: "Install Dependencies",
      description: "Install required packages for Flow AI",
      code: "npm install @flow-ai/sdk ethers@5"
    },
    {
      title: "Initialize SDK",
      description: "Set up the Flow AI SDK in your project",
      code: "import { FlowAI } from '@flow-ai/sdk';\n\nconst flowAI = new FlowAI({\n  apiKey: 'your-api-key',\n  network: 'ethereum'\n});"
    },
    {
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to interact with blockchain",
      code: "await flowAI.connectWallet();\nconsole.log('Wallet connected:', flowAI.walletAddress);"
    },
    {
      title: "Make API Call",
      description: "Execute your first AI-powered blockchain operation",
      code: "const result = await flowAI.ai.generate({\n  prompt: 'Analyze this token contract',\n  context: '0x1234...abcd'\n});"
    }
  ]

  return (
    <section className={cn("min-h-screen", themeClasses.bg, "text-gray-200 pt-24 pb-20 px-6 md:px-12")}>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={cn("text-5xl md:text-6xl font-bold bg-gradient-to-r", themeClasses.gradient, "text-transparent bg-clip-text")}>
            Flow AI Documentation
          </h1>
          <p className={cn(themeClasses.textSecondary, "text-lg md:text-xl max-w-3xl mx-auto")}>
            Comprehensive guide to integrate, use, and deploy features of our Web3-powered AI platform. 
            Build the future of decentralized AI applications.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <BookOpen className="w-3 h-3 mr-1" /> v2.0.0
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Zap className="w-3 h-3 mr-1" /> Web3 Ready
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              <Shield className="w-3 h-3 mr-1" /> Enterprise Grade
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className={cn(
            "grid w-full grid-cols-4 mb-8",
            theme === 'dark' ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"
          )}>
            <TabsTrigger value="getting-started" className="flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Getting Started
            </TabsTrigger>
            <TabsTrigger value="api-reference" className="flex items-center gap-2">
              <Code className="w-4 h-4" /> API Reference
            </TabsTrigger>
            <TabsTrigger value="sdk" className="flex items-center gap-2">
              <Network className="w-4 h-4" /> SDK Guide
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Examples
            </TabsTrigger>
          </TabsList>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-6">
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-2xl font-semibold flex items-center gap-2", themeClasses.accent)}>
                  <Terminal className="w-6 h-6" /> Quick Start Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={cn(themeClasses.textSecondary)}>
                  Get up and running with Flow AI in minutes. Follow these steps to integrate AI capabilities into your Web3 applications.
                </p>
                
                {quickStartSteps.map((step, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        themeClasses.accentBg
                      )}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className={cn("text-sm", themeClasses.textSecondary)}>{step.description}</p>
                      </div>
                    </div>
                    <CodeBlock code={step.code} />
                  </div>
                ))}

                <div className={cn(
                  "p-4 rounded-lg border-l-4",
                  theme === 'dark' ? "bg-blue-900/20 border-blue-500" : "bg-blue-100 border-blue-600"
                )}>
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Use environment variables to store your API keys securely. 
                    Never commit sensitive credentials to version control.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api-reference" className="space-y-6">
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-2xl font-semibold flex items-center gap-2", themeClasses.accent)}>
                  <Code className="w-6 h-6" /> API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={cn(themeClasses.textSecondary)}>
                  Flow AI provides RESTful APIs for AI generation, blockchain interactions, and wallet management.
                </p>

                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className={cn(
                    "p-4 rounded-lg border",
                    theme === 'dark' ? "border-gray-800" : "border-gray-200"
                  )}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                          {endpoint.method}
                        </Badge>
                        <code className={cn("font-mono text-sm", themeClasses.accent)}>
                          {endpoint.endpoint}
                        </code>
                      </div>
                    </div>
                    <p className={cn("text-sm mb-3", themeClasses.textSecondary)}>
                      {endpoint.description}
                    </p>
                    <CodeBlock code={endpoint.example} language="json" />
                  </div>
                ))}

                <div className="text-center">
                  <Button variant="outline" className="flex items-center gap-2 mx-auto">
                    <ExternalLink className="w-4 h-4" />
                    View Full API Documentation
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SDK Guide Tab */}
          <TabsContent value="sdk" className="space-y-6">
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-2xl font-semibold flex items-center gap-2", themeClasses.accent)}>
                  <Network className="w-6 h-6" /> SDK Installation & Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={cn(themeClasses.textSecondary)}>
                  The Flow AI SDK provides a seamless way to integrate AI capabilities into your blockchain applications.
                </p>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Installation</h3>
                  <CodeBlock code="npm install @flow-ai/sdk" />
                  
                  <h3 className="text-lg font-semibold">Basic Usage</h3>
                  <CodeBlock code="import { FlowAI } from '@flow-ai/sdk';\n\n// Initialize the SDK\nconst flowAI = new FlowAI({\n  apiKey: process.env.FLOW_AI_API_KEY,\n  network: 'ethereum'\n});\n\n// Generate AI content\nconst response = await flowAI.ai.generate({\n  prompt: 'What is the future of DeFi?',\n  maxTokens: 1000\n});\n\nconsole.log(response.content);" language="javascript" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-2xl font-semibold flex items-center gap-2", themeClasses.accent)}>
                  <Zap className="w-6 h-6" /> Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={cn(themeClasses.textSecondary)}>
                  Practical examples to help you get started with Flow AI in real-world scenarios.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Token Analysis", desc: "Analyze token contracts with AI" },
                    { title: "Market Prediction", desc: "AI-powered market insights" },
                    { title: "Smart Contract Audit", desc: "Automated contract analysis" },
                    { title: "DeFi Dashboard", desc: "Build DeFi analytics dashboards" }
                  ].map((example, index) => (
                    <Card key={index} className={cn(
                      "p-4 cursor-pointer transition-all hover:scale-105",
                      theme === 'dark' ? "bg-gray-900/50 hover:bg-gray-900/70" : "bg-gray-50 hover:bg-gray-100"
                    )}>
                      <h4 className="font-semibold mb-1">{example.title}</h4>
                      <p className={cn("text-sm", themeClasses.textSecondary)}>{example.desc}</p>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-2xl font-semibold", themeClasses.accent)}>
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#" className={cn(
                "p-4 rounded-lg border transition-all hover:scale-105 block",
                theme === 'dark' ? "border-gray-800 hover:border-purple-500/50" : "border-gray-200 hover:border-purple-300"
              )}>
                <BookOpen className="w-6 h-6 mb-2 text-purple-400" />
                <h4 className="font-semibold mb-1">Tutorials</h4>
                <p className={cn("text-sm", themeClasses.textSecondary)}>Step-by-step guides</p>
              </a>
              <a 
                href="https://github.com/flow-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "p-4 rounded-lg border transition-all hover:scale-105 block",
                  theme === 'dark' ? "border-gray-800 hover:border-blue-500/50" : "border-gray-200 hover:border-blue-300"
                )}
              >
                <Code className="w-6 h-6 mb-2 text-blue-400" />
                <h4 className="font-semibold mb-1">GitHub</h4>
                <p className={cn("text-sm", themeClasses.textSecondary)}>View source code</p>
              </a>
              <a 
                href="/support" 
                className={cn(
                  "p-4 rounded-lg border transition-all hover:scale-105 block",
                  theme === 'dark' ? "border-gray-800 hover:border-green-500/50" : "border-gray-200 hover:border-green-300"
                )}
              >
                <Shield className="w-6 h-6 mb-2 text-green-400" />
                <h4 className="font-semibold mb-1">Support</h4>
                <p className={cn("text-sm", themeClasses.textSecondary)}>Get help from our team</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}