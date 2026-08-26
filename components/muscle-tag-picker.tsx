'use client'

import { useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'
import { MUSCLE_GROUPS, type MuscleGroup } from '@/lib/workout-data'
import { cn } from '@/lib/utils'

type MuscleTagPickerProps = {
  value: MuscleGroup | null
  onSelect: (value: MuscleGroup | null) => void
  onClose: () => void
}

export function MuscleTagPicker({ value, onSelect, onClose }: MuscleTagPickerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="부위 선택"
      className="absolute right-0 top-full z-20 mt-2 w-52 origin-top-right rounded-lg border border-border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          부위 선택
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {MUSCLE_GROUPS.map((muscle) => {
          const active = muscle === value
          return (
            <button
              key={muscle}
              type="button"
              onClick={() => {
                onSelect(muscle)
                onClose()
              }}
              className={cn(
                'flex items-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {active && <Check className="size-3" />}
              {muscle}
            </button>
          )
        })}
      </div>
      {value && (
        <button
          type="button"
          onClick={() => {
            onSelect(null)
            onClose()
          }}
          className="mt-2 w-full rounded-md border border-dashed border-border px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
        >
          태그 지우기
        </button>
      )}
    </div>
  )
}
