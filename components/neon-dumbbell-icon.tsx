import React from 'react'
import { Dumbbell } from 'lucide-react'

type NeonDumbbellIconProps = {
  className?: string
  size?: number
}

export function NeonDumbbellIcon({
  className = 'size-5',
  size = 20,
}: NeonDumbbellIconProps) {
  return (
    <Dumbbell
      size={size}
      className={className}
      style={{
        color: '#60a5fa',
        filter:
          'drop-shadow(0 0 4px rgba(96, 165, 250, 0.9)) drop-shadow(0 0 10px rgba(37, 99, 235, 0.8))',
      }}
    />
  )
}
