'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpDown,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Dumbbell,
  Layers,
  Lock,
  Play,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'

import { NeonDumbbellIcon } from '@/components/neon-dumbbell-icon'

type LandingPageProps = {
  onStartTracker?: () => void
}

export function LandingPage({ onStartTracker }: LandingPageProps) {
  return (
    <div className="relative min-h-dvh bg-[#0b1326] text-[#dae2fd] antialiased overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      {/* 1. TopAppBar 헤더 */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0b1326]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg border border-blue-500/30 bg-[#0f172a] shadow-[0_0_12px_rgba(37,99,235,0.3)]">
              <NeonDumbbellIcon size={18} />
            </span>
            <span className="font-mono text-base font-bold tracking-tight text-white sm:text-lg">
              KINETIC <span className="text-blue-400 font-sans font-semibold text-sm">FitRoutine</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 text-xs font-medium text-gray-400 md:flex">
              <a href="#features" className="transition-colors hover:text-white">
                핵심 기능
              </a>
              <a href="#workflow" className="transition-colors hover:text-white">
                작동 방식
              </a>
            </nav>

            {onStartTracker ? (
              <button
                type="button"
                onClick={onStartTracker}
                className="rounded-full bg-blue-600 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/50 active:scale-95"
              >
                START
              </button>
            ) : (
              <Link
                href="/tracker"
                className="rounded-full bg-blue-600 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/50 active:scale-95"
              >
                START
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="pt-20 pb-28">
        {/* 2. Hero Section (bg-grid-pattern 적용) */}
        <section className="relative flex min-h-[720px] items-center justify-center bg-grid-pattern px-4 py-20 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1326]/40 to-[#0b1326]" />

          <div className="relative z-10 mx-auto max-w-4xl space-y-7 text-center">
            {/* 캡슐 뱃지 */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#2d3449]/70 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-blue-300 backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
              LIGHTWEIGHT. FAST. PRIVATE.
            </div>

            {/* 헤드라인 (glow-text) */}
            <h1 className="glow-text text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-[64px]">
              불필요한 기능은 빼고,<br />
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                기록에만 집중하세요.
              </span>
            </h1>

            {/* 서브 카피 */}
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
              로그인도, 복잡한 설정도 필요 없습니다. 오직 순수한 속도와 당신의 운동 데이터만 존재합니다.
              직관적인 1페이지 인터페이스와 Gemini AI로 운동을 완벽하게 통제하세요.
            </p>

            {/* 메인 CTA 버튼 */}
            <div className="pt-4">
              {onStartTracker ? (
                <button
                  type="button"
                  onClick={onStartTracker}
                  className="rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-10 py-4 font-bold text-base text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:scale-95"
                >
                  지금 시작하기
                </button>
              ) : (
                <Link
                  href="/tracker"
                  className="inline-block rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-10 py-4 font-bold text-base text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 active:scale-95"
                >
                  지금 시작하기
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 3. Features Bento Grid (code.html 기반 12-Column 레이아웃) */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Feature 1: 지능형 AI 태깅 & 자연어 기록 (col-span-8) */}
            <div className="glass-card group rounded-2xl p-7 transition-colors duration-300 hover:bg-[#171f33] md:col-span-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#222a3d] text-blue-400">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">지능형 AI 태깅 & 자연어 기록</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:text-sm">
                    운동 이름을 입력하면 자동으로 부위와 종류를 태깅합니다. 복잡한 선택 과정 없이 타이핑하거나 문장 한 줄로 전체 세트를 즉시 생성하세요.
                  </p>
                </div>
              </div>

              {/* 콘솔형 터미널 인터랙션 프리뷰 */}
              <div className="rounded-xl border border-white/10 bg-[#020617] p-4 font-mono text-xs text-gray-400">
                <div className="mb-2 flex items-center gap-2 text-gray-200">
                  <span className="text-blue-400 font-bold">&gt;</span>
                  <span>Bench Press 80kg 10reps × 3sets</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded bg-[#222a3d] px-2.5 py-1 text-xs font-semibold text-blue-400">
                    #가슴
                  </span>
                  <span className="rounded bg-[#222a3d] px-2.5 py-1 text-xs font-semibold text-indigo-300">
                    #Barbell
                  </span>
                  <span className="rounded bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 text-xs font-semibold text-blue-300">
                    ✨ Gemini 3.6 Flash
                  </span>
                </div>
              </div>
            </div>

            {/* Feature 2: 완전한 프라이버시 (col-span-4) */}
            <div className="glass-card group rounded-2xl p-7 transition-colors duration-300 hover:bg-[#171f33] md:col-span-4">
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#222a3d] text-blue-400">
                <Lock className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">완전한 프라이버시</h3>
              <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                모든 데이터는 기기에 즉시 저장됩니다. 번거로운 가입 절차 없이 오직 당신만의 훈련 기록에 집중하세요.
              </p>
            </div>

            {/* Feature 3: 드래그 & 드롭 순서 편집 (col-span-12) */}
            <div className="glass-card group flex flex-col items-center gap-8 rounded-2xl p-7 transition-colors duration-300 hover:bg-[#171f33] md:col-span-12 md:flex-row">
              <div className="flex-1 space-y-3">
                <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#222a3d] text-blue-400">
                  <ChevronUp className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-white">원터치 순서 변경 & 자유로운 루틴 커스텀</h3>
                <p className="max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
                  모바일에서도 탭 한 번으로 운동 순서를 손쉽게 변경하고 세트를 관리하세요. 번거로운 메뉴 이동 없이 한 화면에서 모든 흐름이 완결됩니다.
                </p>
              </div>

              {/* 추상 UI 프리뷰 (원터치 순서 변경 카드 시각화) */}
              <div className="relative w-full space-y-2.5 overflow-hidden rounded-xl border border-white/10 bg-[#020617] p-4 md:w-1/2">
                <div className="pointer-events-none absolute right-0 top-0 size-32 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#171f33] p-3 opacity-60">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded bg-[#222a3d] font-mono text-[10px] font-bold text-gray-400">
                      1
                    </span>
                    <span className="font-mono text-xs font-bold text-white">Squat</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-blue-400">5 Sets</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-blue-500/50 bg-[#171f33] p-3 shadow-[0_0_15px_rgba(37,99,235,0.25)] scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-blue-400 text-[10px]">▲</span>
                      <span className="text-blue-400 text-[10px]">▼</span>
                    </div>
                    <span className="flex size-5 items-center justify-center rounded bg-blue-600 font-mono text-[10px] font-bold text-white">
                      2
                    </span>
                    <span className="font-mono text-xs font-bold text-white">Deadlift</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-blue-400">3 Sets · 2,800kg</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-[#171f33] p-3 opacity-60">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded bg-[#222a3d] font-mono text-[10px] font-bold text-gray-400">
                      3
                    </span>
                    <span className="font-mono text-xs font-bold text-white">Leg Press</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-blue-400">4 Sets</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works (Simple Workflow) */}
        <section id="workflow" className="border-y border-white/5 bg-[#060e20] py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">
              Simple Workflow
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl mb-16">
              3단계로 끝나는 스마트한 루틴 관리
            </h2>

            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
              {/* 중앙 연결선 */}
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full border-2 border-blue-500 bg-[#020617] shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                  <span className="font-mono text-xl font-bold text-blue-400">1</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">분할 선택</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  무분할부터 5분할까지 오늘 진행할 운동 루틴을 선택하고 자유롭게 명칭을 편집합니다.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full border-2 border-blue-500 bg-[#020617] shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                  <span className="font-mono text-xl font-bold text-blue-400">2</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">종목 & 세트 추가</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  원하는 운동을 입력하거나 AI 자연어 빠른 기록으로 세트를 한 번에 구성합니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full border-2 border-blue-500 bg-[#020617] shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                  <span className="font-mono text-xl font-bold text-blue-400">3</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">기록 & AI 코칭</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  수행 무게와 횟수를 입력하고, Gemini 1:1 맞춤형 피드백을 루틴에 바로 반영합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Final CTA Section */}
        <section className="px-4 py-28 text-center sm:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="glow-text text-3xl font-extrabold tracking-tight text-white sm:text-5xl mb-5">
              복잡한 설정 없이,<br />
              오늘 바로 운동을 기록해보세요.
            </h2>
            <p className="mx-auto max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm mb-10">
              가볍고 빠른 인터페이스로 당신의 운동 퍼포먼스를 극대화하세요.
            </p>

            {onStartTracker ? (
              <button
                type="button"
                onClick={onStartTracker}
                className="rounded-xl bg-blue-600 px-12 py-4 font-bold text-base text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] active:scale-95"
              >
                시작하기
              </button>
            ) : (
              <Link
                href="/tracker"
                className="inline-block rounded-xl bg-blue-600 px-12 py-4 font-bold text-base text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] active:scale-95"
              >
                시작하기
              </Link>
            )}
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="w-full border-t border-white/5 bg-[#060e20] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-8">
          <span className="font-mono text-sm font-bold text-blue-400">
            KINETIC GRID · FitRoutine
          </span>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="transition-colors hover:text-blue-400">PRIVACY</a>
            <a href="#" className="transition-colors hover:text-blue-400">GITHUB</a>
            <a href="#" className="transition-colors hover:text-blue-400">SUPPORT</a>
          </div>
          <span className="text-xs text-gray-500">
            © 2026 KINETIC GRID. NO LOGIN. NO TRACKING.
          </span>
        </div>
      </footer>
    </div>
  )
}
