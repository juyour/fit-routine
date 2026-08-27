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
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow Backdrop Layer */}
      <g filter="url(#neon-glow)" opacity="0.9">
        {/* Chimney */}
        <path
          d="M18 7.5V4.5C18 4.2 18.2 4 18.5 4H20.5C20.8 4 21 4.2 21 4.5V11.5"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Main House Outline */}
        <path
          d="M4.5 12L13.1 4.4C13.6 4 14.4 4 14.9 4.4L23.5 12M6.5 10.5V22C6.5 22.6 7 23 7.6 23H20.4C21 23 21.5 22.6 21.5 22V10.5"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Crisp Foreground Stroke */}
      {/* Chimney */}
      <path
        d="M18 7.5V4.5C18 4.2 18.2 4 18.5 4H20.5C20.8 4 21 4.2 21 4.5V11.5"
        stroke="#93c5fd"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Main House Outline */}
      <path
        d="M4.5 12L13.1 4.4C13.6 4 14.4 4 14.9 4.4L23.5 12M6.5 10.5V22C6.5 22.6 7 23 7.6 23H20.4C21 23 21.5 22.6 21.5 22V10.5"
        stroke="#93c5fd"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
