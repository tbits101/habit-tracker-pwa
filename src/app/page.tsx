import { HabitManager } from '@/components/habits/HabitManager'
import { TrendingUp, Target, Calendar, Clock, Award } from 'lucide-react'
import { Target, BarChart3, Calendar, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Habit Tracker</h1>
            </div>
            <nav className="flex space-x-6">
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <Calendar className="h-4 w-4" />
                <span>Today</span>
              </button>
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <BarChart3 className="h-4 w-4" />
                <span>Stats</span>
              </button>
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <TrendingUp className="h-4 w-4" />
                <span>Progress</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Let's build some great habits today. Track your progress and achieve your goals.
          </p>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center border border-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
            <div className="text-sm text-blue-700 font-medium">Day Streak</div>
            <div className="text-xs text-blue-600 mt-2">Keep it going!</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-center border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">0%</div>
            <div className="text-sm text-green-700 font-medium">Completion Rate</div>
            <div className="text-xs text-green-600 mt-2">This week</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center border border-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
            <div className="text-sm text-purple-700 font-medium">Active Habits</div>
            <div className="text-xs text-purple-600 mt-2">Currently tracking</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 text-center border border-orange-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <Award className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">0</div>
            <div className="text-sm text-orange-700 font-medium">Total Completed</div>
            <div className="text-xs text-orange-600 mt-2">All time</div>
          </div>
        </div>

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">🌟 Ready to build better habits?</h3>
              <p className="text-blue-100 mb-4">Small steps, big results. Start your journey today!</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-blue-100">
              <Clock className="h-4 w-4" />
              <span>Best time to start: Now</span>
            </div>
          </div>
        </div>

        {/* Habit Manager */}
        <HabitManager />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-4 py-2">
          <button className="flex flex-col items-center py-2 text-primary">
            <Target className="h-5 w-5" />
            <span className="text-xs mt-1">Habits</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Calendar</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Stats</span>
          </button>
          <button className="flex flex-col items-center py-2 text-muted-foreground">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Progress</span>
          </button>
        </div>
      </nav>
    </div>
  )
}