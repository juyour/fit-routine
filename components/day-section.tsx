'use client'

import { ChevronDown, Plus } from 'lucide-react'
import {
  createEmptySet,
  type Exercise,
  type MuscleGroup,
  type WorkoutDay,
} from '@/lib/workout-data'
import { ExerciseRow } from '@/components/exercise-row'
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
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: DaySectionProps) {
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

  return (
    <section
      onFocus={onActivate}
      onPointerDown={onActivate}
      className={cn(
        'rounded-xl border transition-colors duration-200',
        isActive
          ? 'border-primary/40 bg-card'
          : 'border-border bg-card/40 hover:border-border',
      )}
    >
      <button
        type="button"
        onClick={onToggleCollapse}
        aria-expanded={!collapsed}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <span
          className={cn(
            'flex size-9 shrink-0 flex-col items-center justify-center rounded-lg font-mono text-[13px] font-bold leading-none tabular-nums transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
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
                    onRename={(name) => onPatch(exercise.id, { name })}
                    onMuscleChange={(muscle) =>
                      onPatch(exercise.id, { muscle })
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
                        sets: exercise.sets.filter((set) => set.id !== setId),
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

            <button
              type="button"
              onClick={onAddExercise}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
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
