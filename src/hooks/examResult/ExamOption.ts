interface ExamOptionProps {
  option: string
  is_result: boolean
  student_answer: string[]
  selected: string | string[] | null
  correct_answer: string[]
}
export default function ExamOption({
  option,
  is_result,
  student_answer,
  selected,
  correct_answer,
}: ExamOptionProps) {
  const getOptionKey = (option: string) => option.split('.')[0].trim()
  const optionKey = getOptionKey(option)

  const IS_CHECKED = is_result
    ? student_answer.includes(optionKey)
    : selected === optionKey

  const IS_CORRECT_OPTION = is_result && correct_answer.includes(optionKey)
  const IS_WRONG_OPTION = is_result && IS_CHECKED && !IS_CORRECT_OPTION

  const TEXT_COLOR = IS_CORRECT_OPTION
    ? 'text-[#14c786]'
    : IS_WRONG_OPTION
      ? 'text-[#ec0037]'
      : 'text-[#222222]'

  return {
    optionKey,
    IS_CHECKED,
    IS_CORRECT_OPTION,
    IS_WRONG_OPTION,
    TEXT_COLOR,
  }
}
