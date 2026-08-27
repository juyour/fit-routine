import React from 'react'

type NeonDumbbellIconProps = {
  className?: string
  size?: number
}

export function NeonDumbbellIcon({
  className = 'size-5',
  size = 20,
}: NeonDumbbellIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter:
          'drop-shadow(0 0 3px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 8px rgba(37, 99, 235, 0.75))',
      }}
    >
      {/* 바벨 중심 바 (화이트/아이스 하이라이트) */}
      <path
        d="m6.5 6.5 11 11"
        stroke="#f0f9ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 바벨 끝단 팁 */}
      <path
        d="m21 21-1-1"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m3 3 1 1"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 바깥쪽 원판 플레이트 */}
      <path
        d="m18 22 4-4"
        stroke="#60a5fa"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m2 6 4-4"
        stroke="#60a5fa"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 안쪽 대형 원판 플레이트 */}
      <path
        d="m3 10 7-7"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m14 21 7-7"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
