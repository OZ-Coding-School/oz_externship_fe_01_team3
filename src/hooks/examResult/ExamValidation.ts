interface UseExamValidationParams {
  is_result: boolean
  correct_answer: string[]
  student_answer: string[]
}

interface UseExamValidationResult {
  isCorrectCheck?: boolean
  isWrongCheck: boolean
}

export default function useExamValidation({
  is_result,
  correct_answer,
  student_answer,
}: UseExamValidationParams): UseExamValidationResult {
  const isCorrectCheck =
    is_result &&
    correct_answer.length === student_answer.length &&
    correct_answer.every((answer, index) => answer === student_answer[index])

  const isWrongCheck = is_result && !isCorrectCheck

  return { isCorrectCheck, isWrongCheck }
}
