'use client'

import React from "react"
import Link from 'next/link'
import { Brain, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { BrutalButton, BrutalCard, BrutalInput } from '@/components/brutal'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return 'Email is required'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email'
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateEmail(email)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')

    // Simulate API call - replace with actual password reset logic
    setTimeout(() => {
      setEmailSent(true)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-brutal text-black flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-xl uppercase tracking-tighter">GROW-DEX</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <BrutalCard className="p-8">
            {emailSent ? (
              // Success Message
              <div className="text-center">
                <div className="w-16 h-16 bg-brutal-secondary border-2 border-black flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h1 className="text-3xl font-black mb-4 uppercase tracking-tight">CHECK YOUR EMAIL</h1>
                <p className="text-black font-medium mb-6 leading-relaxed">
                  We've sent password reset instructions to <span className="font-bold">{email}</span>
                </p>
                <div className="bg-brutal border-2 border-black p-4 mb-6 text-left">
                  <p className="text-xs font-bold text-black uppercase tracking-wide mb-2">NEXT STEPS:</p>
                  <ol className="space-y-2 text-sm font-medium text-black">
                    <li className="flex gap-2">
                      <span className="font-black">1.</span>
                      <span>Check your email inbox</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-black">2.</span>
                      <span>Click the password reset link</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-black">3.</span>
                      <span>Create a new password</span>
                    </li>
                  </ol>
                </div>
                <p className="text-xs text-black font-medium mb-6 opacity-70">
                  Didn't receive the email? Check your spam folder.
                </p>
                <Link href="/login">
                  <BrutalButton variant="primary" className="w-full py-4">
                    BACK TO LOGIN
                  </BrutalButton>
                </Link>
              </div>
            ) : (
              // Reset Form
              <>
                <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black hover:text-brutal-accent mb-6 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  BACK TO LOGIN
                </Link>
                
                <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">RESET PASSWORD</h1>
                <p className="text-black font-medium mb-8 opacity-70">
                  Enter your email and we'll send you instructions to reset your password
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-white border-2 border-brutal-accent flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-brutal-accent flex-shrink-0" />
                    <span className="text-sm font-medium text-black">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <BrutalInput
                    type="email"
                    placeholder="your@email.com"
                    name="email"
                    label="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                  />

                  <BrutalButton 
                    type="submit" 
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-full py-4 disabled:opacity-50"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND RESET LINK'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 inline" />}
                  </BrutalButton>
                </form>

                <div className="mt-8 pt-8 border-t-2 border-black">
                  <p className="text-center text-sm font-medium text-black">
                    Remember your password?{' '}
                    <Link href="/login" className="text-brutal-accent hover:text-black font-bold uppercase">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}
          </BrutalCard>
        </div>
      </div>
    </div>
  )
}
