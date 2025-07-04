export interface ExamModalRequest {
  access_code: string
}

export type QuestionType =
  | 'multiple_choice_single'
  | 'multiple_choice_multiple'
  | 'ox'
  | 'ordering'
  | 'short_answer'
  | 'fill_in_blank'

export interface QuestionSnapshot {
  question_id: number
  type: QuestionType
  question: string
  prompt: string | null
  blank_count: number | null
  options_json: string[]
  point: number
}

export interface Subject {
  id: number
  title: string
}

export interface Test {
  id: number
  title: string
  subject: Subject
  thumbnail_img_url: string
}

export interface Generation {
  id: number
}

/** 200 OK: ModalSuccessResponse Types */
export interface ModalSuccessResponse {
  id: number
  test: Test
  duration_time: number
  questions_snapshot_json: QuestionSnapshot[]
}

export interface ModalErrorResponse {
  detail: string
}
