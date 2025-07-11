import type { ExamListResponseItem } from '@/types/examList/examList'

export interface ExamSendCodeRequest {
  access_token: string
}

export interface ExamSendCodeResponse {
  message: string
  exam_list: ExamListResponseItem[]
}

export interface ExamSendCodeRequest {
  access_token: string
}

export interface ExamSendCodeResponse {
  message: string
  exam_list: ExamListResponseItem[]
}

export interface TestStartRequest {
  access_code: string
}

export interface TestStartResponse {
  id: number
  test: {
    id: number
    title: string
    subject: {
      id: number
      title: string
    }
    thumbnail_img_url: string
  }
  duration_time: number
  questions_snapshot_json: Question[]
}

export interface Question {
  question_id: number
  type:
    | 'multiple_choice_single'
    | 'multiple_choice_multiple'
    | 'ox'
    | 'ordering'
    | 'short_answer'
    | 'fill_in_blank'
  question: string
  prompt: string | null
  blank_count: number | null
  options_json: string[]
  point: number
}

export interface ErrorResponse {
  detail: string
}
