# 🤖 Sprint 5: Google Gemini AI 연동 및 하이브리드 지능형 태깅 & 자연어 기록 시스템

## 📋 스프린트 목표
실제 Google Gemini API(`gemini-2.5-flash`)를 연동하여, 기존 Mock-AI 딕셔너리의 한계를 극복하는 **하이브리드 자동 태깅 시스템**과 문장 하나로 전체 세트가 등록되는 **자연어 운동 기록 파서**를 구축하고 검증합니다.

---

## 🛠️ 세부 작업 항목 (Tasks) 및 진행 현황

### 1. Gemini AI SDK 환경 구축 ([`lib/gemini.ts`](../../lib/gemini.ts))
- [x] `@google/genai` 공식 SDK 설치 및 API 클라이언트 인스턴스화
- [x] 서버사이드 API 라우트 핸들러 구축 (`/api/gemini/classify`, `/api/gemini/parse`, `/api/gemini/coach`)
- [x] `.env` 보안 설정 및 `.gitignore` 비밀키 보호 무결성 검증

### 2. 하이브리드 AI 자동 태깅 엔진 ([`components/exercise-row.tsx`](../../components/exercise-row.tsx))
- [x] 1차: 로컬 `WORKOUT_KEYWORD_DICT` 딕셔너리로 초고속(0ms) 키워드 매칭
- [x] 2차: 미등록된 복합/특이 운동명(예: "불가리안 스플릿 스쿼트", "디클라인 프레스") 입력 시 600ms 디바운스 후 Gemini API(`/api/gemini/classify`)로 실시간 정밀 분류
- [x] 분류 진행 중 "AI 분류중..." 로딩 인디케이터 표시
- [x] 수동 변경 잠금(`isManualTagged`) 로직과의 완벽한 호환성 유지

### 3. AI 자연어 빠른 기록 모달 (`AI Quick Log ✨`) ([`components/ai-quick-log-modal.tsx`](../../components/ai-quick-log-modal.tsx))
- [x] 상단 헤더 및 하단 플로팅 영역에 "AI 빠른 기록 ✨" 버튼 배치
- [x] 사용자 자연어 입력창 (예: *"벤치프레스 80kg 10회 3세트하고 사레레 10kg 15회 3세트 했어"*) 및 추천 예시 칩 제공
- [x] Gemini 파싱 결과를 실시간 운동 객체 배열로 변환하여 현재 활성 Day 루틴에 즉시 일괄 추가

---

## ✅ 완료 검증 (Verification Results)
1. **하이브리드 AI 분류:** 사전에 없는 특이 운동명 입력 시 Gemini API가 7개 부위 중 하나로 자동 매칭 완료.
2. **자연어 일괄 파싱:** 자연어 문장 입력 시 운동명, 세트, 무게, 횟수가 일괄 파싱되어 루틴에 정상 삽입 확인.
3. **타입스크립트 & 빌드:** `npx tsc --noEmit` 0 Error 통과.
