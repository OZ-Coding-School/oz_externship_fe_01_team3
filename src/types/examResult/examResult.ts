export type ExamResult = {
  id: number
  cheating_count: number
  answers_json: {
    [questionId: string]: string[]
  }
  deployment: {
    id: number
    test: {
      id: number
      title: string
      thumbnail_img_url: string
    }
    questions_snapshot_json: ExamQuestion[]
  }
}

export type ExamQuestion = {
  question_id: number
  type: string
  question: string
  prompt: string | null
  blank_count: number | null
  options_json: string[]
  answer: string[]
  point: number
  explanation: string
}
