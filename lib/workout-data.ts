export const MUSCLE_GROUPS = [
  '가슴',
  '등',
  '어깨',
  '삼두',
  '이두',
  '전완',
  '하체',
] as const

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number]

export const SPLITS = [
  { id: 'none', label: '무분할', days: 1 },
  { id: 'two', label: '2분할', days: 2 },
  { id: 'three', label: '3분할', days: 3 },
  { id: 'four', label: '4분할', days: 4 },
  { id: 'five', label: '5분할', days: 5 },
] as const

export type SplitId = (typeof SPLITS)[number]['id']

export type WorkoutSet = {
  id: string
  weight: string
  reps: string
}

export type Exercise = {
  id: string
  name: string
  muscle: MuscleGroup | null
  sets: WorkoutSet[]
}

export type WorkoutDay = {
  id: string
  /** 섹션 제목 (예: "가슴 · 삼두") */
  title: string
  /** 섹션 부제 (예: "Push") */
  subtitle: string
  /** 이 섹션이 담당하는 주요 부위 */
  focus: MuscleGroup[]
  exercises: Exercise[]
}

let counter = 0
export function uid(prefix = 'id') {
  counter += 1
  return `${prefix}-${counter}-${Math.random().toString(36).slice(2, 7)}`
}

function sets(rows: Array<[string, string]>): WorkoutSet[] {
  return rows.map(([weight, reps]) => ({ id: uid('set'), weight, reps }))
}

function ex(
  name: string,
  muscle: MuscleGroup | null,
  rows: Array<[string, string]>,
): Exercise {
  return { id: uid('ex'), name, muscle, sets: sets(rows) }
}

export function createEmptySet(): WorkoutSet {
  return { id: uid('set'), weight: '', reps: '' }
}

export function createEmptyExercise(muscle: MuscleGroup | null = null): Exercise {
  return { id: uid('ex'), name: '', muscle, sets: [createEmptySet()] }
}

function day(
  title: string,
  subtitle: string,
  focus: MuscleGroup[],
  exercises: Exercise[],
): WorkoutDay {
  return { id: uid('day'), title, subtitle, focus, exercises }
}

export const SAMPLE_ROUTINES: Record<SplitId, WorkoutDay[]> = {
  none: [
    day('전신', 'Full Body', ['하체', '가슴', '등'], [
      ex('바벨 백스쿼트', '하체', [
        ['100', '8'],
        ['100', '8'],
        ['110', '5'],
      ]),
      ex('벤치프레스', '가슴', [
        ['70', '10'],
        ['75', '8'],
      ]),
      ex('바벨 로우', '등', [['60', '12']]),
      ex('오버헤드 프레스', '어깨', [['40', '8']]),
    ]),
  ],
  two: [
    day('상체', 'Upper', ['가슴', '등', '어깨', '삼두', '이두'], [
      ex('인클라인 덤벨 프레스', '가슴', [
        ['24', '10'],
        ['26', '8'],
      ]),
      ex('랫풀다운', '등', [
        ['55', '12'],
        ['60', '10'],
      ]),
      ex('사이드 레터럴 레이즈', '어깨', [['10', '15']]),
      ex('케이블 푸시다운', '삼두', [['25', '15']]),
    ]),
    day('하체', 'Lower', ['하체'], [
      ex('레그 프레스', '하체', [
        ['150', '12'],
        ['170', '10'],
      ]),
      ex('루마니안 데드리프트', '하체', [['80', '10']]),
      ex('레그 컬', '하체', [['45', '15']]),
    ]),
  ],
  three: [
    day('가슴 · 삼두', 'Push', ['가슴', '삼두'], [
      ex('벤치프레스', '가슴', [
        ['70', '10'],
        ['75', '8'],
        ['75', '7'],
      ]),
      ex('케이블 크로스오버', '가슴', [['15', '15']]),
      ex('오버헤드 익스텐션', '삼두', [['20', '12']]),
    ]),
    day('등 · 이두', 'Pull', ['등', '이두'], [
      ex('랫풀다운', '등', [
        ['55', '12'],
        ['60', '10'],
        ['60', '9'],
      ]),
      ex('시티드 로우', '등', [
        ['50', '12'],
        ['55', '10'],
      ]),
      ex('덤벨 컬', '이두', [['14', '12']]),
      ex('리버스 리스트 컬', '전완', [['12', '15']]),
    ]),
    day('하체 · 어깨', 'Legs', ['하체', '어깨'], [
      ex('바벨 백스쿼트', '하체', [
        ['100', '8'],
        ['110', '5'],
      ]),
      ex('레그 익스텐션', '하체', [['50', '15']]),
      ex('오버헤드 프레스', '어깨', [['40', '8']]),
    ]),
  ],
  four: [
    day('가슴 · 삼두', 'Push', ['가슴', '삼두'], [
      ex('벤치프레스', '가슴', [
        ['70', '10'],
        ['75', '8'],
      ]),
      ex('펙덱 플라이', '가슴', [['40', '12']]),
      ex('케이블 푸시다운', '삼두', [['25', '15']]),
    ]),
    day('등 · 이두', 'Pull', ['등', '이두'], [
      ex('풀업', '등', [
        ['0', '10'],
        ['0', '8'],
      ]),
      ex('바벨 로우', '등', [['60', '12']]),
      ex('해머 컬', '이두', [['16', '10']]),
    ]),
    day('하체', 'Legs', ['하체'], [
      ex('레그 프레스', '하체', [
        ['150', '12'],
        ['170', '10'],
      ]),
      ex('루마니안 데드리프트', '하체', [['80', '10']]),
    ]),
    day('어깨 · 전완', 'Shoulder', ['어깨', '전완'], [
      ex('오버헤드 프레스', '어깨', [['40', '8']]),
      ex('사이드 레터럴 레이즈', '어깨', [['10', '15']]),
      ex('', null, [['', '']]),
    ]),
  ],
  five: [
    day('가슴', 'Chest', ['가슴'], [
      ex('벤치프레스', '가슴', [
        ['70', '10'],
        ['75', '8'],
      ]),
      ex('케이블 크로스오버', '가슴', [
        ['15', '15'],
        ['15', '15'],
      ]),
      ex('펙덱 플라이', '가슴', [['40', '12']]),
    ]),
    day('등', 'Back', ['등'], [
      ex('랫풀다운', '등', [
        ['55', '12'],
        ['60', '10'],
      ]),
      ex('시티드 로우', '등', [['50', '12']]),
    ]),
    day('어깨', 'Shoulder', ['어깨'], [
      ex('오버헤드 프레스', '어깨', [['40', '8']]),
      ex('사이드 레터럴 레이즈', '어깨', [['10', '15']]),
    ]),
    day('하체', 'Legs', ['하체'], [
      ex('바벨 백스쿼트', '하체', [
        ['100', '8'],
        ['110', '5'],
      ]),
      ex('레그 컬', '하체', [['45', '15']]),
    ]),
    day('팔 · 전완', 'Arms', ['이두', '삼두', '전완'], [
      ex('해머 컬', '이두', [['16', '10']]),
      ex('케이블 푸시다운', '삼두', [['25', '15']]),
      ex('리버스 리스트 컬', '전완', [['12', '15']]),
    ]),
  ],
}
