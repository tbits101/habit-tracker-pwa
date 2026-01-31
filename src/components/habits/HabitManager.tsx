'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Target, Calendar, BarChart3, Settings } from 'lucide-react'

// Simple dialog components for now
function SimpleDialog({ children, open, onOpenChange, title }: { 
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onOpenChange(false)}
          >
            ×
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

interface Habit {
  id: string
  title: string
  description: string
  icon: string
  color: string
  category: string
  frequency: string
  targetCount?: number
  unit?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export function HabitManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    icon: '✨',
    color: '#6366f1',
    category: 'General',
    frequency: 'DAILY',
    targetCount: 1,
    unit: 'session'
  })

  const queryClient = useQueryClient()

  const { data: habits, isLoading, error } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const response = await fetch('/api/habits')
      if (!response.ok) {
        throw new Error('Failed to fetch habits')
      }
      return response.json() as Promise<Habit[]>
    }
  })

  const createHabitMutation = useMutation({
    mutationFn: async (habitData: typeof newHabit) => {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData)
      })
      if (!response.ok) {
        throw new Error('Failed to create habit')
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
      setIsCreateDialogOpen(false)
      setNewHabit({
        title: '',
        description: '',
        icon: '✨',
        color: '#6366f1',
        category: 'General',
        frequency: 'DAILY',
        targetCount: 1,
        unit: 'session'
      })
    }
  })

  const handleCreateHabit = () => {
    if (newHabit.title.trim()) {
      createHabitMutation.mutate(newHabit)
    }
  }

  const habitIcons = ['🧘', '📚', '💪', '🏃', '🎯', '💧', '✍️', '🎨', '🎵', '🌱']
  const habitCategories = ['Mindfulness', 'Learning', 'Health', 'Fitness', 'Productivity', 'Hydration', 'Journaling', 'Creative', 'Music', 'Self-Care']
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading habits. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Habits</h2>
          <p className="text-muted-foreground">
            {habits?.length || 0} habit{habits?.length !== 1 ? 's' : ''} active
          </p>
        </div>
        
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Habit
        </Button>
      </div>

      {/* Simple Dialog */}
      {isCreateDialogOpen && (
        <SimpleDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          title="Create New Habit"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Title</label>
              <Input
                placeholder="e.g., Morning Meditation"
                value={newHabit.title}
                onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-1">Description</label>
              <Input
                placeholder="e.g., Start the day with 10 minutes of mindfulness"
                value={newHabit.description}
                onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Icon</label>
                <select 
                  value={newHabit.icon}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  {habitIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Color</label>
                <select 
                  value={newHabit.color}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Category</label>
                <select 
                  value={newHabit.category}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  {habitCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Frequency</label>
                <select 
                  value={newHabit.frequency}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, frequency: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateHabit}
                disabled={createHabitMutation.isPending || !newHabit.title.trim()}
              >
                {createHabitMutation.isPending ? 'Creating...' : 'Create Habit'}
              </Button>
            </div>
          </div>
        </SimpleDialog>
      )}

      {/* Habits Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : habits && habits.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      ) : (
        <Card className="py-12">
          <CardContent className="text-center">
            <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
            <p className="text-muted-foreground mb-6">
              Start building better habits by creating your first one.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create Your First Habit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function HabitCard({ habit }: { habit: Habit }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="text-2xl p-2 rounded-lg"
              style={{ backgroundColor: habit.color + '20', color: habit.color }}
            >
              {habit.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{habit.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{habit.category}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {habit.description || 'No description provided'}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{habit.frequency}</span>
          </div>
          {habit.targetCount && (
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>{habit.targetCount} {habit.unit}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}