'use client'

import { SPLITS, type SplitId } from '@/lib/workout-data'
import { cn } from '@/lib/utils'

type SplitSelectorProps = {
  value: SplitId
  onChange: (value: SplitId) => void
}

export function SplitSelector({ value, onChange }: SplitSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="분할 선택"
      className="flex items-stretch gap-1 rounded-lg border border-border bg-card p-1"
    >
      {SPLITS.map((split) => {
        const active = split.id === value
        return (
          <button
            key={split.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(split.id)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-2 py-2 text-xs transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              active
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'text-muted-foreground font-medium hover:bg-muted hover:text-foreground',
            )}
          >
            <span className="whitespace-nowrap">{split.label}</span>
            <span
              className={cn(
                'font-mono text-[10px] tabular-nums',
                active ? 'text-primary-foreground/70' : 'text-muted-foreground/70',
              )}
            >
              {split.days}D
            </span>
          </button>
        )
      })}
    </div>
  )
}
