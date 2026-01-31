import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data since we don't have authentication set up yet
    const mockHabits = [
      {
        id: '1',
        title: 'Morning Meditation',
        description: 'Start the day with 10 minutes of mindfulness',
        icon: '🧘',
        color: '#6366f1',
        category: 'Mindfulness',
        frequency: 'DAILY',
        targetCount: 1,
        unit: 'session',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'demo-user'
      },
      {
        id: '2',
        title: 'Read for 30 minutes',
        description: 'Read something educational or inspiring',
        icon: '📚',
        color: '#10b981',
        category: 'Learning',
        frequency: 'DAILY',
        targetCount: 30,
        unit: 'minutes',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'demo-user'
      },
      {
        id: '3',
        title: 'Exercise',
        description: 'Get your body moving with some physical activity',
        icon: '💪',
        color: '#f59e0b',
        category: 'Health',
        frequency: 'DAILY',
        targetCount: 30,
        unit: 'minutes',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'demo-user'
      }
    ]

    return NextResponse.json(mockHabits)
  } catch (error) {
    console.error('Error fetching habits:', error)
    return NextResponse.json({ error: 'Failed to fetch habits' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, icon, color, category, frequency, targetCount, unit } = body

    // Validate required fields
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // For now, create a mock habit since we don't have authentication
    const newHabit = {
      id: Date.now().toString(),
      title,
      description: description || '',
      icon: icon || '✨',
      color: color || '#6366f1',
      category: category || 'General',
      frequency: frequency || 'DAILY',
      targetCount: targetCount || null,
      unit: unit || null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'demo-user'
    }

    return NextResponse.json(newHabit, { status: 201 })
  } catch (error) {
    console.error('Error creating habit:', error)
    return NextResponse.json({ error: 'Failed to create habit' }, { status: 500 })
  }
}