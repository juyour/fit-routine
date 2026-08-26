# 🏋️ FitRoutine 개발 문서 (Docs)

본 문서는 **FitRoutine (단일 페이지 기반 가벼운 운동 기록 서비스)** 의 요구사항(PRD)을 완벽히 이행하고, 체계적인 스프린트 단위 개발을 진행하기 위한 개발 관리 체계입니다.

---

## 📂 문서 구성

| 문서 | 설명 | 경로 |
| :--- | :--- | :--- |
| **로드맵 (Roadmap)** | 전체 프로젝트 마일스톤 및 스프린트 요약 | [`docs/roadmap.md`](./roadmap.md) |
| **요구사항 추적표 (PRD Matrix)** | PRD 요구사항 및 5대 예외처리 검증 기준 | [`docs/prd-traceability-matrix.md`](./prd-traceability-matrix.md) |
| **Sprint 1** | 데이터 모델 확장 및 Mock-AI 태깅 시스템 구축 | [`docs/sprints/sprint-1-core-state-and-tagging.md`](./sprints/sprint-1-core-state-and-tagging.md) |
| **Sprint 2** | PRD 5대 예외 처리 및 방어 로직 완벽 구현 | [`docs/sprints/sprint-2-exception-handling.md`](./sprints/sprint-2-exception-handling.md) |
| **Sprint 3** | 인터랙션 강화 (드래그앤드롭, 아코디언, 플로팅 UI) | [`docs/sprints/sprint-3-interaction-and-ux.md`](./sprints/sprint-3-interaction-and-ux.md) |
| **Sprint 4** | PRD 성공 시나리오 E2E 검증 및 UI/UX 폴리싱 | [`docs/sprints/sprint-4-testing-and-polish.md`](./sprints/sprint-4-testing-and-polish.md) |

---

## 🎯 핵심 개발 원칙 (Core Principles)

1. **Strict PRD Adherence (PRD 완전 준수):**
   - 백엔드, 데이터베이스, 로그인 등 외부 인프라를 일체 배제한 순수 클라이언트 단일 페이지 웹 애플리케이션(SPA).
   - 새로고침 시 초기화되는 휘발성 로컬 메모리 상태 관리.
2. **5대 필수 예외 처리 방어 로직 구현:**
   - 1) Mock-AI 태깅 및 수동 태그(`isManualTagged`) 보호
   - 2) 운동명 누락 시 세트/무게 입력 시도 차단 + 1.5초 레드 블링크 & 강제 포커스
   - 3) 마지막 남은 1개 운동 항목 삭제 시 삭제 대신 빈칸 리셋
   - 4) 무게/횟수 비정상 입력 원천 차단 (정규식 마스킹, `-` 및 스페이스바 `preventDefault()`)
   - 5) 특정 부위 필터 활성화 상태에서 새 운동 추가 시 필터 강제 '전체' 초기화
3. **스프린트 기반 점진적 릴리즈:**
   - 각 스프린트별 명확한 산출물 및 완료 조건(Definition of Done) 정의.
