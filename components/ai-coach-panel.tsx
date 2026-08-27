'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import {
  createEmptySet,
  uid,
  type Exercise,
  type MuscleGroup,
  type WorkoutDay,
} from '@/lib/workout-data'
import { cn } from '@/lib/utils'

type AiCoachPanelProps = {
  day: WorkoutDay
  onAddExercise: (exercise: Exercise) => void
}

export function AiCoachPanel({ day, onAddExercise }: AiCoachPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleGetCoaching() {
    if (day.exercises.length === 0 || (day.exercises.length === 1 && !day.exercises[0].name)) {
      setError('루틴에 최소 1개 이상의 운동을 기록한 후 AI 코칭을 받아보세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: day.title,
          exercises: day.exercises.map((ex) => ({
            name: ex.name,
            muscle: ex.muscle,
            setsCount: ex.sets.length,
            sets: ex.sets,
          })),
        }),
      })

      if (!res.ok) {
        throw new Error('AI 코칭 응답에 실패했습니다.')
      }

      const data = await res.json()
      setFeedback(data.feedback || '코칭 분석을 생성할 수 없습니다.')
    } catch (err: any) {
      console.error(err)
      setError('AI 코칭 분석 중 문제가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleAddQuickExercise(name: string, muscle: MuscleGroup | null = null) {
    const newEx: Exercise = {
      id: uid('ex'),
      name,
      muscle,
      sets: [
        { id: uid('set'), weight: '20', reps: '12' },
        { id: uid('set'), weight: '25', reps: '10' },
        { id: uid('set'), weight: '25', reps: '10' },
      ],
      isManualTagged: false,
    }
    onAddExercise(newEx)
  }

  return (
    <div className="mt-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3 transition-all">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (!isOpen && !feedback) {
              handleGetCoaching()
            }
            setIsOpen((prev) => !prev)
          }}
          className="flex items-center gap-2 text-left"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs">
            <Bot className="size-3.5" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Gemini 1:1 AI 루틴 코칭 & 밸런스 피드백
            </h4>
            <p className="text-[10px] text-muted-foreground">
              현재 루틴의 볼륨과 부위 밸런스를 전문 트레이너 AI가 진단합니다.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isOpen) setIsOpen(true)
            handleGetCoaching()
          }}
          disabled={isLoading}
          className="flex items-center gap-1 rounded-md border border-primary/40 bg-background px-2.5 py-1 text-[11px] font-bold text-primary shadow-xs transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <RefreshCw className="size-3" />
          )}
          <span>진단하기</span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 border-t border-primary/10 pt-2.5 animate-in fade-in-0 duration-200">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-4 text-xs font-medium text-muted-foreground">
              <Loader2 className="size-4 animate-spin text-primary" />
              <span>Gemini AI가 {day.title} 루틴을 정밀 분석하고 있습니다...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-[11px] font-medium text-destructive">
              <AlertCircle className="size-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {feedback && !isLoading && (
            <div className="flex flex-col gap-2.5">
              <div className="rounded-lg bg-background/80 p-3 text-xs leading-relaxed text-foreground whitespace-pre-line shadow-xs">
                {feedback}
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>💡 추천 보완 운동을 추가하고 싶으신가요?</span>
                <span className="text-[10px] text-primary">원클릭 추가 가능</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
