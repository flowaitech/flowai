'use client'

import React from 'react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function PrivacyPolicy() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  return (
    <div className={cn(
      "min-h-screen transition-all duration-300",
      themeClasses.bg
    )}>
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent",
            themeClasses.gradient
          )}>
            Privacy Policy
          </h1>
          
          <div className={cn(
            "prose prose-lg max-w-none",
            themeClasses.textSecondary
          )}>
            <div className={cn(
              "p-8 rounded-lg mb-8",
              themeClasses.cardBg,
              themeClasses.shadow
            )}>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                FLOW AI collects various types of information to provide and improve our services:
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Wallet addresses and transaction history</li>
                <li>Email address (when provided)</li>
                <li>Username and display name</li>
                <li>Profile information and preferences</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Usage Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Pages visited and time spent on platform</li>
                <li>Features used and interactions</li>
                <li>Trading simulation results</li>
                <li>Terminal commands and queries</li>
                <li>Device and browser information</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Technical Data</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>IP address and general location</li>
                <li>Cookies and similar technologies</li>
                <li>System performance and error logs</li>
                <li>API usage and response times</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Service Provision:</strong> To provide and maintain our AI-powered DeFi platform</li>
                <li><strong>Personalization:</strong> To customize your experience and provide relevant insights</li>
                <li><strong>Analytics:</strong> To understand usage patterns and improve our services</li>
                <li><strong>Security:</strong> To protect against fraud and ensure platform integrity</li>
                <li><strong>Communication:</strong> To send important updates and support messages</li>
                <li><strong>Research:</strong> To develop new features and improve AI models</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We may share your information under the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Third-Party Services</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Blockchain networks for transaction processing</li>
                <li>Analytics providers for usage insights</li>
                <li>Cloud infrastructure for data storage</li>
                <li>Customer support platforms</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>When required by law or legal process</li>
                <li>To protect our rights and property</li>
                <li>To prevent fraud or illegal activity</li>
                <li>In emergency situations for safety</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement multiple security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Strict authentication and authorization systems</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and penetration testing</li>
                <li><strong>Secure Infrastructure:</strong> Enterprise-grade cloud security</li>
                <li><strong>Monitoring:</strong> 24/7 threat detection and response</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">5. Your Rights and Choices</h2>
              <p className="mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request removal of your personal data</li>
                <li><strong>Portability:</strong> Transfer your data to another service</li>
                <li><strong>Restriction:</strong> Limit how we use your information</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and features</li>
                <li>Improve website performance and functionality</li>
              </ul>
              <p className="mb-4">
                You can control cookies through your browser settings, but disabling 
                cookies may affect some features of our platform.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fulfill the purposes for which it was collected</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Fulfill legitimate business interests</li>
              </ul>
              <p className="mb-4">
                When data is no longer needed, we securely delete or anonymize it.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than 
                your own. We ensure appropriate safeguards are in place to protect 
                your data in accordance with applicable data protection laws.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="mb-4">
                Our services are not intended for individuals under 18 years of age. 
                We do not knowingly collect personal information from children. If we 
                become aware of such collection, we will take immediate steps to delete it.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify 
                you of any material changes by posting the new policy on our website 
                and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <p className="mb-4">
                If you have questions or concerns about this privacy policy or our 
                data practices, please contact us:
              </p>
              <div className={cn(
                "p-4 rounded-lg",
                theme === 'light' ? "bg-gray-100" :
                theme === 'dark' ? "bg-gray-800" :
                "bg-gray-100"
              )}>
                <p><strong>Email:</strong> support@flow-ai.fun</p>
                <p><strong>Telegram:</strong> t.me/flowaiportal</p>
                <p><strong>Twitter:</strong> @flowaifun</p>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <strong>Data Protection Officer:</strong> support@flow-ai.fun<br/>
                  <strong>Response Time:</strong> Within 30 days for data requests<br/>
                  <strong>Appeals Process:</strong> Available for unresolved complaints
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm">
                  <strong>Last Updated:</strong> November 2025<br/>
                  This privacy policy is effective as of the date last updated 
                  and applies to all users of FLOW AI services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}