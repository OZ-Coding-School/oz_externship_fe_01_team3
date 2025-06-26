/** POST: ModalRequest Types */
export type ModalRequest = { access_code: string }

/** 200 OK: ModalSuccessResponse Types */
export type ExampleQuestion = {
  question_id: number
  type: string
  question: string
  options?: string[]
  point: number
}

/** 200 OK: ModalSuccessResponse Types */
export type ModalSuccessResponse = {
  test_id: number
  title: string
  thumbnail_img_url: string
  elapsed_time: number
  cheating_count: number
  questions: ExampleQuestion[]
}
