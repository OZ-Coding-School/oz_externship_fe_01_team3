export type ExamResult = {
  id: number
  title: string
  thumbnail?: string
  totalQuestions: number
  questions: ExamQuestion[]
  cheatingCount: number
}

export type ExamQuestion = {
  questionId: number
  type: string
  question: string
  prompt?: string | null
  blankCount?: number | null
  options?: string[]
  studentAnswer: string[]
  correctAnswer: string[]
  point: number
  explanation: string
  isCorrect: boolean
}
