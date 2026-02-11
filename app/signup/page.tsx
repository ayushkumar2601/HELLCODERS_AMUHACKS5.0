'use client'

import React from "react"
import Link from 'next/link'
import { Brain, ArrowRight, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { signUp } from '@/lib/actions/auth.actions'
import { BrutalButton, BrutalCard, BrutalInput } from '@/components/brutal'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'Computer Science',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.name,
        department: formData.department,
      })

      if (result?.error) {
        setErrors({ general: result.error })
        setIsSubmitting(false)
      } else {
        // Show verification message on success
        setShowVerificationMessage(true)
        setIsSubmitting(false)
      }
    } catch (error: any) {
      // Check if it's a redirect (which is actually success)
      if (error?.message?.includes('NEXT_REDIRECT')) {
        setShowVerificationMessage(true)
        setIsSubmitting(false)
        return
      }
      console.error('Signup error:', error)
      setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' })
      setIsSubmitting(false)
    }
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
            {showVerificationMessage ? (
              // Verification Message
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-brutal-secondary border-2 border-black flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h1 className="text-3xl font-black mb-4 uppercase tracking-tight">CHECK YOUR EMAIL</h1>
                <p className="text-black font-medium mb-6 leading-relaxed">
                  We've sent a verification link to <span className="font-bold">{formData.email}</span>
                </p>
                <div className="bg-brutal border-2 border-black p-6 mb-6 text-left">
                  <p className="text-sm font-bold text-black mb-3 uppercase tracking-wide">NEXT STEPS:</p>
                  <ol className="space-y-2 text-sm font-medium text-black">
                    <li className="flex gap-2">
                      <span className="font-black">1.</span>
                      <span>Open your email inbox</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-black">2.</span>
                      <span>Click the verification link we sent you</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-black">3.</span>
                      <span>Return here and log in to your account</span>
                    </li>
                  </ol>
                </div>
                <p className="text-xs text-black font-medium mb-6 opacity-70">
                  Didn't receive the email? Check your spam folder or contact support.
                </p>
                <Link href="/login">
                  <BrutalButton variant="primary" className="w-full py-4">
                    GO TO LOGIN
                  </BrutalButton>
                </Link>
              </div>
            ) : (
              // Signup Form
              <>
                <h1 className="text-4xl font-black mb-2 uppercase tracking-tight">CREATE ACCOUNT</h1>
                <p className="text-black font-medium mb-2 opacity-70">
                  Join GROW-DEX and transform your academic journey
                </p>
                <div className="bg-brutal-secondary border-2 border-black p-3 mb-6">
                  <p className="text-xs font-bold text-black uppercase tracking-wide flex items-center gap-2">
                    <span className="text-lg">📧</span> EMAIL VERIFICATION REQUIRED
                  </p>
                  <p className="text-xs text-black font-medium mt-1">
                    You'll need to verify your email before logging in
                  </p>
                </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-white border-2 border-brutal-accent flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-brutal-accent flex-shrink-0" />
                <span className="text-sm font-medium text-black">{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <BrutalInput
                type="text"
                placeholder="Your full name"
                name="name"
                label="FULL NAME"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              {/* Email Input */}
              <BrutalInput
                type="email"
                placeholder="your@email.com"
                name="email"
                label="EMAIL ADDRESS"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              {/* Department Selection */}
              <div>
                <label className="brutal-label block mb-2 text-black">DEPARTMENT</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="brutal-input w-full font-medium"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics & Communication</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Electrical">Electrical Engineering</option>
                </select>
              </div>

              {/* Password Input */}
              <div>
                <label className="brutal-label block mb-2 text-black">PASSWORD</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`brutal-input w-full ${errors.password ? 'border-brutal-accent' : ''}`}
                />
                {errors.password ? (
                  <p className="text-brutal-accent text-sm font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.password}
                  </p>
                ) : (
                  <p className="text-xs text-black font-medium mt-2 opacity-70">At least 8 characters</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="brutal-label block mb-2 text-black">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`brutal-input w-full ${errors.confirmPassword ? 'border-brutal-accent' : ''}`}
                />
                {errors.confirmPassword && (
                  <p className="text-brutal-accent text-sm font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <BrutalButton 
                type="submit" 
                disabled={isSubmitting}
                variant="primary"
                className="w-full py-4 disabled:opacity-50"
              >
                {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2 inline" />}
              </BrutalButton>

              {/* Login Link */}
              <p className="text-center text-sm font-medium text-black">
                Already have an account?{' '}
                <Link href="/login" className="text-brutal-accent hover:text-black font-bold uppercase">
                  Sign in
                </Link>
              </p>
            </form>

            {/* Terms */}
            <div className="mt-8 pt-8 border-t-2 border-black">
              <p className="text-xs text-black font-medium text-center opacity-70">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
              </>
            )}
          </BrutalCard>

          {/* Benefits Section - Only show when form is visible */}
          {!showVerificationMessage && (
            <div className="mt-8 space-y-4">
            {[
              { title: 'AI-POWERED STUDY PLANS', desc: 'Personalized schedules for maximum efficiency' },
              { title: 'CAREER GUIDANCE', desc: 'Real-time placement readiness tracking' },
              { title: 'WELLNESS SUPPORT', desc: 'Stress tracking and burnout prevention' }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-brutal-secondary border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-black text-black">✓</span>
                </div>
                <div>
                  <p className="font-black text-sm text-black uppercase tracking-tight">{benefit.title}</p>
                  <p className="text-xs text-black font-medium opacity-70">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
