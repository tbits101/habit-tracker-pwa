import { CheckCircle2, Circle, Plus, BarChart3, Target, Calendar } from 'lucide-react'

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
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-muted-foreground">
            Let's build some great habits today. You're on a 5-day streak!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 text-center border">
            <div className="text-2xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center border">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Completion</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center border">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Total Habits</div>
          </div>
        </div>

        {/* Today's Habits */}
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">Today's Habits</h3>
            <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Habit</span>
            </button>
          </div>

          {/* Sample Habits */}
          <div className="space-y-3">
            {[
              { name: 'Morning Meditation', time: '7:00 AM', completed: true },
              { name: 'Read for 30 minutes', time: '8:00 PM', completed: true },
              { name: 'Exercise', time: '6:00 AM', completed: false },
              { name: 'Drink 8 glasses of water', time: 'All day', completed: false },
              { name: 'Journal before bed', time: '10:00 PM', completed: false },
            ].map((habit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    {habit.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <div>
                    <div className="font-medium text-foreground">{habit.name}</div>
                    <div className="text-sm text-muted-foreground">{habit.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {habit.completed && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Done
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State for when no habits exist */}
          <div className="mt-8 text-center py-8 border-2 border-dashed border-muted rounded-lg">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No habits yet</h4>
            <p className="text-muted-foreground mb-4">
              Start building better habits by adding your first one above.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Create Your First Habit
            </button>
          </div>
        </div>
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
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Add</span>
          </button>
        </div>
      </nav>
    </div>
  )
}