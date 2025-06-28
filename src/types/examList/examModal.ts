/** POST: ModalRequest Types */
export type ModalRequest = { access_code: string }

/** 200 OK: ModalSuccessResponse Types */
export type QuestionSnapshot = {
  question_id: number
  type: 'multiple_choice' | 'ox' | 'ordering' | 'fill_in_blank'
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
  thumbnail_img_url: string
  test: {
    id: number
    title: string
    subject: {
      id: number
      title: string
    }
  }
  duration_time: number
  questions_snapshot_json: QuestionSnapshot[]
}
