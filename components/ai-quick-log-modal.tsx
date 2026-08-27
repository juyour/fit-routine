'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react'
import {
  createEmptySet,
  uid,
  type Exercise,
  type MuscleGroup,
  type WorkoutSet,
} from '@/lib/workout-data'
import { cn } from '@/lib/utils'

type AiQuickLogModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddExercises: (exercises: Exercise[]) => void
  dayTitle: string
}

export function AiQuickLogModal({
  isOpen,
  onClose,
  onAddExercises,
  dayTitle,
}: AiQuickLogModalProps) {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const samplePrompts = [
    '벤치프레스 80kg 10회 3세트, 펙덱플라이 40kg 12회 3세트',
    '랫풀다운 55kg 12회 4세트, 바벨로우 60kg 10회 3세트',
    '스쿼트 100kg 8회 3세트, 레그익스텐션 45kg 15회 3세트',
  ]

  async function handleAnalyze() {
    if (!prompt.trim()) {
      setError('기록할 운동 내용을 입력해주세요.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/gemini/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt }),
      })

      if (!res.ok) {
        throw new Error('Gemini API 응답 오류가 발생했습니다.')
      }

      const data = await res.json()
      const items = data.items as Array<{
        name: string
        muscle: MuscleGroup | null
        sets: Array<{ weight: string; reps: string }>
      }>

      if (!items || items.length === 0) {
        setError('운동 내용을 인식하지 못했습니다. 형식을 확인해주세요.')
        setIsLoading(false)
        return
      }

      const newExercises: Exercise[] = items.map((item) => {
        const parsedSets: WorkoutSet[] =
          item.sets && item.sets.length > 0
            ? item.sets.map((s) => ({
                id: uid('set'),
                weight: String(s.weight || '0'),
                reps: String(s.reps || '0'),
              }))
            : [createEmptySet()]

        return {
          id: uid('ex'),
          name: item.name || '새 운동',
          muscle: item.muscle || null,
          sets: parsedSets,
          isManualTagged: false,
        }
      })

      onAddExercises(newExercises)
      setPrompt('')
      onClose()
    } catch (err: any) {
      console.error(err)
      setError('AI 분석 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in-0 duration-200"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="size-4.5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-foreground">
                AI 자연어 빠른 운동 기록
              </h2>
              <p className="text-[11px] text-muted-foreground">
                {dayTitle}에 자동 분석하여 추가합니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-2 flex flex-col gap-3">
          <label className="text-xs font-semibold text-foreground">
            오늘 수행한 운동을 자유롭게 적어보세요
          </label>
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value)
              if (error) setError(null)
            }}
            placeholder="예: 벤치프레스 80키로 10회 3세트하고 사레레 10kg 15회 3세트 했어"
            rows={3}
            className="w-full resize-none rounded-xl border border-input bg-background p-3 text-xs leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {error && (
            <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-[11px] font-medium text-destructive">
              <AlertCircle className="size-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              추천 예시 (클릭 시 자동 입력)
            </span>
            <div className="mt-1.5 flex flex-col gap-1">
              {samplePrompts.map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(sample)}
                  className="truncate rounded-md border border-dashed border-border/80 px-2.5 py-1.5 text-left text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent/40 hover:text-foreground"
                >
                  💬 {sample}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Gemini AI 분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" />
                  루틴에 일괄 추가하기
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
