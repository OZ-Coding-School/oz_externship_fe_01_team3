import { useEffect, useState } from 'react'

interface RadioTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  is_result?: boolean
  explanation?: string
  onSelect?: (selected: string[]) => void
}

export default function RadioType({
  options,
  question_Id,
  disabled = false,
  is_result = false,
  student_answer = [],
  correct_answer = [],
  explanation,
  onSelect,
}: RadioTypeProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const getOptionKey = (option: string) => option.split('.')[0].trim()

  useEffect(() => {
    if (student_answer && student_answer.length > 0) {
      setSelected(student_answer[0])
    }
  }, [student_answer])

  const handleChange = (option: string) => {
    if (disabled || is_result) return

    setSelected(option)
    onSelect?.([option])
  }

  /* 정답 확인 */
  const IS_CORRECT_CHECK =
    is_result &&
    correct_answer.length === student_answer.length &&
    correct_answer.every((answer) => student_answer.includes(answer))
  /* 오답 확인 */
  const IS_WRONG_CHECK = is_result && !IS_CORRECT_CHECK

  return (
    <>
      <div className="flex h-[144px] w-[1000px] flex-col pr-[26px] pl-8">
        {options.map((option, index) => {
          const optionKey = getOptionKey(option)

          const IS_CHECKED = is_result
            ? student_answer.includes(optionKey)
            : selected === optionKey

          const IS_CORRECT_OPTION =
            is_result && correct_answer.includes(optionKey)
          const IS_WRONG_OPTION = is_result && IS_CHECKED && !IS_CORRECT_OPTION

          const TEXT_COLOR = IS_CORRECT_OPTION
            ? 'text-[#14c786]'
            : IS_WRONG_OPTION
              ? 'text-[#ec0037]'
              : 'text-[#222222]'

          const radioId = `${question_Id}-${index}`

          return (
            <div key={radioId}>
              <label
                key={radioId}
                htmlFor={radioId}
                className={`flex h-[27px] w-[942px] cursor-pointer items-center ${index !== 0 ? 'mt-3' : ''}`}
              >
                <div className="relative mt-[4.5px] mr-3 mb-[4.5px] flex h-[18px] w-[18px] gap-5">
                  <input
                    id={radioId}
                    type="radio"
                    name={`question-${question_Id}`}
                    value={optionKey}
                    checked={IS_CHECKED}
                    onChange={() => handleChange(optionKey)}
                    className="peer h-full w-full appearance-none rounded-full border-1 border-[#BDBDBD] checked:border-[#6200FF] checked:bg-[#6200FF]"
                    disabled={disabled || is_result}
                  />
                  <div className="absolute top-1/2 left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#ECECEC] transition-opacity duration-200 peer-checked:opacity-0" />
                  <div className="absolute top-1/2 left-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                </div>
                <span className={`text-base font-medium ${TEXT_COLOR}`}>
                  {option}
                </span>
              </label>
            </div>
          )
        })}
      </div>
      <div
        className={`mt-5 ml-8 flex h-20 w-242 items-center px-6 py-4 ${IS_WRONG_CHECK ? 'wrong-text result-wrong-box' : 'correct-text result-correct-box'}`}
      >
        <div className="mr-3 shrink-0 text-2xl">
          {IS_WRONG_CHECK ? '❌' : '🟢'}
        </div>
        <div className="text-base leading-[1.4] tracking-[-0.03em] break-words">
          {explanation}
        </div>
      </div>
    </>
  )
}
