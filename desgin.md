# ⚡ FitRoutine — Kinetic Pulse Design System (design.md)

---

## 1. Brand Identity & Vision (브랜드 정체성)

- **서비스 명칭:** FitRoutine (핏루틴)
- **슬로건:** *"Power Your Routine, Guided by Intelligence"* (지능형 AI가 완성하는 고성능 운동 기록 & 분할 루틴 솔루션)
- **핵심 키워드:** High-Performance, Focus-Driven, Electric Precision, AI-Assisted, Minimalist
- **브랜드 미션:**  
  불필요하고 산만한 기능을 과감히 배제하고, 운동 중 1초의 낭비도 없이 오직 **'운동 기록과 성장'** 본연의 가치에만 몰입할 수 있도록 돕는 최고의 고기능성 피트니스 워크스페이스를 제공합니다.

---

## 2. Visual Style & Tone & Manner (비주얼 스타일)

- **Overall Vibe:** 깊이감 있는 딥 다크 네이비(Deep Dark Navy) 기반의 사이버네틱 & 프로페셔널 피트니스 도구 감성.
- **Contrast & Energy:** 어두운 네이비 배경과 강렬한 **Electric Blue** 포인트의 선명한 대비를 통해 헬스장에서의 에너지와 훈련 집중력을 시각화.
- **Micro-Effects:**  
  - **Glassmorphism:** 불투명도가 조절된 컨테이너와 백드롭 블러(`backdrop-blur-md`).
  - **Subtle Borders:** `rgba(255, 255, 255, 0.1)`의 정밀하고 미세한 반투명 테두리.
  - **Electric Glow:** 주요 액션 버튼 및 AI 인터랙션 활성화 시 은은하게 퍼지는 네온 글로우(`shadow-[0_0_15px_rgba(37,99,235,0.3)]`).

---

## 3. Color Palette & Semantics (컬러 팔레트)

| 토큰명 | 컬러 코드 | 역할 및 사용 가이드 |
| :--- | :--- | :--- |
| **Background (Surface)** | `#0b1326` (Deep Dark Navy) | 시각적 피로도를 최소화하고 운동에만 집중시키는 깊은 배경색 |
| **Primary (Point)** | `#2563eb` / `#3b82f6` (Electric Blue) | 활동성과 고성능 AI 인텔리전스를 상징하는 핵심 액션 컬러 |
| **Surface Low** | `#131b2e` (Surface-Dark) | 일별 루틴 카드, 모달 팝업, 섹션의 기본 컨테이너 배경 |
| **Surface Container** | `#1c263d` (Surface-Elevated) | 세트/무게 입력창, 중첩 카드, 칩 버튼의 강조 배경 |
| **Headline Text** | `#ffffff` (Pure White) | 강한 대비를 가진 타이틀, 주요 볼륨 수치, 세트 숫자 |
| **Body / Muted Text** | `#9ca3af` (Greyish Blue) | 설명 문구, 플레이스홀더, 서브 라벨 |
| **AI Accent** | `#60a5fa` / `#93c5fd` (Cyan Blue) | Gemini AI 태깅 뱃지, 자연어 파싱 인디케이터 |
| **Subtle Border** | `rgba(255, 255, 255, 0.1)` | 컨테이너 경계를 정밀하게 구분하는 반투명 글래스 테두리 |
| **Alert / Warning** | `#ef4444` (Neon Red) | 운동명 누락 시 1.5초 레드 점멸 및 방어 피드백 |
| **Success** | `#10b981` (Emerald Green) | AI 추천 운동 반영 완료 및 체크 인디케이터 |

---

## 4. Typography & Numbers (타이포그래피 규격)

- **Font Family:** `Geist`, `Pretendard`, `Inter`, Sans-serif
- **Headline & Big Numbers:**  
  - 굵은 가중치(`font-bold`), 좁은 자간(`tracking-tight`), 모노스페이스 숫자(`font-mono tabular-nums`).
  - 운동 계측기처럼 정밀하고 전문적인 인상을 전달.
- **Body & Subtext:**  
  - 가독성을 최우선으로 하며, 넉넉한 줄 간격(`leading-relaxed`)과 편안한 톤 유지.

---

## 5. UI Components & Interaction Rules (컴포넌트 규칙)

1. **절제된 곡률 (Roundness: ROUND_FOUR):**
   - 과도하게 둥근 캡슐형 디자인을 지양하고, **4px ~ 8px (`rounded-md` / `rounded-lg`)** 의 정교한 곡률을 유지하여 신뢰성 있는 도구의 느낌 전달.
2. **고성능 버튼 (High-Performance Buttons):**
   - 꽉 찬 Electric Blue 배경에 고대비 텍스트 적용.
   - 클릭 시 미세한 스케일 다운(`active:scale-[0.98]`)과 은은한 블루 글로우 효과 제공.
3. **세트 및 중량 인풋 (Precision Input Fields):**
   - `#1c263d` 어두운 배경에 큼직한 `font-mono text-lg font-bold` 숫자로 운동 중 한 손 터치와 즉각적인 시인성 확보.
4. **AI 지능형 패널 (AI Smart Panels):**
   - Gemini AI 1:1 코칭 패널 및 자연어 빠른 기록 모달은 일렉트릭 블루 포인트와 정돈된 카드 레이아웃으로 직관적인 원클릭 반영 지원.

---

## 6. Layout & UX Philosophy (레이아웃 철학)

- **Single-Page Focus:**  
  페이지 새로고침이나 화면 이동 없이, 분할 루틴 선택 ➡️ 일별 운동/세트 기록 ➡️ AI 루틴 코칭 ➡️ 부위별 모아보기가 단일 화면 안에서 완결.
- **Information Density & Whitespace:**  
  정보 밀도가 높더라도 요소 간의 명확한 간격(Margin/Padding)과 글래스 테두리로 시각적 피로도를 제거하고 깔끔한 사용성 유지.
