import { GoogleGenAI } from '@google/genai'
import { MUSCLE_GROUPS, type MuscleGroup } from '@/lib/workout-data'

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''

/** 활성 Gemini 모델 상수 */
export const GEMINI_MODEL = 'gemini-3.6-flash'

/** Gemini AI 클라이언트 인스턴스 */
export const geminiClient = new GoogleGenAI({ apiKey })

/**
 * 1. AI 운동 부위 자동 분류기
 * Mock-AI 딕셔너리로 분류되지 않는 복합/특이 운동명을 Gemini가 7개 부위 중 하나로 정확하게 분류합니다.
 */
export async function classifyExerciseWithGemini(exerciseName: string): Promise<MuscleGroup | null> {
  if (!exerciseName.trim() || !apiKey) return null

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: `당신은 전문 보디빌딩 & 피트니스 트레이너입니다.
운동명 "${exerciseName}"의 주요 타겟 근육 부위를 오직 아래 7개 목록 중 가장 알맞은 단 1개만 골라서 단어로만 답하세요.
선택 가능 목록: [가슴, 등, 어깨, 삼두, 이두, 전완, 하체]

규칙:
- 부가 설명 없이 오직 부위 단어 1개(예: 가슴)만 출력하세요.
- 매칭이 불가능할 경우 "미지정"이라고만 출력하세요.`,
    })

    const text = response.text?.trim()
    if (text && (MUSCLE_GROUPS as readonly string[]).includes(text)) {
      return text as MuscleGroup
    }
    return null
  } catch (error: any) {
    console.error('Gemini Classification Error:', error?.message || error)
    return null
  }
}

/**
 * 2. AI 자연어 운동 기록 파서
 * 사용자가 입력한 자연어 문장(예: "벤치프레스 80kg 10회 3세트, 펙덱플라이 40kg 12회 4세트")을 구조화된 운동 데이터로 변환합니다.
 */
export type ParsedWorkoutItem = {
  name: string
  muscle: MuscleGroup | null
  sets: Array<{ weight: string; reps: string }>
}

export async function parseWorkoutTextWithGemini(text: string): Promise<ParsedWorkoutItem[]> {
  if (!text.trim() || !apiKey) return []

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: `당신은 피트니스 데이터 파서입니다.
사용자가 입력한 운동 기록 문장을 분석하여 순수 JSON 배열 형식으로 반환하세요.

입력 문장: "${text}"

출력 JSON 형식:
[
  {
    "name": "운동명 (예: 벤치프레스)",
    "muscle": "가슴|등|어깨|삼두|이두|전완|하체 중 하나 (없으면 null)",
    "sets": [
      { "weight": "무게(숫자 문자열, 예: '80')", "reps": "횟수(숫자 문자열, 예: '10')" }
    ]
  }
]

규칙:
- 반드시 유효한 JSON 형식만 출력하세요.
- 마크다운 코드블록(\`\`\`json)이나 부가 텍스트는 절대 포함하지 마세요.
- 만약 세트 수만 있고 개별 무게가 동일하면 세트 수만큼 sets 배열에 반복 추가하세요.`,
    })

    let raw = response.text?.trim() || '[]'
    raw = raw.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim()
    const parsed = JSON.parse(raw) as ParsedWorkoutItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch (error: any) {
    console.error('Gemini Parsing Error:', error?.message || error)
    return []
  }
}

/**
 * 3. AI 루틴 진단 및 추천 코치 (피드백 텍스트 + 구조화된 추천 운동 배열)
 */
export type RecommendedExerciseItem = {
  name: string
  muscle: MuscleGroup | null
  reason?: string
  sets: Array<{ weight: string; reps: string }>
}

export type AiCoachingResult = {
  feedbackText: string
  recommendedExercises: RecommendedExerciseItem[]
}

export async function getRoutineAiCoaching(routineTitle: string, exercises: any[]): Promise<AiCoachingResult> {
  if (!apiKey) {
    return {
      feedbackText: 'Gemini API 키가 설정되지 않았습니다.',
      recommendedExercises: [],
    }
  }

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: `당신은 친절하고 전문적인 1:1 퍼스널 트레이너(PT)입니다.
현재 사용자의 루틴 "${routineTitle}"에 등록된 운동 목록을 보고 볼륨과 밸런스를 진단한 뒤, 피드백과 함께 루틴에 바로 추가할 수 있는 추천 보완 운동(1~2개)을 순수 JSON 형식으로 출력하세요.

현재 등록된 운동:
${JSON.stringify(exercises, null, 2)}

출력 JSON 스키마:
{
  "feedbackText": "1) 루틴 총평 (볼륨/밸런스 평가)\\n2) 추천 보완 이유\\n3) 안전 및 수행 팁",
  "recommendedExercises": [
    {
      "name": "추천 운동명 (예: 인클라인 덤벨 프레스)",
      "muscle": "가슴|등|어깨|삼두|이두|전완|하체 중 1개",
      "reason": "추천 이유 (예: 상부 가슴 볼륨 보완)",
      "sets": [
        { "weight": "20", "reps": "12" },
        { "weight": "22", "reps": "10" },
        { "weight": "24", "reps": "8" }
      ]
    }
  ]
}

규칙:
- 반드시 유효한 JSON 포맷으로만 응답하세요.
- 마크다운 코드블록(\`\`\`json)이나 부가 텍스트는 절대 포함하지 마세요.
- 추천 운동의 세트는 입문자~중급자가 수행하기 좋은 3세트 권장 무게와 횟수를 포함하세요.`,
    })

    let raw = response.text?.trim() || '{}'
    raw = raw.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim()
    const parsed = JSON.parse(raw) as AiCoachingResult

    return {
      feedbackText: parsed.feedbackText || '루틴 분석이 완료되었습니다.',
      recommendedExercises: Array.isArray(parsed.recommendedExercises) ? parsed.recommendedExercises : [],
    }
  } catch (error: any) {
    console.error('Gemini Coaching Error:', error?.message || error)
    return {
      feedbackText: `루틴 분석 중 오류가 발생했습니다: ${error?.message || '잠시 후 다시 시도해주세요.'}`,
      recommendedExercises: [],
    }
  }
}
