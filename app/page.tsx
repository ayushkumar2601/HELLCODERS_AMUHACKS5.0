'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Menu,
  X,
  BookOpen,
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Globe,
  BarChart3,
  Target
} from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">GROW-DEX</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Features</Link>
              <Link href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Intelligence</Link>
              <Link href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Institutions</Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="font-bold text-slate-700 hover:bg-slate-100/50 rounded-xl px-6">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-black px-8 h-12 shadow-xl shadow-slate-900/10">
                  Begin Journey
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-secondary/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-primary/10 text-primary border-none font-black tracking-[0.2em] mb-6 px-4 py-1.5 uppercase text-[10px]">
                AI-Driven Academic Excellence
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
                The Intelligence Layer for <span className="text-primary italic">Student Success</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transform institutional performance with personalized study protocols, predictive career roadmaps, and deep academic AI insights.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/signup">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-black px-10 h-14 rounded-2xl text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                    Start Now <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full sm:w-auto bg-white/50 backdrop-blur rounded-2xl font-black px-10 h-14 text-lg border-2 border-slate-200 hover:bg-white transition-all">
                    Login
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 grayscale opacity-50 group border-t border-slate-100 pt-8 mt-16 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">2.4k+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Students</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">92%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Success Rate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">12+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Institutions</span>
                </div>
              </div>
            </div>

            {/* Premium Illustration */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <Card className="glass-card rounded-[2.5rem] p-10 border-white/40 shadow-2xl relative z-10 overflow-hidden transform group-hover:translate-y-[-10px] transition-transform duration-700">
                <div className="absolute top-0 right-0 p-8">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div className="space-y-10">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-black text-xl">Real-time Optimization</p>
                      <p className="text-slate-500 font-medium text-sm">AI adjusting schedules in milliseconds</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center translate-x-12 opacity-80 scale-95 blur-[1px]">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-xl">Placement Prediction</p>
                      <p className="text-slate-500 font-medium text-sm">94% Accuracy on student outcomes</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-black text-xl">Global Benchmarking</p>
                      <p className="text-slate-500 font-medium text-sm">Measure against industry standards</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200`} />
                    ))}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">JOINED THIS WEEK</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Powering Modern Academia</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale invert">
            {/* Mock Logos */}
            <div className="text-2xl font-black text-white italic">UNIVERSITY PRO</div>
            <div className="text-2xl font-black text-white">TECH ACADEMY</div>
            <div className="text-2xl font-black text-white tracking-widest underline">EDU-LINK</div>
            <div className="text-2xl font-black text-white italic">INSTITUTE-X</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">Revolutionary Tools for the <span className="text-primary italic">New Age</span></h2>
            <p className="text-lg text-slate-600 font-medium">We've dismantled the traditional dashboard and replaced it with a dynamic, AI-driven experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Predictive GPA Modeling',
                desc: 'Get accurate forecasts of your final scores based on current study habits and engagement.',
                icon: BarChart3,
                color: 'text-primary'
              },
              {
                title: 'Burnout Counter-Measures',
                desc: 'Our AI monitors workload stress and automatically adjusts your schedule to prevent burnout.',
                icon: AlertCircle,
                color: 'text-secondary'
              },
              {
                title: 'Market-Ready Pathways',
                desc: 'Real-time job market analysis mapped to your current skills for instant career roadmaps.',
                icon: Target,
                color: 'text-orange-500'
              }
            ].map((f, i) => (
              <Card key={i} className="p-10 rounded-[2rem] border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${f.color}`}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{f.desc}</p>
                <Button variant="ghost" className="mt-6 p-0 font-black text-primary hover:bg-transparent">Explore Metric <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional CTA */}
      <section className="py-32 relative group">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[180px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[180px] opacity-20" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">Empower Your Institution with <span className="text-primary">Intelligence</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-12">Join forward-thinking universities using GROW-DEX to eliminate student attrition and maximize placement success.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-black hover:bg-slate-100 rounded-2xl font-black px-12 h-16 text-lg">Partner with Us</Button>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-2xl font-black px-12 h-16 text-lg">Platform Demo</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-black text-xl tracking-tighter">GROW-DEX</span>
              </Link>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                We are building the world's most advanced behavioral and academic intelligence engine to empower the next generation of success.
              </p>
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-8">Ecosystem</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary">Smart Planner</Link></li>
                <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary">Study Protocol</Link></li>
                <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary">Market Bridge</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-8">Support</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary">Help Center</Link></li>
                <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary">API v2 docs</Link></li>
                <li><Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary">Safety Council</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">&copy; 2024 GROW-DEX Intelligence. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900">Privacy</Link>
              <Link href="#" className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900">Ethics</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
