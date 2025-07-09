/** POST: ModalRequest Types */
export type ModalRequest = { access_code: string }

/** 200 OK: ModalSuccessResponse Types */
export type QuestionSnapshot = {
  question_id: number
  type: '단일선택' | '다중선택' | 'ox' | '순서정렬' | '주관식' | '빈칸식'
  question: string
  prompt: string | null
  blank_count: number | null
  options_json: string[]
  point: number
}

/** 200 OK: ModalSuccessResponse Types */
export type ModalSuccessResponse = {
  id: number
  generation: {
    id: number
  }
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
  questions_snapshot_json: QuestionSnapshot[]
}
