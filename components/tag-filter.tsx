'use client'

import { MUSCLE_GROUPS, type MuscleGroup } from '@/lib/workout-data'
import { cn } from '@/lib/utils'

export type MuscleFilter = MuscleGroup | 'all'

type TagFilterProps = {
  value: MuscleFilter
  onChange: (value: MuscleFilter) => void
  counts: Record<string, number>
  total: number
}

export function TagFilter({ value, onChange, counts, total }: TagFilterProps) {
  const options: Array<{ key: MuscleFilter; label: string; count: number }> = [
    { key: 'all', label: '전체', count: total },
    ...MUSCLE_GROUPS.map((m) => ({
      key: m as MuscleFilter,
      label: m,
      count: counts[m] ?? 0,
    })),
  ]

  return (
    <div className="relative -mx-4">
      <div
        className="no-scrollbar flex snap-x items-center gap-2 overflow-x-auto px-4 pb-1"
        role="group"
        aria-label="부위 필터"
      >
        {options.map((option) => {
          const active = option.key === value
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.key)}
              className={cn(
                'flex shrink-0 snap-start items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground',
              )}
            >
              {option.label}
              <span
                className={cn(
                  'font-mono text-[10px] tabular-nums',
                  active ? 'text-primary-foreground/70' : 'text-muted-foreground/60',
                )}
              >
                {option.count}
              </span>
            </button>
          )
        })}
        <span className="shrink-0 pr-2" aria-hidden="true" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
