# 📋 PRD 요구사항 추적 매트릭스 (Traceability Matrix)

본 매트릭스는 PRD의 모든 항목이 어떤 파일, 컴포넌트, 스프린트에서 구현 및 검증되는지 매핑합니다.

---

## 🎯 기능 및 화면 명세 추적

| PRD 항목 | 내용 | 담당 파일/컴포넌트 | 담당 스프린트 | 검증 상태 |
| :--- | :--- | :--- | :--- | :--- |
| **화면 구조** | 단일 화면(SPA), 스크롤 가능 상하 구조 | [`app/page.tsx`](../app/page.tsx), [`components/workout-tracker.tsx`](../components/workout-tracker.tsx) | Sprint 1, 3 | 🟡 대기 |
| **분할 선택기** | 무분할, 2분할, 3분할, 4분할, 5분할 퀵 탭 | [`components/split-selector.tsx`](../components/split-selector.tsx) | Sprint 3 | 🟡 대기 |
| **필터 영역** | 전체 및 7개 부위 칩 가로 스크롤 | [`components/tag-filter.tsx`](../components/tag-filter.tsx) | Sprint 1 | 🟡 대기 |
| **개별 운동 행** | 드래그핸들, 운동명, 태그칩, 삭제 버튼 | [`components/exercise-row.tsx`](../components/exercise-row.tsx) | Sprint 1, 2 | 🟡 대기 |
| **아코디언 폼** | 세트번호, 무게(kg), 횟수(reps), 삭제, 세트추가 | [`components/exercise-row.tsx`](../components/exercise-row.tsx) | Sprint 2, 3 | 🟡 대기 |
| **플로팅 액션** | 하단 고정 운동 추가 (+) 버튼 | [`components/workout-tracker.tsx`](../components/workout-tracker.tsx) | Sprint 3 | 🟡 대기 |
| **Mock-AI 태깅** | 딕셔너리 기반 실시간 부위 자동 분류 | [`lib/workout-data.ts`](../lib/workout-data.ts), [`components/exercise-row.tsx`](../components/exercise-row.tsx) | Sprint 1 | 🟡 대기 |

---

## 🛡️ 5대 예외 처리 (Exception Handling) 추적

| 예외 번호 | PRD 요구사항 | 구현 로직 및 방어책 | 담당 컴포넌트 | 담당 스프린트 |
| :--- | :--- | :--- | :--- | :--- |
| **예외 1** | 태그 매칭 실패 및 수동 변경 보존 | 매칭 실패 시 '미지정' 태그 표출 / 수동 변경 시 `isManualTagged=true`로 자동 매칭보다 우선 적용 | `workout-data.ts`, `exercise-row.tsx` | Sprint 1, 2 |
| **예외 2** | 운동명 누락 시 세트/무게 입력 시도 | 무게/횟수 포커스 차단 + 운동명 필드 1.5초 레드 블링크 애니메이션 & 포커스 강제 이동 | `exercise-row.tsx` | Sprint 2 |
| **예외 3** | 마지막 1개 운동 항목 삭제 시도 | 배열 길이 1일 때 삭제 대신 빈칸(운동명 `""`, 태그 `미지정`, 세트 초기화)으로 리셋 | `workout-tracker.tsx`, `day-section.tsx` | Sprint 2 |
| **예외 4** | 비정상 무게/횟수 입력 | 숫자(0-9), 소수점 1개만 허용 / `-` 및 스페이스바 키다운 `preventDefault()`로 원천 차단 | `exercise-row.tsx` | Sprint 2 |
| **예외 5** | 필터링 상태에서 새 운동 추가 | 하단/섹션 추가 버튼 클릭 즉시 필터를 '전체'(`all`)로 강제 초기화하여 신규 항목 노출 | `workout-tracker.tsx` | Sprint 2 |
