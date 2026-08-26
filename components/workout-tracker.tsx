'use client'

import { useMemo, useState } from 'react'
import { Dumbbell, Plus } from 'lucide-react'
import {
  SAMPLE_ROUTINES,
  SPLITS,
  createEmptyExercise,
  type Exercise,
  type SplitId,
  type WorkoutDay,
} from '@/lib/workout-data'
import { SplitSelector } from '@/components/split-selector'
import { TagFilter, type MuscleFilter } from '@/components/tag-filter'
import { DaySection } from '@/components/day-section'

export function WorkoutTracker() {
  const [split, setSplit] = useState<SplitId>('three')
  const [filter, setFilter] = useState<MuscleFilter>('all')
  const [routines, setRoutines] = useState<Record<SplitId, WorkoutDay[]>>(
    () => SAMPLE_ROUTINES,
  )
  const [collapsedDays, setCollapsedDays] = useState<Record<string, boolean>>({})
  const [activeDayId, setActiveDayId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const days = routines[split]
  const activeDay = days.find((day) => day.id === activeDayId) ?? days[0]

  const allExercises = useMemo(
    () => days.flatMap((day) => day.exercises),
    [days],
  )

  const counts = useMemo(() => {
    const next: Record<string, number> = {}
    for (const exercise of allExercises) {
      if (exercise.muscle) {
        next[exercise.muscle] = (next[exercise.muscle] ?? 0) + 1
      }
    }
    return next
  }, [allExercises])

  const totalSets = allExercises.reduce(
    (sum, exercise) => sum + exercise.sets.length,
    0,
  )
  const totalVolume = allExercises.reduce(
    (sum, exercise) =>
      sum +
      exercise.sets.reduce(
        (inner, set) =>
          inner + (Number(set.weight) || 0) * (Number(set.reps) || 0),
        0,
      ),
    0,
  )

  const matchCount = useMemo(
    () =>
      filter === 'all'
        ? allExercises.length
        : allExercises.filter((exercise) => exercise.muscle === filter).length,
    [allExercises, filter],
  )

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

  function addExercise(dayId: string) {
    const day = days.find((item) => item.id === dayId)
    const next = createEmptyExercise(day?.focus[0] ?? null)
    updateDay(dayId, (list) => [...list, next])
    setCollapsedDays((prev) => ({ ...prev, [dayId]: false }))
    setActiveDayId(dayId)
    setExpandedId(next.id)
    setFilter('all')
  }

  function reorder(dayId: string) {
    if (!dragId || !dragOverId || dragId === dragOverId) return
    updateDay(dayId, (list) => {
      const from = list.findIndex((item) => item.id === dragId)
      const to = list.findIndex((item) => item.id === dragOverId)
      if (from === -1 || to === -1) return list
      const next = [...list]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  function selectSplit(next: SplitId) {
    setSplit(next)
    setActiveDayId(null)
    setExpandedId(null)
    setCollapsedDays({})
  }

  const currentSplit = SPLITS.find((item) => item.id === split)

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pb-32 pt-5">
      <header className="flex items-center justify-between gap-4 pb-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="size-4.5" />
          </span>
          <div className="flex flex-col">
            <h1 className="text-base font-bold leading-tight tracking-tight">
              FitRoutine
            </h1>
            <p className="text-[11px] leading-tight text-muted-foreground">
              {currentSplit?.label} · {currentSplit?.days}개 섹션
            </p>
          </div>
        </div>
        <dl className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Sets
            </dt>
            <dd className="font-mono text-lg font-semibold leading-none tabular-nums">
              {totalSets}
            </dd>
          </div>
          <div className="flex flex-col items-end">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Volume
            </dt>
            <dd className="font-mono text-lg font-semibold leading-none tabular-nums">
              {totalVolume.toLocaleString()}
              <span className="ml-0.5 text-[11px] font-normal text-muted-foreground">
                kg
              </span>
            </dd>
          </div>
        </dl>
      </header>

      <div className="flex flex-col gap-3">
        <SplitSelector value={split} onChange={selectSplit} />
        <TagFilter
          value={filter}
          onChange={setFilter}
          counts={counts}
          total={allExercises.length}
        />
      </div>

      {filter !== 'all' && matchCount === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-border py-10 text-center">
          <p className="text-sm font-medium">{filter} 운동이 없습니다</p>
          <p className="mt-1 text-xs text-muted-foreground">
            섹션의 추가 버튼으로 운동을 등록하세요.
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2.5">
        {days.map((day, dayIndex) => (
          <DaySection
            key={day.id}
            day={day}
            dayIndex={dayIndex}
            filter={filter}
            collapsed={collapsedDays[day.id] ?? false}
            isActive={activeDay?.id === day.id}
            expandedId={expandedId}
            dragId={dragId}
            dragOverId={dragOverId}
            onToggleCollapse={() =>
              setCollapsedDays((prev) => ({
                ...prev,
                [day.id]: !(prev[day.id] ?? false),
              }))
            }
            onActivate={() => setActiveDayId(day.id)}
            onAddExercise={() => addExercise(day.id)}
            onToggleExercise={(id) =>
              setExpandedId((prev) => (prev === id ? null : id))
            }
            onPatch={(id, patch) => patchExercise(day.id, id, patch)}
            onRemove={(id) =>
              updateDay(day.id, (list) =>
                list.filter((item) => item.id !== id),
              )
            }
            onDragStart={setDragId}
            onDragEnter={setDragOverId}
            onDragEnd={() => {
              reorder(day.id)
              setDragId(null)
              setDragOverId(null)
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center bg-gradient-to-t from-background via-background/90 to-transparent pb-6 pt-10">
        <button
          type="button"
          onClick={() => activeDay && addExercise(activeDay.id)}
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Plus className="size-4.5" />
          {activeDay ? `${activeDay.title}에 운동 추가` : '운동 추가'}
        </button>
      </div>
    </main>
  )
}
