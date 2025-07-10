import type { ExamListResponseItem } from '@/types/examList/examList'

export interface ExamSendCodeRequest {
  access_token: string
}

export interface ExamSendCodeResponse {
  message: string
  exam_list: ExamListResponseItem[]
}
