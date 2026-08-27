import { NextResponse } from 'next/server'
import { getRoutineAiCoaching } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const { title, exercises } = await req.json()
    const result = await getRoutineAiCoaching(title || '오늘의 운동', exercises || [])
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Coach Error:', error)
    return NextResponse.json({ error: 'Coaching failed' }, { status: 500 })
  }
}
