import React from 'react'

type NeonDumbbellIconProps = {
  className?: string
  size?: number
}

export function NeonDumbbellIcon({
  className = 'size-5',
  size = 22,
}: NeonDumbbellIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter
          id="neon-dumbbell-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="1.5" result="blur1" />
          <feGaussianBlur stdDeviation="3.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Neon Glow Outer Layer (Deep Royal Blue) */}
      <g
        filter="url(#neon-dumbbell-glow)"
        stroke="#2563eb"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      >
        {/* Central Bar Handle */}
        <path d="M12 20L20 12" />
        {/* Left Inner Plate */}
        <path d="M8.5 16.5L15.5 23.5" />
        {/* Left Outer Plate */}
        <path d="M6 14L13 21" />
        {/* Left End Tip */}
        <path d="M4.5 16.5L7.5 19.5" />
        {/* Right Inner Plate */}
        <path d="M16.5 8.5L23.5 15.5" />
        {/* Right Outer Plate */}
        <path d="M19 6L26 13" />
        {/* Right End Tip */}
        <path d="M22.5 4.5L25.5 7.5" />
      </g>

      {/* 2. Electric Sky Blue Mid Stroke */}
      <g
        stroke="#38bdf8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central Bar Handle */}
        <path d="M12 20L20 12" />
        {/* Left Inner Plate */}
        <path d="M8.5 16.5L15.5 23.5" />
        {/* Left Outer Plate */}
        <path d="M6 14L13 21" />
        {/* Left End Tip */}
        <path d="M4.5 16.5L7.5 19.5" />
        {/* Right Inner Plate */}
        <path d="M16.5 8.5L23.5 15.5" />
        {/* Right Outer Plate */}
        <path d="M19 6L26 13" />
        {/* Right End Tip */}
        <path d="M22.5 4.5L25.5 7.5" />
      </g>

      {/* 3. Crisp White/Ice Highlight Stroke */}
      <g
        stroke="#f0f9ff"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central Bar Handle */}
        <path d="M12 20L20 12" />
        {/* Left Inner Plate */}
        <path d="M8.5 16.5L15.5 23.5" />
        {/* Left Outer Plate */}
        <path d="M6 14L13 21" />
        {/* Right Inner Plate */}
        <path d="M16.5 8.5L23.5 15.5" />
        {/* Right Outer Plate */}
        <path d="M19 6L26 13" />
      </g>
    </svg>
  )
}
