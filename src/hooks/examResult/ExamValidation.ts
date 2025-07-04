interface UseExamValidationProps {
  IS_CORRECT_CHECK?: boolean
  IS_WRONG_CHECK: boolean
}

export default function useExamValidation(
  is_result: boolean,
  correct_answer: string[],
  student_answer: string[]
): UseExamValidationProps {
  const IS_CORRECT_CHECK =
    is_result &&
    correct_answer.length === student_answer.length &&
    correct_answer.every((answer, index) => answer === student_answer[index])

  const IS_WRONG_CHECK = is_result && !IS_CORRECT_CHECK

  return { IS_WRONG_CHECK }
}
