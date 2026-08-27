# 🧠 Sprint 6: 1:1 맞춤형 AI 루틴 분석 & 볼륨 코칭 시스템

## 📋 스프린트 목표
사용자가 기록한 일별 루틴의 운동 종목, 총 볼륨, 타겟 부위 밸런스를 Gemini AI가 분석하여 전문 트레이너 관점의 맞춤형 피드백과 보완 운동을 제안합니다.

---

## 🛠️ 세부 작업 항목 (Tasks) 및 진행 현황

### 1. AI 루틴 분석 패널 컴포넌트 ([`components/ai-coach-panel.tsx`](../../components/ai-coach-panel.tsx))
- [x] 각 Day 섹션 내 "Gemini 1:1 AI 루틴 코칭 & 밸런스 피드백" 전용 패널 구축
- [x] `/api/gemini/coach` 서버 엔드포인트 연동 및 로딩 스피너 UI 구현
- [x] 부위 밸런스 총평, 추천 보완 운동, 안전 팁 구조화 렌더링

### 2. 루틴 연동 및 원클릭 AI 제안 반영 ([`components/day-section.tsx`](../../components/day-section.tsx))
- [x] Day별 등록된 운동 종목 및 세트 데이터가 실시간으로 코칭 API에 전달
- [x] 원클릭 피드백 생성 및 실시간 재진단(새로고침) 버튼 지원

### 3. 품질 및 빌드 검증
- [x] TypeScript 0 Error 정적 검사 통과
- [x] Next.js 런타임 정상 가동

---

## ✅ 완료 검증 (Verification Results)
1. **AI 코칭 생성:** Day 섹션의 "진단하기" 클릭 시 Gemini 2.5 Flash가 현재 루틴의 부위 밸런스를 진단하고 3줄 맞춤형 조언을 즉시 생성함.
2. **반응형 UI:** 모바일 및 데스크톱 환경에서 카드 형태로 깔끔하게 피드백 렌더링 확인.
