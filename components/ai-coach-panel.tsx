'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  Dumbbell,
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
  type WorkoutSet,
} from '@/lib/workout-data'
import type { RecommendedExerciseItem } from '@/lib/gemini'
import { cn } from '@/lib/utils'

type AiCoachPanelProps = {
  day: WorkoutDay
  onAddExercises: (exercises: Exercise[]) => void
}

export function AiCoachPanel({ day, onAddExercises }: AiCoachPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackText, setFeedbackText] = useState<string | null>(null)
  const [recommended, setRecommended] = useState<RecommendedExerciseItem[]>([])
  const [appliedMap, setAppliedMap] = useState<Record<string, boolean>>({})
  const [allApplied, setAllApplied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGetCoaching() {
    if (day.exercises.length === 0 || (day.exercises.length === 1 && !day.exercises[0].name.trim())) {
      setError('루틴에 최소 1개 이상의 운동을 기록한 후 AI 코칭을 받아보세요.')
      return
    }

    setIsLoading(true)
    setError(null)
    setAppliedMap({})
    setAllApplied(false)

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
      setFeedbackText(data.feedbackText || '루틴 분석이 완료되었습니다.')
      setRecommended(Array.isArray(data.recommendedExercises) ? data.recommendedExercises : [])
    } catch (err: any) {
      console.error(err)
      setError('AI 코칭 분석 중 문제가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 단일 추천 운동 루틴에 반영
  function handleApplySingle(item: RecommendedExerciseItem, index: number) {
    const key = `${item.name}-${index}`
    if (appliedMap[key]) return

    const parsedSets: WorkoutSet[] =
      item.sets && item.sets.length > 0
        ? item.sets.map((s) => ({
            id: uid('set'),
            weight: String(s.weight || '20'),
            reps: String(s.reps || '10'),
          }))
        : [
            { id: uid('set'), weight: '20', reps: '12' },
            { id: uid('set'), weight: '22', reps: '10' },
            { id: uid('set'), weight: '24', reps: '8' },
          ]

    const newEx: Exercise = {
      id: uid('ex'),
      name: item.name,
      muscle: item.muscle,
      sets: parsedSets,
      isManualTagged: false,
    }

    onAddExercises([newEx])
    setAppliedMap((prev) => ({ ...prev, [key]: true }))
  }

  // 전체 추천 운동 루틴에 일괄 반영
  function handleApplyAll() {
    if (recommended.length === 0 || allApplied) return

    const newExercises: Exercise[] = recommended.map((item) => {
      const parsedSets: WorkoutSet[] =
        item.sets && item.sets.length > 0
          ? item.sets.map((s) => ({
              id: uid('set'),
              weight: String(s.weight || '20'),
              reps: String(s.reps || '10'),
            }))
          : [
              { id: uid('set'), weight: '20', reps: '12' },
              { id: uid('set'), weight: '22', reps: '10' },
              { id: uid('set'), weight: '24', reps: '8' },
            ]

      return {
        id: uid('ex'),
        name: item.name,
        muscle: item.muscle,
        sets: parsedSets,
        isManualTagged: false,
      }
    })

    onAddExercises(newExercises)
    setAllApplied(true)
    const newMap: Record<string, boolean> = {}
    recommended.forEach((item, index) => {
      newMap[`${item.name}-${index}`] = true
    })
    setAppliedMap(newMap)
  }

  return (
    <div className="mt-2.5 rounded-xl border border-primary/25 bg-primary/5 p-3 shadow-xs transition-all">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (!isOpen && !feedbackText) {
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
              Gemini 1:1 AI 루틴 코칭 & 추천
            </h4>
            <p className="text-[10px] text-muted-foreground">
              현재 루틴의 볼륨을 진단하고 보완 운동을 추천받아 즉시 반영할 수 있습니다.
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
              <span>Gemini AI가 {day.title} 루틴을 정밀 분석 중입니다...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-[11px] font-medium text-destructive">
              <AlertCircle className="size-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {feedbackText && !isLoading && (
            <div className="flex flex-col gap-3">
              {/* AI 총평 및 조언 카드 */}
              <div className="rounded-xl border border-border/80 bg-card p-3 text-xs leading-relaxed text-foreground whitespace-pre-line shadow-xs">
                {feedbackText}
              </div>

              {/* AI 추천 보완 운동 목록 및 원클릭 반영 UI */}
              {recommended.length > 0 && (
                <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-background/80 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary" />
                      <span className="text-xs font-bold text-foreground">
                        AI 추천 보완 운동 ({recommended.length}개)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyAll}
                      disabled={allApplied}
                      className={cn(
                        'flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold shadow-xs transition-all',
                        allApplied
                          ? 'bg-muted text-muted-foreground cursor-default'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95',
                      )}
                    >
                      {allApplied ? (
                        <>
                          <Check className="size-3" />
                          전체 반영 완료
                        </>
                      ) : (
                        <>
                          <Plus className="size-3" />
                          루틴에 전체 반영하기
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    {recommended.map((item, index) => {
                      const key = `${item.name}-${index}`
                      const isApplied = appliedMap[key] || allApplied

                      return (
                        <div
                          key={key}
                          className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-2.5 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground">
                                {item.name}
                              </span>
                              {item.muscle && (
                                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  {item.muscle}
                                </span>
                              )}
                              {item.reason && (
                                <span className="text-[10px] text-muted-foreground">
                                  · {item.reason}
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleApplySingle(item, index)}
                              disabled={isApplied}
                              className={cn(
                                'flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold transition-all',
                                isApplied
                                  ? 'bg-muted text-muted-foreground'
                                  : 'border border-primary/40 bg-accent/60 text-primary hover:bg-primary hover:text-primary-foreground active:scale-95',
                              )}
                            >
                              {isApplied ? (
                                <>
                                  <Check className="size-3 text-emerald-500" />
                                  반영됨
                                </>
                              ) : (
                                <>
                                  <Plus className="size-3" />
                                  루틴에 추가
                                </>
                              )}
                            </button>
                          </div>

                          {/* 추천 세트 미리보기 */}
                          {item.sets && item.sets.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
                              <span className="font-semibold">추천 세트:</span>
                              {item.sets.map((set, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="rounded bg-muted/70 px-1.5 py-0.5 font-mono tabular-nums text-foreground/90"
                                >
                                  {set.weight}kg × {set.reps}회
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
