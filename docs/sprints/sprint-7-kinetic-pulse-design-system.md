# ⚡ Sprint 7: Kinetic Pulse Design System (FitRoutine UI 전면 리뉴얼 계획서)

본 문서는 [`design.md`](../../design.md) (Kinetic Pulse Design System)의 브랜드 비전과 디자인 토큰 규격을 바탕으로, FitRoutine의 전체 UI 톤앤매너, 컬러 시스템, 컴포넌트 스타일을 고성능 일렉트릭 다크 네이비 테마로 리뉴얼하기 위한 세부 계획서입니다.

---

## 🎯 브랜드 비전 & 디자인 개편 핵심 목표

> **"Power Your Routine, Guided by Intelligence"**  
> 불필요하고 산만한 요소를 배제하고, 운동 중 1초의 낭비도 없이 오직 **'운동 기록과 성장'** 본연의 가치에만 몰입할 수 있도록 돕는 최고의 고기능성 피트니스 워크스페이스 구축.

1. **High-Performance Deep Dark Navy (`#0b1326`)**:
   - 시각적 피로도를 최소화하고 운동에만 극도로 집중할 수 있는 딥 다크 네이비 테마를 기본으로 정립.
2. **Electric Blue Precision (`#2563eb` / `#3b82f6`)**:
   - 활동성과 Gemini AI 인텔리전스를 상징하는 강렬한 일렉트릭 블루 포인트 및 은은한 네온 글로우(`shadow-[0_0_15px_rgba(37,99,235,0.3)]`) 적용.
3. **Glassmorphism & Crisp Precision**:
   - Surface-Low (`#131b2e`)와 Surface-Container (`#1c263d`)의 명확한 위계 구분, 미세한 반투명 테두리(`rgba(255, 255, 255, 0.1)`), 절제된 4px~8px 곡률(`ROUND_FOUR`)을 적용하여 전문 운동 기기의 정밀함 구현.

---

## 🎨 디자인 시스템 토큰 매핑 명세

| 디자인 요소 | Kinetic Pulse 토큰 ([`design.md`](../../design.md)) | CSS 변수 및 Tailwind 적용 방안 |
| :--- | :--- | :--- |
| **Background** | `#0b1326` (Deep Dark Navy) | `--background: #0b1326;` (기본 배경) |
| **Surface Low** | `#131b2e` (Surface-Dark) | `--card: #131b2e;`, `--popover: #131b2e;` |
| **Surface Container** | `#1c263d` (Surface-Elevated) | `--secondary: #1c263d;`, `--muted: #1c263d;` |
| **Primary Point** | `#2563eb` / `#3b82f6` (Electric Blue) | `--primary: #2563eb;`, `--ring: #3b82f6;` |
| **Headline Text** | `#ffffff` (Pure White, High Contrast) | `--foreground: #ffffff;`, `font-bold tracking-tight` |
| **Body / Muted** | `#9ca3af` (Greyish Blue Muted) | `--muted-foreground: #9ca3af;` |
| **Border / Stroke** | `rgba(255, 255, 255, 0.1)` | `--border: rgba(255, 255, 255, 0.1);` |
| **Roundness** | `4px ~ 8px` (ROUND_FOUR) | `--radius: 0.375rem;` (6px 기준, `rounded-md`/`rounded-lg`) |
| **Warning / Alert** | `#ef4444` (Neon Red) | `--destructive: #ef4444;` (1.5초 레드 점멸 방어 피드백) |
| **Success** | `#10b981` (Emerald Green) | `--success: #10b981;` (AI 추천 운동 반영 완료) |

---

## 🛠️ 컴포넌트별 리뉴얼 세부 작업 계획 (Step-by-Step)

### Step 1. 글로벌 테마 및 디자인 토큰 재정의 ([`app/globals.css`](../../app/globals.css))
- 기본 테마를 Deep Dark Navy (`#0b1326`) 기반으로 완전 고정.
- Glassmorphism 유틸리티(`backdrop-blur-md`, `border-white/10`) 및 Electric Glow(`shadow-[0_0_15px_rgba(37,99,235,0.3)]`) 유틸리티 등록.
- 타이포그래피: Geist Sans & Mono 폰트의 볼드 웨이트, 자간(`tracking-tight`) 및 숫자 가독성 최적화.

### Step 2. 상단 헤더 & 분할 선택기 리뉴얼 ([`components/split-selector.tsx`](../../components/split-selector.tsx))
- **헤더:** 고대비 순백색 타이틀 + 일렉트릭 블루 뱃지 + 네이비 글래스모피즘 스탯(Sets/Volume) 박스.
- **분할 선택기:** `#131b2e` 베이스 컨테이너 위 활성 탭에 강렬한 `#2563eb` 배경과 화이트 볼드 텍스트 적용.

### Step 3. 일별 루틴 아코디언 카드 리뉴얼 ([`components/day-section.tsx`](../../components/day-section.tsx))
- Day 카드: `#131b2e` 배경 + `rgba(255, 255, 255, 0.1)` 정밀 테두리.
- 활성 Day: 좌측 일렉트릭 인디케이터 바 및 은은한 블루 보더 하이라이트.
- Day 인덱스 뱃지: 네이비 컨테이너 위 굵은 계측기형 타이포그래피.

### Step 4. 운동 및 세트 입력 행 리뉴얼 ([`components/exercise-row.tsx`](../../components/exercise-row.tsx))
- 운동명 인풋: 다크 네이비 배경 위 고대비 화이트 텍스트, 포커스 시 일렉트릭 블루 링.
- 부위 칩: 일렉트릭 블루 아웃라인 및 다크 톤 뱃지.
- 세트/무게 입력창: `#1c263d` 컨테이너 + 화이트 볼드 숫자 폰트(18px font-mono) + 컴팩트 8px 곡률.
- 오류/검증 피드백: 네온 레드 펄스 효과 유지.

### Step 5. AI 지능형 컴포넌트 리뉴얼
- **AI 빠른 기록 모달 ([`components/ai-quick-log-modal.tsx`](../../components/ai-quick-log-modal.tsx)):** 다크 글래스모피즘 팝업 + 일렉트릭 블루 글로우 버튼.
- **AI 1:1 코칭 패널 ([`components/ai-coach-panel.tsx`](../../components/ai-coach-panel.tsx)):** `#1c263d` 네이비 카드 + 블루 포인트 라인 + 추천 운동 원클릭 반영 버튼 고대비 스타일링.

### Step 6. 하단 전체 모아보기 및 플로팅 바 리뉴얼 ([`components/workout-tracker.tsx`](../../components/workout-tracker.tsx))
- 부위별 모아보기: 네이비 컨테이너와 화이트 보더 칩 필터 적용.
- 하단 플로팅 액션 바: 딥 다크 네이비 글래스모피즘 플로팅 + 일렉트릭 블루 고성능 버튼.

---

## 🧪 검증 및 배포 계획
1. 로컬 환경에서 모든 컴포넌트의 딥 다크 톤앤매너 및 고대비 가독성 전수 검증.
2. `npx tsc --noEmit` 타입 검사 및 Next.js 16 빌드 무결성 확인.
3. Vercel 프로덕션 자동 배포(`npx vercel --prod --yes`)를 통한 라이브 서비스 즉시 반영.
