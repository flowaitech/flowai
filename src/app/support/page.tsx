'use client'

import React, { useState } from 'react'
import { 
  Mail, 
  Send, 
  MessageSquare, 
  User, 
  Phone,
  MapPin,
  Twitter,
  Github,
  MessageCircle,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

// Simple Button Component
const Button = ({ 
  children, 
  className = '', 
  disabled = false, 
  type = 'button', 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string; 
  disabled?: boolean; 
  type?: 'button' | 'submit'; 
  onClick?: () => void; 
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
      "h-10 py-2 px-4",
      className
    )}
  >
    {children}
  </button>
)

// Simple Input Component
const Input = ({ 
  className = '', 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange,
  id
}: { 
  className?: string; 
  type?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}) => (
  <input
    type={type}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={cn(
      "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
      className
    )}
  />
)

// Simple Textarea Component
const Textarea = ({ 
  className = '', 
  placeholder = '', 
  value, 
  onChange,
  id,
  rows = 4
}: { 
  className?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  rows?: number;
}) => (
  <textarea
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
      className
    )}
  />
)

// Simple Card Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100", className)}>
    {children}
  </div>
)

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
)

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
)

// Simple Badge Component
const Badge = ({ children, className = '', variant = 'default' }: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'; 
}) => (
  <div className={cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variant === 'default' && "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    variant === 'secondary' && "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
    className
  )}>
    {children}
  </div>
)

export default function SupportPage() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would normally send data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({ fullName: '', email: '', message: '' })
      setErrors({})
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@flow-ai.fun',
      href: 'mailto:support@flow-ai.fun'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@flowaifun',
      href: 'https://twitter.com/flowaifun'
    },
    {
      icon: MessageCircle,
      label: 'Telegram',
      value: '@flowaiportal',
      href: 'https://t.me/flowaiportal'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/flow-ai',
      href: 'https://github.com/flow-ai'
    }
  ]

  const faqItems = [
    {
      question: 'How do I get started with Flow AI?',
      answer: 'Check out our documentation for step-by-step guides and API references.'
    },
    {
      question: 'What blockchain networks are supported?',
      answer: 'Flow AI currently supports Ethereum, Polygon, BSC, and Avalanche networks.'
    },
    {
      question: 'Is there an API rate limit?',
      answer: 'Yes, free tier has 100 requests/hour. Pro plans offer unlimited requests.'
    },
    {
      question: 'How can I report a bug?',
      answer: 'Please use this contact form or create an issue on our GitHub repository.'
    }
  ]

  return (
    <section className={cn("min-h-screen", themeClasses.bg, "text-gray-200 pt-24 pb-20 px-6 md:px-12")}>
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={cn("text-5xl md:text-6xl font-bold bg-gradient-to-r", themeClasses.gradient, "text-transparent bg-clip-text")}>
            Support Center
          </h1>
          <p className={cn(themeClasses.textSecondary, "text-lg md:text-xl max-w-3xl mx-auto")}>
            Get in touch with our team. We're here to help you succeed with Flow AI.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              <MessageSquare className="w-3 h-3 mr-1" /> 24/7 Support
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <CheckCircle className="w-3 h-3 mr-1" /> Quick Response
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-2xl font-semibold flex items-center gap-2", themeClasses.accent)}>
                  <Send className="w-6 h-6" /> Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className={cn("text-sm font-medium flex items-center gap-2", themeClasses.textSecondary)}>
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="John Doe"
                      className={cn(
                        errors.fullName ? "border-red-500" : ""
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className={cn("text-sm font-medium flex items-center gap-2", themeClasses.textSecondary)}>
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className={cn(
                        errors.email ? "border-red-500" : ""
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className={cn("text-sm font-medium flex items-center gap-2", themeClasses.textSecondary)}>
                      <MessageSquare className="w-4 h-4" />
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className={cn(
                        errors.message ? "border-red-500" : ""
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Status Messages */}
                  {submitStatus === 'success' && (
                    <div className={cn(
                      "p-4 rounded-lg flex items-center gap-3",
                      theme === 'dark' ? "bg-green-900/20 border border-green-500/30" : "bg-green-100 border border-green-300"
                    )}>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-400">Message sent successfully!</p>
                        <p className={cn("text-sm", themeClasses.textSecondary)}>We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className={cn(
                      "p-4 rounded-lg flex items-center gap-3",
                      theme === 'dark' ? "bg-red-900/20 border border-red-500/30" : "bg-red-100 border border-red-300"
                    )}>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-400">Something went wrong</p>
                        <p className={cn("text-sm", themeClasses.textSecondary)}>Please try again or contact us directly.</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-3 text-lg font-medium transition-all duration-300",
                      theme === 'light' ? "bg-blue-600 hover:bg-blue-700 text-white" : 
                      theme === 'dark' ? "bg-green-600 hover:bg-green-700 text-white" :
                      "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-xl font-semibold", themeClasses.accent)}>
                  Other Ways to Reach Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={index}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : '_self'}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-105",
                        theme === 'dark' ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        themeClasses.accentBg
                      )}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{info.label}</p>
                        <p className={cn("text-sm", themeClasses.textSecondary)}>{info.value}</p>
                      </div>
                    </a>
                  )
                })}
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-xl font-semibold", themeClasses.accent)}>
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className={cn("text-sm", themeClasses.textSecondary)}>{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className={cn("p-6 rounded-2xl", themeClasses.cardBg, themeClasses.shadow)}>
              <CardHeader>
                <CardTitle className={cn("text-xl font-semibold flex items-center gap-2", themeClasses.accent)}>
                  <Globe className="w-5 h-5" /> Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className={cn(themeClasses.textSecondary)}>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className={cn(themeClasses.textSecondary)}>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className={cn(themeClasses.textSecondary)}>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className={cn(
                  "mt-4 p-3 rounded-lg text-center text-sm",
                  theme === 'dark' ? "bg-blue-900/20" : "bg-blue-100"
                )}>
                  <p className="text-blue-400">Emergency support available 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}