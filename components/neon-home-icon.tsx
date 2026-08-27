import React from 'react'

type NeonHomeIconProps = {
  className?: string
  size?: number
}

export function NeonHomeIcon({ className = 'size-5', size = 22 }: NeonHomeIconProps) {
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
        <filter id="neon-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur1" />
          <feGaussianBlur stdDeviation="3.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Neon Glow Outer Layer */}
      <g filter="url(#neon-glow-strong)" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        {/* Chimney */}
        <path d="M21 9.5V5.5C21 5.22 21.22 5 21.5 5H24.5C24.78 5 25 5.22 25 5.5V13" />
        {/* Roof Eaves */}
        <path d="M4 14L15.3 4.7C15.7 4.37 16.3 4.37 16.7 4.7L28 14" />
        {/* House Body */}
        <path d="M7 12V24.5C7 25.33 7.67 26 8.5 26H23.5C24.33 26 25 24.33 25 24.5V12" />
      </g>

      {/* Electric Blue Mid Stroke */}
      <g stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Chimney */}
        <path d="M21 9.5V5.5C21 5.22 21.22 5 21.5 5H24.5C24.78 5 25 5.22 25 5.5V13" />
        {/* Roof Eaves */}
        <path d="M4 14L15.3 4.7C15.7 4.37 16.3 4.37 16.7 4.7L28 14" />
        {/* House Body */}
        <path d="M7 12V24.5C7 25.33 7.67 26 8.5 26H23.5C24.33 26 25 24.33 25 24.5V12" />
      </g>

      {/* Crisp White/Cyan Core Stroke */}
      <g stroke="#f0f9ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Chimney */}
        <path d="M21 9.5V5.5C21 5.22 21.22 5 21.5 5H24.5C24.78 5 25 5.22 25 5.5V13" />
        {/* Roof Eaves */}
        <path d="M4 14L15.3 4.7C15.7 4.37 16.3 4.37 16.7 4.7L28 14" />
        {/* House Body */}
        <path d="M7 12V24.5C7 25.33 7.67 26 8.5 26H23.5C24.33 26 25 24.33 25 24.5V12" />
      </g>
    </svg>
  )
}
