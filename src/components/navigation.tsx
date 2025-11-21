'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Menu,
  X,
  TrendingUp,
  Brain,
  Home
} from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'AI Trading', href: '/beta-features/ai-trading', icon: TrendingUp },
    { name: 'Beta Features', href: '/beta-features', icon: Brain },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-500" />
            <span className="text-xl font-bold text-white">Z.ai Trading</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-300 hover:text-white transition-colors mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}