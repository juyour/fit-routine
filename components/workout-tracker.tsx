'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Dumbbell,
  Layers,
  Plus,
  Sparkles,
} from 'lucide-react'
import {
  SAMPLE_ROUTINES,
  SPLITS,
  createEmptyExercise,
  createEmptySet,
  resetExerciseItem,
  type Exercise,
  type MuscleGroup,
  type SplitId,
  type WorkoutDay,
} from '@/lib/workout-data'
import { SplitSelector } from '@/components/split-selector'
import { TagFilter, type MuscleFilter } from '@/components/tag-filter'
import { DaySection } from '@/components/day-section'
import { AiQuickLogModal } from '@/components/ai-quick-log-modal'
import { NeonDumbbellIcon } from '@/components/neon-dumbbell-icon'
import { cn } from '@/lib/utils'

type SavedExerciseItem = {
  splitId: SplitId
  splitLabel: string
  dayId: string
  dayIndex: number
  dayTitle: string
  exercise: Exercise
}

type WorkoutTrackerProps = {
  onGoHome?: () => void
}

export function WorkoutTracker({ onGoHome }: WorkoutTrackerProps = {}) {
  const [split, setSplit] = useState<SplitId>('three')
  const [filter, setFilter] = useState<MuscleFilter>('all')
  const [routines, setRoutines] = useState<Record<SplitId, WorkoutDay[]>>(
    () => SAMPLE_ROUTINES,
  )
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>({})
  const [activeDayId, setActiveDayId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isAiModalOpen, setIsAiModalOpen] = useState(false)

  const days = routines[split]
  const activeDay = days.find((day) => day.id === activeDayId) ?? days[0]

  // 현재 선택된 분할의 전체 세트 및 볼륨
  const currentSplitExercises = useMemo(
    () => days.flatMap((day) => day.exercises),
    [days],
  )

  const totalSets = currentSplitExercises.reduce(
    (sum, exercise) => sum + exercise.sets.length,
    0,
  )
  const totalVolume = currentSplitExercises.reduce(
    (sum, exercise) =>
      sum +
      exercise.sets.reduce(
        (inner, set) =>
          inner + (Number(set.weight) || 0) * (Number(set.reps) || 0),
        0,
      ),
    0,
  )

  // 모든 분할(무분할~5분할)에 저장된 모든 운동 목록 수집 (이름이 있는 항목 우선)
  const allSavedExercises = useMemo(() => {
    const list: SavedExerciseItem[] = []
    for (const s of SPLITS) {
      const dayList = routines[s.id] || []
      dayList.forEach((day, dayIndex) => {
        for (const ex of day.exercises) {
          if (ex.name.trim() !== '') {
            list.push({
              splitId: s.id,
              splitLabel: s.label,
              dayId: day.id,
              dayIndex,
              dayTitle: day.title,
              exercise: ex,
            })
          }
        }
      })
    }
    return list
  }, [routines])

  // 전체 분할 기준 부위별 운동 개수 카운트
  const globalMuscleCounts = useMemo(() => {
    const next: Record<string, number> = {}
    for (const item of allSavedExercises) {
      if (item.exercise.muscle) {
        next[item.exercise.muscle] = (next[item.exercise.muscle] ?? 0) + 1
      }
    }
    return next
  }, [allSavedExercises])

  // 하단 부위별 모아보기에 필터링된 운동 목록 (전체 분할 대상)
  const filteredCollectedExercises = useMemo(() => {
    if (filter === 'all') return allSavedExercises
    return allSavedExercises.filter((item) => item.exercise.muscle === filter)
  }, [allSavedExercises, filter])

  function updateDay(dayId: string, updater: (list: Exercise[]) => Exercise[]) {
    setRoutines((prev) => ({
      ...prev,
      [split]: prev[split].map((day) =>
        day.id === dayId ? { ...day, exercises: updater(day.exercises) } : day,
      ),
    }))
  }

  function patchExercise(dayId: string, id: string, patch: Partial<Exercise>) {
    updateDay(dayId, (list) =>
      list.map((exercise) =>
        exercise.id === id ? { ...exercise, ...patch } : exercise,
      ),
    )
  }

  function patchDay(dayId: string, patch: Partial<WorkoutDay>) {
    setRoutines((prev) => ({
      ...prev,
      [split]: prev[split].map((day) =>
        day.id === dayId ? { ...day, ...patch } : day,
      ),
    }))
  }

  function addExercise(dayId: string) {
    const day = days.find((item) => item.id === dayId)
    const next = createEmptyExercise(day?.focus[0] ?? null)
    updateDay(dayId, (list) => [...list, next])
    setCollapsedDays((prev) => ({ ...prev, [dayId]: false }))
    setActiveDayId(dayId)
    setExpandedId(next.id)
  }

  function handleAddAiExercises(newExercises: Exercise[]) {
    if (!activeDay || newExercises.length === 0) return
    handleAddDayAiExercises(activeDay.id, newExercises)
  }

  function handleAddDayAiExercises(dayId: string, newExercises: Exercise[]) {
    if (newExercises.length === 0) return
    updateDay(dayId, (list) => {
      // 만약 기존에 빈칸 운동 1개만 있었다면 교체
      if (list.length === 1 && list[0].name.trim() === '') {
        return newExercises
      }
      return [...list, ...newExercises]
    })
    setCollapsedDays((prev) => ({ ...prev, [dayId]: false }))
    setActiveDayId(dayId)
    setExpandedId(newExercises[0].id)
  }

  function removeExercise(dayId: string, id: string) {
    updateDay(dayId, (list) => {
      // 예외 3: 마지막 남은 운동 항목 삭제 시 삭제 대신 빈칸으로 리셋
      if (list.length === 1) {
        return [resetExerciseItem(list[0].id)]
      }
      return list.filter((item) => item.id !== id)
    })
  }

  function selectSplit(next: SplitId) {
    setSplit(next)
    setActiveDayId(null)
    setExpandedId(null)
    setCollapsedDays({})
  }

  // 모아보기 리스트에서 해당 분할/일자로 즉시 이동
  function jumpToRoutine(item: SavedExerciseItem) {
    setSplit(item.splitId)
    setActiveDayId(item.dayId)
    setCollapsedDays((prev) => ({ ...prev, [item.dayId]: false }))
    setExpandedId(item.exercise.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentSplit = SPLITS.find((item) => item.id === split)

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pb-36 pt-5">
      {/* 헤더 영역 */}
      <header className="flex items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-3">
          {onGoHome ? (
            <button
              type="button"
              onClick={onGoHome}
              aria-label="소개 홈으로 이동"
              title="소개 홈으로 이동"
              className="flex size-10 items-center justify-center rounded-xl border border-blue-500/30 bg-[#0f172a] shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:border-blue-400 hover:shadow-[0_0_22px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95"
            >
              <NeonDumbbellIcon size={22} />
            </button>
          ) : (
            <span className="flex size-10 items-center justify-center rounded-xl border border-blue-500/30 bg-[#0f172a] shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <NeonDumbbellIcon size={22} />
            </span>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold leading-tight tracking-tight text-white">
                FitRoutine
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                <Sparkles className="size-3" />
                Gemini AI
              </span>
            </div>
            <p className="text-[11px] leading-tight text-muted-foreground">
              {currentSplit?.label} · {days.length}개 일자 (자유 편집 가능)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-accent/60 px-3 py-1.5 text-xs font-bold text-primary shadow-xs transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
          >
            <Sparkles className="size-3.5" />
            AI 빠른 기록
          </button>

          <dl className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Sets
              </dt>
              <dd className="font-mono text-base font-semibold leading-none tabular-nums">
                {totalSets}
              </dd>
            </div>
            <div className="flex flex-col items-end">
              <dt className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Volume
              </dt>
              <dd className="font-mono text-base font-semibold leading-none tabular-nums">
                {totalVolume.toLocaleString()}
                <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
                  kg
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* 상단 분할 선택기 */}
      <div className="flex flex-col gap-2 pb-1">
        <SplitSelector value={split} onChange={selectSplit} />
      </div>

      {/* 일별(Day) 운동 리스트 영역 (분할에 저장된 루틴은 항상 온전하게 표시) */}
      <div className="mt-3 flex flex-col gap-3">
        {days.map((day, dayIndex) => (
          <DaySection
            key={day.id}
            day={day}
            dayIndex={dayIndex}
            filter="all"
            collapsed={collapsedDays[day.id] ?? false}
            isActive={activeDay?.id === day.id}
            expandedId={expandedId}
            onToggleCollapse={() =>
              setCollapsedDays((prev) => ({
                ...prev,
                [day.id]: !(prev[day.id] ?? false),
              }))
            }
            onActivate={() => setActiveDayId(day.id)}
            onAddExercise={() => addExercise(day.id)}
            onAddExercises={(newExercises) => handleAddDayAiExercises(day.id, newExercises)}
            onToggleExercise={(id) =>
              setExpandedId((prev) => (prev === id ? null : id))
            }
            onPatch={(id, patch) => patchExercise(day.id, id, patch)}
            onPatchDay={(patch) => patchDay(day.id, patch)}
            onRemove={(id) => removeExercise(day.id, id)}
          />
        ))}
      </div>

      {/* 하단: 전체 저장 데이터 기반 부위별 모아보기 섹션 */}
      <section className="mt-8 rounded-xl border border-border/80 bg-card/60 p-3.5 shadow-sm">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Layers className="size-3.5" />
            </span>
            <h3 className="text-xs font-bold text-foreground">
              전체 저장 운동 부위별 모아보기
            </h3>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">
            총 {allSavedExercises.length}개 저장됨
          </span>
        </div>

        {/* 부위 태그 칩 필터 (전체 분할 기준 카운트 표시) */}
        <TagFilter
          value={filter}
          onChange={setFilter}
          counts={globalMuscleCounts}
          total={allSavedExercises.length}
        />

        {/* 부위별 모아보기 결과 리스트 카드 */}
        <div className="mt-4 flex flex-col gap-2">
          {filteredCollectedExercises.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border py-6 text-center">
              <p className="text-xs font-medium text-foreground">
                {filter === 'all'
                  ? '저장된 운동이 없습니다.'
                  : `저장된 [${filter}] 운동이 없습니다.`}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                상단 루틴에 운동을 기록하면 여기에 부위별로 모두 모아집니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-muted-foreground">
                <span>
                  {filter === 'all'
                    ? '전체 저장 운동 목록'
                    : `[${filter}] 관련 저장 운동 (${filteredCollectedExercises.length}개)`}
                </span>
                <span className="text-[10px] text-muted-foreground/70">
                  클릭 시 해당 루틴으로 바로 이동
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {filteredCollectedExercises.map((item) => {
                  const exVolume = item.exercise.sets.reduce(
                    (sum, set) =>
                      sum +
                      (Number(set.weight) || 0) * (Number(set.reps) || 0),
                    0,
                  )
                  return (
                    <div
                      key={`${item.splitId}-${item.dayId}-${item.exercise.id}`}
                      onClick={() => jumpToRoutine(item)}
                      role="button"
                      tabIndex={0}
                      className="group flex flex-col gap-1.5 rounded-lg border border-border/70 bg-card p-2.5 transition-all hover:border-primary/50 hover:bg-accent/30 hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                            {item.splitLabel}
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            {item.exercise.name}
                          </span>
                          {item.exercise.muscle && (
                            <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              {item.exercise.muscle}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-primary">
                          <span className="hidden sm:inline">
                            {item.dayTitle}
                          </span>
                          <ChevronRight className="size-3.5" />
                        </div>
                      </div>

                      {/* 세트 요약 미리보기 */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="text-muted-foreground">
                          {item.exercise.sets.length}세트 ({exVolume.toLocaleString()}kg):
                        </span>
                        {item.exercise.sets.map((set, sIdx) => (
                          <span
                            key={set.id}
                            className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-foreground/80"
                          >
                            {set.weight || 0}kg × {set.reps || 0}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 하단 고정 플로팅 액션 버튼 영역 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-2.5 bg-gradient-to-t from-background via-background/90 to-transparent pb-6 pt-10 px-4">
        <button
          type="button"
          onClick={() => setIsAiModalOpen(true)}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-primary/40 bg-card/90 px-4 py-3.5 text-xs font-bold text-primary shadow-lg backdrop-blur-sm transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="size-4" />
          AI 빠른 기록
        </button>

        <button
          type="button"
          onClick={() => activeDay && addExercise(activeDay.id)}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Plus className="size-4.5" />
          {activeDay ? `${activeDay.title}에 운동 추가` : '운동 추가'}
        </button>
      </div>

      {/* AI 자연어 빠른 기록 모달 */}
      <AiQuickLogModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onAddExercises={handleAddAiExercises}
        dayTitle={activeDay?.title ?? '현재 루틴'}
      />
    </main>
  )
}
