import { NextResponse } from 'next/server'
import { parseWorkoutTextWithGemini } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text prompt is required' }, { status: 400 })
    }

    const items = await parseWorkoutTextWithGemini(text)
    return NextResponse.json({ items })
  } catch (error) {
    console.error('API Parse Error:', error)
    return NextResponse.json({ error: 'Parsing failed' }, { status: 500 })
  }
}
