# ⚡ Sprint 3: 인터랙션 강화 및 레이아웃 최적화

## 📋 스프린트 목표
운동 중 빠른 기록을 지원하기 위한 모바일 터치 인터랙션, 드래그앤드롭 순서 변경, 부드러운 아코디언 애니메이션, 그리고 분할 동기화를 최적화합니다.

---

## 🛠️ 세부 작업 항목 (Tasks) 및 진행 현황

### 1. 드래그 앤 드롭 (DnD) 순서 변경 고도화 ([`components/exercise-row.tsx`](../../components/exercise-row.tsx), [`components/day-section.tsx`](../../components/day-section.tsx))
- [x] 전용 그립 핸들 아이콘(`GripVertical`) 및 포인터 다운 시 드래그 활성화 로직
- [x] 드래그 중인 아이템 반투명 효과(`opacity-40`) 및 드래그 오버 대상 하이라이트(`border-primary ring-2 ring-primary/30`)
- [x] 리스트 배열 내 인덱스 스왑(Swap) 순서 재정렬 로직 안전성 검증

### 2. 아코디언 확장 및 세트 관리 인터랙션 ([`components/exercise-row.tsx`](../../components/exercise-row.tsx))
- [x] CSS Grid 기반 부드러운 아코디언 열림/닫힘 애니메이션 (`grid-rows-[0fr]` -> `grid-rows-[1fr]`)
- [x] 세트 추가(+) 및 세트 삭제 시 즉각적인 총 볼륨(총 무게 × 횟수) 실시간 계산 피드백
- [x] 세트별 번호 인덱스 자동 정렬

### 3. 분할(Split) 선택 및 섹션 탭 연동 ([`components/split-selector.tsx`](../../components/split-selector.tsx), [`components/workout-tracker.tsx`](../../components/workout-tracker.tsx))
- [x] '무분할', '2분할', '3분할', '4분할', '5분할' 탭 선택기 및 햅틱 스타일 UI
- [x] 활성 분할 변경 시 현재 일자(Day) 자동 연결 및 아코디언 상태 동기화
- [x] 하단 고정 플로팅 버튼(`운동 추가 (+)`)의 현재 활성 섹션 명칭 연동 (`[Day N ...]에 운동 추가`)
- [x] 하단 통합 부위별 모아보기에서 운동 클릭 시 해당 분할/일자로 스무스 스크롤 즉시 이동

---

## ✅ 완료 검증 (Verification Results)
1. **DnD 순서 변경:** 핸들 아이콘을 끌어서 1번 운동과 2번 운동의 순서가 배열 내에서 실시간으로 스왑됨을 확인.
2. **아코디언 토글:** 화살표 버튼 클릭 시 아코디언이 부드럽게 펼쳐지며 세트 무게/횟수 입력 폼이 노출됨을 확인.
3. **실시간 볼륨 계산:** 무게(예: 70)와 횟수(예: 10)를 입력하는 즉시 상단 헤더 및 개별 항목 우측 하단 볼륨이 `700 kg`으로 즉시 계산됨을 확인.
4. **플로팅 버튼 상호작용:** 화면을 스크롤해도 하단에 버튼이 떠 있으며, 터치 시 현재 활성화된 Day 섹션에 신규 운동이 추가되고 아코디언이 자동으로 펼쳐짐을 확인.
