import { NextResponse } from 'next/server'
import { classifyExerciseWithGemini } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Exercise name is required' }, { status: 400 })
    }

    const muscle = await classifyExerciseWithGemini(name)
    return NextResponse.json({ muscle })
  } catch (error) {
    console.error('API Classify Error:', error)
    return NextResponse.json({ error: 'Classification failed' }, { status: 500 })
  }
}
