'use client'

import { StudentSidebar } from '@/components/student-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  BookOpen,
  X,
  Target,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { updateAIMetrics } from '@/lib/actions/ai.actions'
import { useRouter } from 'next/navigation'

interface StudentDashboardClientProps {
  user: any
  dashboardData: any
}

export default function StudentDashboardClient({ user, dashboardData }: StudentDashboardClientProps) {
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculationMessage, setCalculationMessage] = useState('')

  // Fix hydration mismatch by only showing welcome after mount
  useEffect(() => {
    setMounted(true)
    setShowWelcome(true)
  }, [])

  const { student, prediction, subjectScores, upcomingTasks } = dashboardData

  const handleCalculateMetrics = async () => {
    setIsCalculating(true)
    setCalculationMessage('Analyzing your data with AI...')
    
    try {
      const result = await updateAIMetrics(user.user.id)
      
      if (result.error) {
        setCalculationMessage('Error: ' + result.error)
      } else {
        setCalculationMessage('✓ Metrics updated successfully!')
        setTimeout(() => {
          router.refresh()
          setCalculationMessage('')
        }, 2000)
      }
    } catch (error) {
      setCalculationMessage('Error calculating metrics')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StudentSidebar />

      <main className="lg:pl-64 pt-16 min-h-screen relative overflow-hidden">
        {/* Background Depth Elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative z-10">
          {/* Welcome Alert */}
          {showWelcome && (
            <div className="mb-8 p-6 glass-card rounded-2xl flex items-center justify-between border-primary/20 bg-primary/5 group relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-black text-slate-900 tracking-tight">Welcome back, {user.profile?.full_name || user.user.email}!</p>
                  <p className="text-sm text-slate-600 font-medium tracking-tight">Keep up the great work this semester!</p>
                </div>
              </div>
              <button onClick={() => setShowWelcome(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          )}

          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-secondary font-black text-xs uppercase tracking-[0.3em] mb-3">Student Growth Portal</p>
              <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Personal Growth Dashboard</h1>
              <p className="text-muted-foreground font-medium">Tracking Semester {student.semester || 1} • {student.department || 'Computer Science'}</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="rounded-xl border-2 font-bold px-6 h-12 hover:bg-white transition-all"
                onClick={() => window.location.href = '/dashboard/student/settings'}
              >
                Edit Profile
              </Button>
              <Button 
                className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 shadow-lg shadow-primary/25 hover:scale-105 transition-all flex items-center gap-2"
                onClick={handleCalculateMetrics}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Calculate AI Metrics
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Calculation Message */}
          {calculationMessage && (
            <div className={`mb-6 p-4 rounded-xl border ${
              calculationMessage.includes('Error') 
                ? 'bg-red-50 border-red-200 text-red-800' 
                : calculationMessage.includes('✓')
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              {calculationMessage}
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Current GPA', value: (student.gpa || 0).toFixed(2), icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10', trend: 'This semester' },
              { label: 'Career Ready', value: (student.career_score || 0) + '%', icon: Target, color: 'text-secondary', bg: 'bg-secondary/10', trend: prediction ? `${prediction.placement_probability}% placement` : 'Calculating...' },
              { label: 'Stress Index', value: (student.stress_index || 0) + '%', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-500/10', trend: (student.stress_index || 0) > 70 ? 'High' : 'Moderate' },
              { label: 'Study Streak', value: (student.study_streak || 0) + ' Days', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10', trend: 'Keep it up!' },
            ].map((stat, i) => (
              <Card key={i} className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-white/50 text-[10px] font-black py-0.5 border-none">LIVE</Badge>
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 mb-2">{stat.value}</p>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">
                  {stat.trend}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Analysis */}
              <Card className="glass-card p-8">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" /> Skill Mastery Timeline
                  </h2>
                  <Button variant="ghost" size="sm" className="font-bold text-primary">All Subjects</Button>
                </div>
                <div className="space-y-8">
                  {subjectScores.length > 0 ? (
                    subjectScores.slice(0, 4).map((item: any, i: number) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{item.subject}</p>
                            <Badge variant="outline" className="text-[10px] font-bold border-muted-foreground/30 text-muted-foreground">{item.status}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-xl text-slate-900">{item.score}%</p>
                          </div>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                          <div
                            className={`h-full transition-all duration-1000 group-hover:brightness-110 ${
                              item.score >= 90 ? 'bg-primary' : item.score >= 75 ? 'bg-secondary' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No subject scores available yet</p>
                  )}
                </div>
              </Card>

              {/* Deadlines Section */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-card p-8">
                  <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-destructive" /> Crucial Deadlines
                  </h2>
                  <div className="space-y-4">
                    {upcomingTasks.length > 0 ? (
                      upcomingTasks.slice(0, 2).map((task: any) => {
                        const daysLeft = Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        return (
                          <div key={task.id} className="p-4 rounded-2xl bg-white border border-border group hover:border-primary/50 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-sm text-slate-800">{task.title}</h4>
                              <Badge className={`text-[9px] font-black uppercase ${task.priority === 'high' ? 'bg-red-500' : 'bg-primary'}`}>
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium italic">
                              <Calendar className="w-3 h-3" /> {daysLeft > 0 ? `In ${daysLeft} days` : 'Today'}
                            </p>
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-muted-foreground text-sm">No upcoming deadlines</p>
                    )}
                  </div>
                  <Button variant="ghost" className="w-full mt-6 text-xs font-black text-primary hover:bg-primary/5">
                    OPEN CALENDAR <ChevronRight className="w-4 h-4" />
                  </Button>
                </Card>

                <Card className="glass-card p-8 bg-black border-slate-800">
                  <Sparkles className="w-8 h-8 text-secondary mb-4 animate-float" />
                  <h2 className="text-xl font-black text-white mb-2">AI Micro-Mentor</h2>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                    "Based on your current performance, focus on improving your weaker subjects to boost your overall GPA."
                  </p>
                  <Button className="w-full bg-white text-black hover:bg-slate-200 font-black rounded-xl h-12">Ask My Mentor</Button>
                </Card>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="glass-card p-8 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-black text-slate-900 mb-6">Portal Actions</h2>
                <div className="grid gap-3 relative z-10">
                  {[
                    { label: 'Weekly Study Plan', icon: BookOpen, href: '/dashboard/student/planner', primary: true },
                    { label: 'Career Pathway', icon: ArrowRight, href: '/dashboard/student/career', primary: false },
                    { label: 'Stress Management', icon: Zap, href: '/dashboard/student/wellness', primary: false },
                    { label: 'Skill Gap Analysis', icon: Target, href: '/dashboard/student/skills', primary: false },
                  ].map((action, i) => (
                    <Button
                      key={i}
                      variant={action.primary ? 'default' : 'outline'}
                      className={`w-full justify-between h-12 rounded-xl font-bold transition-all px-4 ${
                        action.primary ? 'shadow-lg shadow-primary/20' : 'hover:bg-white hover:border-primary/50'
                      }`}
                      onClick={() => window.location.href = action.href}
                    >
                      <span className="flex items-center gap-2">
                        <action.icon className="w-4 h-4" /> {action.label}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Recommended Progress */}
              <Card className="glass-card p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6 underline decoration-secondary decoration-4 underline-offset-8">
                  Growth Path
                </h2>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-slate-100">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                    <h4 className="text-sm font-bold text-slate-800">Improve GPA to {((student.gpa || 0) + 0.5).toFixed(1)}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Target for next semester</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-slate-100 opacity-50">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-200" />
                    <h4 className="text-sm font-bold text-slate-400">Industry Internship Phase 1</h4>
                    <p className="text-xs text-muted-foreground mt-1 text-slate-300">Targeting Mid-Summer 2024</p>
                  </div>
                  <Button className="w-full h-11 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold mt-4 shadow-xl shadow-slate-900/10">
                    Project Roadmap
                  </Button>
                </div>
              </Card>

              {/* Skills Summary */}
              <Card className="glass-card p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6">Top Proficiency</h2>
                <div className="flex flex-wrap gap-2">
                  {subjectScores.slice(0, 5).map((subject: any) => (
                    <Badge
                      key={subject.id}
                      variant="secondary"
                      className="px-4 py-1.5 rounded-xl bg-primary/5 text-primary border-primary/10 font-bold text-[10px] uppercase tracking-wider"
                    >
                      {subject.subject}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
