'use client'

import { useState } from 'react'
import { Check, ChevronDown, Edit2, Plus, Sparkles, X } from 'lucide-react'
import {
  MUSCLE_GROUPS,
  createEmptySet,
  type Exercise,
  type MuscleGroup,
  type WorkoutDay,
} from '@/lib/workout-data'
import { ExerciseRow } from '@/components/exercise-row'
import { AiCoachPanel } from '@/components/ai-coach-panel'
import type { MuscleFilter } from '@/components/tag-filter'
import { cn } from '@/lib/utils'

type DaySectionProps = {
  day: WorkoutDay
  dayIndex: number
  filter: MuscleFilter
  collapsed: boolean
  isActive: boolean
  expandedId: string | null
  dragId: string | null
  dragOverId: string | null
  onToggleCollapse: () => void
  onActivate: () => void
  onAddExercise: () => void
  onToggleExercise: (id: string) => void
  onPatch: (id: string, patch: Partial<Exercise>) => void
  onPatchDay: (patch: Partial<WorkoutDay>) => void
  onRemove: (id: string) => void
  onDragStart: (id: string) => void
  onDragEnter: (id: string) => void
  onDragEnd: () => void
}

export function DaySection({
  day,
  dayIndex,
  filter,
  collapsed,
  isActive,
  expandedId,
  dragId,
  dragOverId,
  onToggleCollapse,
  onActivate,
  onAddExercise,
  onToggleExercise,
  onPatch,
  onPatchDay,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: DaySectionProps) {
  const [isEditingDay, setIsEditingDay] = useState(false)
  const [editTitle, setEditTitle] = useState(day.title)
  const [editSubtitle, setEditSubtitle] = useState(day.subtitle)
  const [editFocus, setEditFocus] = useState<MuscleGroup[]>(day.focus)

  const visible =
    filter === 'all'
      ? day.exercises
      : day.exercises.filter((exercise) => exercise.muscle === filter)

  const setCount = day.exercises.reduce(
    (sum, exercise) => sum + exercise.sets.length,
    0,
  )
  const volume = day.exercises.reduce(
    (sum, exercise) =>
      sum +
      exercise.sets.reduce(
        (inner, set) =>
          inner + (Number(set.weight) || 0) * (Number(set.reps) || 0),
        0,
      ),
    0,
  )

  function handleSaveDay() {
    onPatchDay({
      title: editTitle.trim() || `Day ${dayIndex + 1}`,
      subtitle: editSubtitle.trim() || 'Custom',
      focus: editFocus,
    })
    setIsEditingDay(false)
  }

  function toggleFocusMuscle(muscle: MuscleGroup) {
    setEditFocus((prev) =>
      prev.includes(muscle)
        ? prev.filter((item) => item !== muscle)
        : [...prev, muscle],
    )
  }

  return (
    <section
      onFocus={onActivate}
      onPointerDown={onActivate}
      className={cn(
        'rounded-xl border transition-colors duration-200',
        isActive
          ? 'border-primary/40 bg-card shadow-sm'
          : 'border-border bg-card/40 hover:border-border',
      )}
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          className="flex min-w-0 flex-1 items-center gap-3 text-left transition-colors"
        >
          <span
            className={cn(
              'flex size-9 shrink-0 flex-col items-center justify-center rounded-lg font-mono text-[13px] font-bold leading-none tabular-nums transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground',
            )}
          >
            {dayIndex + 1}
            <span className="mt-0.5 text-[7px] font-semibold tracking-widest">
              DAY
            </span>
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <h2 className="truncate text-[15px] font-bold leading-none tracking-tight">
                {day.title}
              </h2>
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {day.subtitle}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums text-muted-foreground">
              <span>{day.exercises.length}종목</span>
              <span className="text-muted-foreground/30">·</span>
              <span>{setCount}세트</span>
              <span className="text-muted-foreground/30">·</span>
              <span>{volume.toLocaleString()}kg</span>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1 sm:flex">
            {day.focus.map((muscle: MuscleGroup) => (
              <span
                key={muscle}
                className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
              >
                {muscle}
              </span>
            ))}
          </div>

          <ChevronDown
            className={cn(
              'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
              !collapsed && 'rotate-180',
            )}
          />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setEditTitle(day.title)
            setEditSubtitle(day.subtitle)
            setEditFocus(day.focus)
            setIsEditingDay((prev) => !prev)
          }}
          aria-label="루틴 명칭 및 부위 변경"
          title="루틴 명칭 및 부위 변경"
          className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
        >
          <Edit2 className="size-3.5" />
        </button>
      </div>

      {isEditingDay && (
        <div className="border-t border-border/80 bg-accent/20 p-3">
          <div className="flex items-center justify-between pb-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Day {dayIndex + 1} 루틴 및 부위 직접 수정
            </span>
            <button
              type="button"
              onClick={() => setIsEditingDay(false)}
              aria-label="닫기"
              className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                루틴 이름
              </label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="예: 가슴 · 삼두 집중"
                className="mt-1 w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs font-medium outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground">
                부제 (태그/구분)
              </label>
              <input
                value={editSubtitle}
                onChange={(e) => setEditSubtitle(e.target.value)}
                placeholder="예: Push / Day 1"
                className="mt-1 w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs font-medium outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>
          <div className="mt-2.5">
            <label className="text-[11px] font-medium text-muted-foreground">
              주요 타겟 부위 선택
            </label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {MUSCLE_GROUPS.map((muscle) => {
                const selected = editFocus.includes(muscle)
                return (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => toggleFocusMuscle(muscle)}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors',
                      selected
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-card text-muted-foreground hover:border-primary/50',
                    )}
                  >
                    {selected && <Check className="size-2.5" />}
                    {muscle}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditingDay(false)}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSaveDay}
              className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              적용하기
            </button>
          </div>
        </div>
      )}

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border p-2">
            {visible.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                {filter === 'all'
                  ? '이 섹션에 기록된 운동이 없습니다.'
                  : `이 섹션에 ${filter} 운동이 없습니다.`}
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {visible.map((exercise) => (
                  <ExerciseRow
                    key={exercise.id}
                    exercise={exercise}
                    index={day.exercises.indexOf(exercise)}
                    expanded={expandedId === exercise.id}
                    isDragging={dragId === exercise.id}
                    isDragOver={dragOverId === exercise.id}
                    onToggle={() => onToggleExercise(exercise.id)}
                    onRename={(name, autoMuscle) => {
                      if (autoMuscle !== undefined) {
                        onPatch(exercise.id, { name, muscle: autoMuscle })
                      } else {
                        onPatch(exercise.id, { name })
                      }
                    }}
                    onMuscleChange={(muscle) =>
                      onPatch(exercise.id, { muscle, isManualTagged: true })
                    }
                    onRemove={() => onRemove(exercise.id)}
                    onSetChange={(setId, field, value) =>
                      onPatch(exercise.id, {
                        sets: exercise.sets.map((set) =>
                          set.id === setId ? { ...set, [field]: value } : set,
                        ),
                      })
                    }
                    onSetRemove={(setId) =>
                      onPatch(exercise.id, {
                        sets:
                          exercise.sets.length > 1
                            ? exercise.sets.filter((set) => set.id !== setId)
                            : [createEmptySet()],
                      })
                    }
                    onSetAdd={() =>
                      onPatch(exercise.id, {
                        sets: [...exercise.sets, createEmptySet()],
                      })
                    }
                    onDragStart={() => onDragStart(exercise.id)}
                    onDragEnter={() => onDragEnter(exercise.id)}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </ul>
            )}

            {/* 1:1 Gemini AI 루틴 코칭 & 밸런스 피드백 패널 */}
            <AiCoachPanel
              day={day}
              onAddExercise={(newEx) => {
                onPatch(newEx.id, newEx)
                onAddExercise()
              }}
            />

            <button
              type="button"
              onClick={onAddExercise}
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
            >
              <Plus className="size-3.5" />
              {day.title}에 운동 추가
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
