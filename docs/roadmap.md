# 🗺️ FitRoutine 개발 로드맵 (Roadmap)

본 로드맵은 PRD 요구사항 기반의 클라이언트 코어 기능(Sprint 1~4), **Google Gemini AI 지능형 서비스 확장(Sprint 5~6)**, 그리고 **Kinetic Grid Design System 전면 리뉴얼(Sprint 7)** 개발 현황입니다.

---

## 📊 스프린트 전체 일정 및 완료 현황

```mermaid
gantt
    title FitRoutine 전체 로드맵 현황
    dateFormat  YYYY-MM-DD
    section Phase 1 (Core SPA)
    Sprint 1 데이터 모델 & Mock-AI          :done, s1, 2026-08-26, 1d
    Sprint 2 PRD 5대 예외처리 & 방어로직    :done, s2, 2026-08-26, 1d
    Sprint 3 인터랙션 & 일별 자유 편집       :done, s3, 2026-08-26, 1d
    Sprint 4 E2E 시나리오 & 빌드 완성       :done, s4, 2026-08-26, 1d
    section Phase 2 (Gemini AI)
    Sprint 5 하이브리드 AI 태깅 & 자연어 파서:done, s5, 2026-08-27, 1d
    Sprint 6 1:1 맞춤형 AI 루틴 코칭 & 추천 :done, s6, 2026-08-27, 1d
    section Phase 3 (Kinetic Grid Design)
    Sprint 7 Kinetic Grid 디자인 시스템 리뉴얼:active, s7, 2026-08-27, 1d
```

---

## 🏃 스프린트별 상세 현황

### [Phase 1: 클라이언트 코어 기반 완성 (🟢 완료)]
- **Sprint 1:** 코어 상태 모델 & Mock-AI 자동 태깅 ([`sprint-1-core-state-and-tagging.md`](./sprints/sprint-1-core-state-and-tagging.md))
- **Sprint 2:** PRD 5대 필수 방어 로직 전수 구현 ([`sprint-2-exception-handling.md`](./sprints/sprint-2-exception-handling.md))
- **Sprint 3:** DnD 순서 변경, 아코디언 애니메이션, 일별 루틴 자유 편집 ([`sprint-3-interaction-and-ux.md`](./sprints/sprint-3-interaction-and-ux.md))
- **Sprint 4:** PRD 1분 시나리오 E2E 검증 및 프로덕션 빌드 0 에러 통과 ([`sprint-4-testing-and-polish.md`](./sprints/sprint-4-testing-and-polish.md))

---

### [Phase 2: Google Gemini AI 서비스 고도화 (🟢 완료)]
- **Sprint 5:** 하이브리드 AI 자동 태깅 & 자연어 기록 시스템 ([`sprint-5-gemini-ai-integration.md`](./sprints/sprint-5-gemini-ai-integration.md))
- **Sprint 6:** 1:1 맞춤형 AI 루틴 분석 & 볼륨 코칭 시스템 ([`sprint-6-ai-workout-coach.md`](./sprints/sprint-6-ai-workout-coach.md))

---

### [Phase 3: Kinetic Pulse Design System 리뉴얼 (🟡 진행 예정)]
- **Sprint 7:** Deep Dark Navy (`#0b1326`) 및 Electric Blue (`#2563eb`) 기반의 고기능성 다크 UI 리뉴얼 ([`sprint-7-kinetic-pulse-design-system.md`](./sprints/sprint-7-kinetic-pulse-design-system.md))
