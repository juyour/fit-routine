'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  Layers,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'

type LandingPageProps = {
  onStartTracker?: () => void
}

export function LandingPage({ onStartTracker }: LandingPageProps) {
  return (
    <div className="relative min-h-dvh bg-[#0b1326] text-white selection:bg-blue-600/30 selection:text-white antialiased">
      {/* 배경 은은한 블루 글로우 그라데이션 */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-[700px] right-0 -z-10 h-[400px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />

      {/* 1. 상단 네비게이션 헤더 */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1326]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Dumbbell className="size-5" />
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold tracking-tight text-white">
                FitRoutine
              </span>
              <span className="hidden items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 sm:inline-flex">
                <Sparkles className="size-3" />
                Gemini AI
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium text-gray-400 md:flex">
            <a href="#features" className="transition-colors hover:text-white">
              핵심 기능
            </a>
            <a href="#ai-coaching" className="transition-colors hover:text-white">
              AI 코칭 시스템
            </a>
            <a href="#workflow" className="transition-colors hover:text-white">
              작동 방식
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {onStartTracker ? (
              <button
                type="button"
                onClick={onStartTracker}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all duration-150 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95"
              >
                <span>앱 시작하기</span>
                <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <Link
                href="/tracker"
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all duration-150 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95"
              >
                <span>앱 시작하기</span>
                <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 2. 메인 히어로 섹션 */}
      <section className="relative px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* 상단 뱃지 */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#131b2e] px-3.5 py-1.5 text-xs font-semibold text-gray-300 shadow-inner">
            <span className="flex size-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-gray-200">Power Your Routine, Guided by Intelligence</span>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            복잡한 기록은 끝내고, <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              오직 성장에만 몰입하세요
            </span>
          </h1>

          {/* 서브 카피 */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            자연어 한 줄로 전체 세트를 자동 생성하는 <strong className="text-gray-200 font-semibold">Gemini AI 파서</strong>부터, 
            볼륨과 부위 밸런스를 진단하는 <strong className="text-gray-200 font-semibold">1:1 맞춤형 AI 코칭</strong>까지 — 
            1초의 낭비도 없는 고성능 피트니스 워크스페이스.
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {onStartTracker ? (
              <button
                type="button"
                onClick={onStartTracker}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/35 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <span>무료로 루틴 시작하기</span>
                <ArrowRight className="size-4" />
              </button>
            ) : (
              <Link
                href="/tracker"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/35 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <span>무료로 루틴 시작하기</span>
                <ArrowRight className="size-4" />
              </Link>
            )}

            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#131b2e]/80 px-6 py-3.5 text-sm font-semibold text-gray-300 transition-colors hover:bg-[#1c263d] hover:text-white sm:w-auto"
            >
              기능 미리보기
            </a>
          </div>

          {/* 신뢰 지표 태그 */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-blue-400" />
              0초 딜레이 초고속 기록
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-blue-400" />
              Google Gemini 3.6 AI 탑재
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-blue-400" />
              무분할 ~ 5분할 자유 편집
            </span>
          </div>
        </div>

        {/* 3. 라이브 인터랙티브 프리뷰 목업 카드 */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/15 bg-[#131b2e]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-3 rounded-full bg-red-500/80" />
              <span className="flex size-3 rounded-full bg-yellow-500/80" />
              <span className="flex size-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-gray-400">FitRoutine Interactive Live</span>
            </div>
            <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400">
              3분할 · Day 1 Push
            </span>
          </div>

          {/* 목업 내부 운동 리스트 */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="rounded-xl border border-white/10 bg-[#0b1326] p-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-6 items-center justify-center rounded bg-blue-600/20 font-mono text-xs font-bold text-blue-400">
                    1
                  </span>
                  <span className="text-sm font-bold text-white">벤치프레스</span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                    가슴
                  </span>
                </div>
                <span className="font-mono text-xs text-gray-400">3세트 · 2,400kg</span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-[#1c263d] p-2 text-center">
                  <span className="text-[10px] text-gray-400">1세트</span>
                  <p className="font-mono text-xs font-bold text-white">80kg × 10회</p>
                </div>
                <div className="rounded-lg bg-[#1c263d] p-2 text-center">
                  <span className="text-[10px] text-gray-400">2세트</span>
                  <p className="font-mono text-xs font-bold text-white">80kg × 10회</p>
                </div>
                <div className="rounded-lg bg-[#1c263d] p-2 text-center">
                  <span className="text-[10px] text-gray-400">3세트</span>
                  <p className="font-mono text-xs font-bold text-white">80kg × 10회</p>
                </div>
              </div>
            </div>

            {/* AI 코칭 피드백 미리보기 카드 */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/30 p-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Bot className="size-4" />
                <span>Gemini 1:1 AI 루틴 진단 피드백</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-300">
                &quot;벤치프레스 볼륨이 우수합니다. 상부 가슴 입체감을 위해 <strong className="text-blue-300">&#39;인클라인 덤벨 프레스&#39;</strong>를 보완해보세요.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 핵심 기능 3대 축 (Features Section) */}
      <section id="features" className="border-t border-white/10 bg-[#0e162b] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              피트니스에 최적화된 3가지 핵심 기술
            </h2>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              더 빠르고 정밀하게, 오직 운동에만 집중할 수 있는 차세대 도구입니다.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#131b2e] p-6 shadow-md transition-all hover:border-blue-500/40 hover:bg-[#162038]">
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
                <Sparkles className="size-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-white">
                AI 자연어 빠른 기록
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                &quot;벤치 80kg 10회 3세트, 사레레 10kg 15회&quot;처럼 편하게 적으면 AI가 종목, 세트, 무게를 완벽히 분해하여 즉시 등록합니다.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#131b2e] p-6 shadow-md transition-all hover:border-blue-500/40 hover:bg-[#162038]">
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
                <Bot className="size-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-white">
                1:1 맞춤형 AI 루틴 코칭
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                현재 루틴의 총 볼륨과 타겟 부위 밸런스를 전문 트레이너 관점에서 진단하고, 부족한 부위의 보완 운동을 원클릭으로 추천해 드립니다.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-[#131b2e] p-6 shadow-md transition-all hover:border-blue-500/40 hover:bg-[#162038]">
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
                <Layers className="size-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-white">
                자유로운 분할 & 부위별 모아보기
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                무분할부터 5분할까지 일자별 자유 수정, DnD 순서 변경, 전체 저장된 모든 운동을 부위별로 한눈에 모아보고 바로 이동할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 간편한 3단계 워크플로우 */}
      <section id="workflow" className="border-t border-white/10 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">
            How It Works
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            단 3단계로 끝나는 스마트한 루틴 관리
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border border-white/10 bg-[#131b2e] p-6">
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 font-mono text-xs font-bold text-white">
                1
              </span>
              <h4 className="mt-3 text-sm font-bold text-white">분할 & 루틴 구성</h4>
              <p className="mt-1 text-xs text-gray-400">
                목표에 맞는 분할을 고르고 일자별 루틴 명칭과 타겟 부위를 설정합니다.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-white/10 bg-[#131b2e] p-6">
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 font-mono text-xs font-bold text-white">
                2
              </span>
              <h4 className="mt-3 text-sm font-bold text-white">초고속 세트 기록</h4>
              <p className="mt-1 text-xs text-gray-400">
                직관적인 넘버 키패드 또는 AI 자연어 입력으로 세트를 순식간에 기록합니다.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-white/10 bg-[#131b2e] p-6">
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 font-mono text-xs font-bold text-white">
                3
              </span>
              <h4 className="mt-3 text-sm font-bold text-white">AI 진단 및 보완</h4>
              <p className="mt-1 text-xs text-gray-400">
                AI 진단하기 클릭 시 피드백과 함께 보완 운동을 즉시 루틴에 반영합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 전환 유도 Final CTA Section */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#0b1326] to-[#131b2e] px-4 py-20 text-center sm:px-6">
        <div className="mx-auto max-w-3xl">
          <span className="flex size-12 mx-auto items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/40">
            <Dumbbell className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            오늘의 운동, 지금 바로 스마트하게 기록하세요
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-gray-400 sm:text-sm">
            설치 없이 웹에서 즉시 사용할 수 있습니다. 고성능 AI 파트너와 함께 오늘 운동을 완벽하게 완성해보세요.
          </p>

          <div className="mt-8 flex justify-center">
            {onStartTracker ? (
              <button
                type="button"
                onClick={onStartTracker}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/40 transition-all duration-200 hover:bg-blue-500 hover:scale-105 active:scale-95"
              >
                <span>운동 기록 바로 시작하기</span>
                <ArrowRight className="size-4" />
              </button>
            ) : (
              <Link
                href="/tracker"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/40 transition-all duration-200 hover:bg-blue-500 hover:scale-105 active:scale-95"
              >
                <span>운동 기록 바로 시작하기</span>
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 7. 푸터 */}
      <footer className="border-t border-white/10 bg-[#080d1a] py-8 text-center text-xs text-gray-500">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded bg-blue-600 font-bold text-white text-[10px]">
              F
            </span>
            <span className="font-mono font-bold text-gray-300">FitRoutine</span>
            <span>— Kinetic Pulse Edition</span>
          </div>
          <p>© 2026 FitRoutine. High-performance workout logging powered by Gemini AI.</p>
        </div>
      </footer>
    </div>
  )
}
