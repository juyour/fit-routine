'use client'

import { useState } from 'react'
import { ChevronDown, GripVertical, Plus, Trash2, X } from 'lucide-react'
import type { Exercise, MuscleGroup } from '@/lib/workout-data'
import { MuscleTagPicker } from '@/components/muscle-tag-picker'
import { cn } from '@/lib/utils'

type ExerciseRowProps = {
  exercise: Exercise
  index: number
  expanded: boolean
  isDragging: boolean
  isDragOver: boolean
  onToggle: () => void
  onRename: (name: string) => void
  onMuscleChange: (muscle: MuscleGroup | null) => void
  onRemove: () => void
  onSetChange: (setId: string, field: 'weight' | 'reps', value: string) => void
  onSetRemove: (setId: string) => void
  onSetAdd: () => void
  onDragStart: () => void
  onDragEnter: () => void
  onDragEnd: () => void
}

export function ExerciseRow({
  exercise,
  index,
  expanded,
  isDragging,
  isDragOver,
  onToggle,
  onRename,
  onMuscleChange,
  onRemove,
  onSetChange,
  onSetRemove,
  onSetAdd,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: ExerciseRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [touched, setTouched] = useState(false)
  const [draggable, setDraggable] = useState(false)

  const invalid = touched && exercise.name.trim().length === 0
  const totalVolume = exercise.sets.reduce(
    (sum, set) => sum + (Number(set.weight) || 0) * (Number(set.reps) || 0),
    0,
  )

  return (
    <li
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={() => {
        setDraggable(false)
        onDragEnd()
      }}
      className={cn(
        'group relative rounded-lg border bg-card transition-all duration-200',
        isDragging ? 'opacity-40' : 'opacity-100',
        isDragOver && !isDragging
          ? 'border-primary ring-2 ring-primary/30'
          : 'border-border',
      )}
    >
      <div className="flex items-center gap-1 p-2">
        <button
          type="button"
          aria-label={`${exercise.name || '운동'} 순서 변경 핸들`}
          onPointerDown={() => setDraggable(true)}
          onPointerUp={() => setDraggable(false)}
          className="flex size-8 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing active:bg-muted"
        >
          <GripVertical className="size-4" />
        </button>

        <span className="w-5 shrink-0 text-center font-mono text-[11px] tabular-nums text-muted-foreground/60">
          {index + 1}
        </span>

        <input
          value={exercise.name}
          onChange={(event) => onRename(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="운동 이름을 입력하세요"
          aria-invalid={invalid}
          aria-label="운동 이름"
          className={cn(
            'min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-2 py-2 text-[15px] font-medium outline-none transition-colors',
            'placeholder:font-normal placeholder:text-muted-foreground/60',
            'hover:border-border focus:border-ring focus:bg-background',
            invalid && 'border-destructive/60 bg-destructive/5 focus:border-destructive',
          )}
        />

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setPickerOpen((open) => !open)}
            aria-expanded={pickerOpen}
            aria-label="부위 태그 선택"
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors',
              exercise.muscle
                ? 'border border-primary/30 bg-accent text-accent-foreground hover:border-primary/60'
                : 'border border-dashed border-muted-foreground/40 text-muted-foreground/70 hover:border-muted-foreground hover:text-foreground',
            )}
          >
            {exercise.muscle ?? '미지정'}
          </button>
          {pickerOpen && (
            <MuscleTagPicker
              value={exercise.muscle}
              onSelect={onMuscleChange}
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label="세트 기록 열기"
          className="flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <span className="font-mono text-[11px] tabular-nums">
            {exercise.sets.length}
          </span>
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200',
              expanded && 'rotate-180',
            )}
          />
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label="운동 삭제"
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="size-4" />
        </button>
      </div>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-2 pb-2 pt-2">
            {invalid && (
              <p className="px-1 pb-2 text-[11px] font-medium text-destructive">
                운동 이름을 입력해야 기록이 저장됩니다.
              </p>
            )}

            <div className="flex items-center gap-2 px-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              <span className="w-8 text-center">SET</span>
              <span className="flex-1">무게 (kg)</span>
              <span className="flex-1">횟수 (reps)</span>
              <span className="w-8" />
            </div>

            <ul className="flex flex-col gap-1.5">
              {exercise.sets.map((set, setIndex) => (
                <li key={set.id} className="flex items-center gap-2">
                  <span className="w-8 shrink-0 text-center font-mono text-sm font-semibold tabular-nums text-muted-foreground">
                    {setIndex + 1}
                  </span>
                  <input
                    value={set.weight}
                    onChange={(event) =>
                      onSetChange(set.id, 'weight', event.target.value)
                    }
                    inputMode="decimal"
                    placeholder="0"
                    aria-label={`${setIndex + 1}세트 무게`}
                    className="h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-center font-mono text-lg font-semibold tabular-nums outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground/40 focus:border-ring focus:ring-2 focus:ring-ring/20"
                  />
                  <input
                    value={set.reps}
                    onChange={(event) =>
                      onSetChange(set.id, 'reps', event.target.value)
                    }
                    inputMode="numeric"
                    placeholder="0"
                    aria-label={`${setIndex + 1}세트 횟수`}
                    className="h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-center font-mono text-lg font-semibold tabular-nums outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground/40 focus:border-ring focus:ring-2 focus:ring-ring/20"
                  />
                  <button
                    type="button"
                    onClick={() => onSetRemove(set.id)}
                    aria-label={`${setIndex + 1}세트 삭제`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onSetAdd}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-dashed border-border py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="size-3.5" />
                세트 추가
              </button>
              <span className="shrink-0 rounded-md bg-muted px-2.5 py-2 font-mono text-[11px] tabular-nums text-muted-foreground">
                {totalVolume.toLocaleString()} kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
