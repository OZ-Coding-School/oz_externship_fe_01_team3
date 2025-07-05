interface UseExamOptionParams {
  option: string
  is_result: boolean
  student_answer: string[]
  selected: string | string[] | null
  correct_answer: string[]
}

export default function useOptionStatus({
  option,
  is_result,
  student_answer,
  selected,
  correct_answer,
}: UseExamOptionParams) {
  const extractOptionKey = (option: string) => option.split('.')[0].trim()
  const optionKey = extractOptionKey(option)

  const isChecked = is_result
    ? student_answer.includes(optionKey)
    : selected === optionKey

  const isCorrectCheck = is_result && correct_answer.includes(optionKey)
  const isWrongCheck = is_result && isChecked && !isCorrectCheck

  const textColor = isCorrectCheck
    ? 'text-[#14c786]'
    : isWrongCheck
      ? 'text-[#ec0037]'
      : 'text-[#222222]'

  return {
    optionKey,
    isChecked,
    isCorrectCheck,
    isWrongCheck,
    textColor,
  }
}
