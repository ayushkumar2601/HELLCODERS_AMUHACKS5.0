'use client'

import Link from 'next/link'
import { Brain, TrendingUp, AlertCircle, Target, BarChart3, Zap, ShieldCheck, Globe, ChevronRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BrutalButton, BrutalCard, BrutalBadge } from '@/components/brutal'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brutal text-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-black uppercase">GROW-DEX</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-bold text-black hover:text-brutal-accent transition-colors uppercase tracking-wide">Features</Link>
              <Link href="#intelligence" className="text-sm font-bold text-black hover:text-brutal-accent transition-colors uppercase tracking-wide">Intelligence</Link>
              <Link href="#institutions" className="text-sm font-bold text-black hover:text-brutal-accent transition-colors uppercase tracking-wide">Institutions</Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <BrutalButton variant="default">
                  Login
                </BrutalButton>
              </Link>
              <Link href="/signup">
                <BrutalButton variant="primary">
                  Begin Journey
                </BrutalButton>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <BrutalBadge variant="accent" className="mb-6">
                AI-DRIVEN ACADEMIC EXCELLENCE
              </BrutalBadge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.95] mb-8">
                THE INTELLIGENCE LAYER FOR STUDENT SUCCESS
              </h1>
              <p className="text-lg md:text-xl text-black font-medium mb-10 leading-relaxed">
                Transform institutional performance with personalized study protocols, predictive career roadmaps, and deep academic AI insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <BrutalButton variant="primary" className="w-full sm:w-auto px-10 py-4 text-lg">
                    START NOW <ChevronRight className="w-5 h-5 ml-2 inline" />
                  </BrutalButton>
                </Link>
                <Link href="/login">
                  <BrutalButton variant="default" className="w-full sm:w-auto px-10 py-4 text-lg">
                    LOGIN
                  </BrutalButton>
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-t-2 border-black pt-8">
                <div>
                  <div className="text-4xl font-black text-black">2.4K+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black opacity-70 mt-1">Students</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-black">92%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black opacity-70 mt-1">Success</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-black">12+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-black opacity-70 mt-1">Institutions</div>
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div>
              <BrutalCard className="p-10">
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-black border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-black font-black text-xl mb-1">REAL-TIME OPTIMIZATION</p>
                      <p className="text-black font-medium text-sm opacity-70">AI adjusting schedules in milliseconds</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-brutal-secondary border-2 border-black flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <p className="text-black font-black text-xl mb-1">PLACEMENT PREDICTION</p>
                      <p className="text-black font-medium text-sm opacity-70">94% accuracy on student outcomes</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-16 h-16 bg-brutal-accent border-2 border-black flex items-center justify-center flex-shrink-0">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-black font-black text-xl mb-1">GLOBAL BENCHMARKING</p>
                      <p className="text-black font-medium text-sm opacity-70">Measure against industry standards</p>
                    </div>
                  </div>
                </div>
              </BrutalCard>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="bg-black py-16 border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-black text-white uppercase tracking-[0.4em] mb-10 opacity-50">POWERING MODERN ACADEMIA</p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-2xl font-black text-white uppercase tracking-wider">UNIVERSITY PRO</div>
            <div className="text-2xl font-black text-white uppercase tracking-wider">TECH ACADEMY</div>
            <div className="text-2xl font-black text-white uppercase tracking-wider">EDU-LINK</div>
            <div className="text-2xl font-black text-white uppercase tracking-wider">INSTITUTE-X</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-brutal">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black mb-6 uppercase">
              REVOLUTIONARY TOOLS FOR THE <span className="bg-black text-white px-2">NEW AGE</span>
            </h2>
            <p className="text-lg text-black font-medium">We've dismantled the traditional dashboard and replaced it with a dynamic, AI-driven experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'PREDICTIVE GPA MODELING',
                desc: 'Get accurate forecasts of your final scores based on current study habits and engagement.',
                icon: BarChart3,
                color: 'bg-black'
              },
              {
                title: 'BURNOUT COUNTER-MEASURES',
                desc: 'Our AI monitors workload stress and automatically adjusts your schedule to prevent burnout.',
                icon: AlertCircle,
                color: 'bg-brutal-accent'
              },
              {
                title: 'MARKET-READY PATHWAYS',
                desc: 'Real-time job market analysis mapped to your current skills for instant career roadmaps.',
                icon: Target,
                color: 'bg-brutal-secondary'
              }
            ].map((f, i) => (
              <BrutalCard key={i} className="p-8">
                <div className={`w-16 h-16 ${f.color} border-2 border-black flex items-center justify-center mb-6`}>
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tight">{f.title}</h3>
                <p className="text-black font-medium leading-relaxed mb-6">{f.desc}</p>
                <button className="font-black text-black hover:text-brutal-accent uppercase text-sm tracking-wide flex items-center gap-2 transition-colors">
                  EXPLORE METRIC <ChevronRight className="w-4 h-4" />
                </button>
              </BrutalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section id="institutions" className="py-32 bg-brutal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-black border-4 border-black shadow-brutal-lg p-12 md:p-24 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight uppercase">
                EMPOWER YOUR INSTITUTION WITH <span className="bg-brutal-accent px-2">INTELLIGENCE</span>
              </h2>
              <p className="text-white text-lg md:text-xl font-medium mb-12 opacity-80">
                Join forward-thinking universities using GROW-DEX to eliminate student attrition and maximize placement success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <BrutalButton variant="default" className="px-12 py-4 text-lg">
                  PARTNER WITH US
                </BrutalButton>
                <BrutalButton variant="accent" className="px-12 py-4 text-lg">
                  PLATFORM DEMO
                </BrutalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase">GROW-DEX</span>
              </Link>
              <p className="text-black font-medium max-w-sm leading-relaxed">
                Building the world's most advanced behavioral and academic intelligence engine to empower the next generation of success.
              </p>
            </div>
            <div>
              <h4 className="font-black text-black uppercase tracking-widest text-xs mb-8">ECOSYSTEM</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold text-black hover:text-brutal-accent uppercase">Smart Planner</Link></li>
                <li><Link href="#" className="text-sm font-bold text-black hover:text-brutal-accent uppercase">Study Protocol</Link></li>
                <li><Link href="#" className="text-sm font-bold text-black hover:text-brutal-accent uppercase">Market Bridge</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-black uppercase tracking-widest text-xs mb-8">SUPPORT</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold text-black hover:text-brutal-accent uppercase">Help Center</Link></li>
                <li><Link href="#" className="text-sm font-bold text-black hover:text-brutal-accent uppercase">API v2 Docs</Link></li>
                <li><Link href="#" className="text-sm font-bold text-black hover:text-brutal-accent uppercase">Safety Council</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-black pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-black font-bold text-xs uppercase tracking-widest">&copy; 2024 GROW-DEX INTELLIGENCE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-black font-bold text-xs uppercase tracking-widest hover:text-brutal-accent">Privacy</Link>
              <Link href="#" className="text-black font-bold text-xs uppercase tracking-widest hover:text-brutal-accent">Ethics</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
