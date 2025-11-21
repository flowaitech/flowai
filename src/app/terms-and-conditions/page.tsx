'use client'

import React from 'react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function TermsAndConditions() {
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
            Terms and Conditions
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
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using the FLOW AI platform, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, you may not access or use our services.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
              <p className="mb-4">
                FLOW AI provides an AI-powered DeFi ecosystem that includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>AI Agent Terminal for trading simulation</li>
                <li>DeFi analytics and insights</li>
                <li>Multi-chain wallet integration</li>
                <li>Real-time market data and predictions</li>
                <li>Educational resources and tutorials</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <p className="mb-4">
                As a user of FLOW AI, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform for lawful purposes only</li>
                <li>Not attempt to exploit or harm the system</li>
                <li>Respect the rights of other users</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">4. Risk Disclaimer</h2>
              <p className="mb-4">
                Cryptocurrency trading and DeFi activities involve significant risk. 
                You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>All trading decisions are your sole responsibility</li>
                <li>Past performance does not guarantee future results</li>
                <li>Market volatility can result in substantial losses</li>
                <li>AI predictions are not investment advice</li>
                <li>You should only invest what you can afford to lose</li>
              </ul>
              
              <h2 className="text-2xl font-bold mb-4">5. Privacy and Data</h2>
              <p className="mb-4">
                We are committed to protecting your privacy. Our data collection and 
                usage practices are detailed in our Privacy Policy. By using our service, 
                you consent to the collection and use of your data as described therein.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All content, features, and functionality of the FLOW AI platform are 
                owned by FLOW AI and are protected by copyright, trademark, and 
                other intellectual property laws. You may not use our intellectual property 
                without our prior written consent.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">7. Service Availability</h2>
              <p className="mb-4">
                We strive to maintain high service availability but do not guarantee 
                uninterrupted access. We may suspend or terminate services for maintenance, 
                updates, or other operational reasons without prior notice.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, FLOW AI shall not be liable 
                for any indirect, incidental, special, or consequential damages arising 
                from your use of our services, including but not limited to loss of 
                profits, data, or other intangible losses.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless FLOW AI from any claims, 
                damages, or expenses arising from your use of the platform or violation 
                of these terms.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">10. Term and Termination</h2>
              <p className="mb-4">
                These terms remain in effect as long as you use our services. 
                We may terminate or suspend your account at any time, with or without 
                cause, without prior notice.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. 
                Changes will be effective immediately upon posting. Your continued 
                use of the service constitutes acceptance of any modified terms.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance with 
                the laws of the jurisdiction in which FLOW AI operates, without 
                regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, 
                please contact us at:
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
              
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm">
                  <strong>Last Updated:</strong> November 2025<br/>
                  These terms are effective as of the date last updated and 
                  remain in effect until modified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}