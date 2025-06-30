import { useEffect, useState } from 'react'

interface CheckBoxTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  explanation?: string
  is_result?: boolean
  onSelect?: (selected: string[]) => void
}

export default function CheckBoxType({
  options,
  question_Id,
  disabled = false,
  is_result = false,
  student_answer = [],
  correct_answer = [],
  explanation,
  onSelect,
}: CheckBoxTypeProps) {
  const [selected, setSelected] = useState<string[]>([])

  // 옵션 문자열에서 첫 번째 문자열만 빼오는 상수
  const getOptionKey = (option: string) => option.split('.')[0].trim()

  useEffect(() => {
    if (student_answer) {
      setSelected(student_answer)
    }
  }, [])

  const handelChange = (option: string) => {
    if (disabled) return

    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]

    setSelected(newSelected)
    if (onSelect) onSelect(newSelected)
  }
  /* 정답 확인 */
  const ISCORRECT =
    is_result &&
    correct_answer.length === student_answer.length &&
    correct_answer.every((answer) => student_answer.includes(answer))
  /* 오답 확인 */
  const ISWRONG = is_result && !ISCORRECT

  return (
    <div className="flex h-[144px] w-[1000px] flex-col pr-[26px] pl-8">
      {options.map((option, index) => {
        const optionKey = getOptionKey(option)
        /* 결과 창일 때 체크 여부 확인 */
        const ISCHECKED = is_result
          ? student_answer.includes(optionKey)
          : selected.includes(optionKey)

        const ISCORRECT_OPTION = is_result && correct_answer.includes(optionKey)
        const ISWRONG_OPTION = is_result && ISCHECKED && !ISCORRECT_OPTION

        const TEXTCOLOR = ISCORRECT_OPTION
          ? 'text-[#14c786]'
          : ISWRONG_OPTION
            ? 'text-[#ec0037]'
            : 'text-[#222222]'

        const checkboxId = `${question_Id}-${index}`
        return (
          <div key={checkboxId}>
            <label
              key={checkboxId}
              htmlFor={checkboxId}
              className={`flex h-[27px] w-[942px] cursor-pointer items-center ${index !== 0 ? 'mt-3' : ''}`}
            >
              <div className="relative mt-[4.5px] mr-3 mb-[4.5px] h-[18px] w-[18px]">
                <input
                  checked={is_result ? ISCHECKED : selected.includes(option)}
                  id={checkboxId}
                  type="checkbox"
                  name={`question-${question_Id}`}
                  value={option}
                  onChange={() => {
                    handelChange(option)
                  }}
                  className="peer h-full w-full cursor-pointer appearance-none rounded-[2px] border border-[#BDBDBD] checked:border-[#6200FF] checked:bg-[#6200FF]"
                  disabled={disabled}
                />
                <div className="absolute top-1/2 left-1/2 w-4 -translate-x-1/2 -translate-y-1/2 transform opacity-0 transition-opacity duration-200 peer-checked:opacity-100">
                  <img src="/src/assets/check.svg " className="h-full w-full" />
                </div>
              </div>
              <span className={`text-base font-medium ${TEXTCOLOR}`}>
                {option}
              </span>
            </label>
          </div>
        )
      })}
      {ISWRONG && (
        <div className="mt-2 ml-7 rounded-md bg-[#FFEFF0] p-2 text-sm text-[#ec0037]">
          {explanation}
        </div>
      )}
    </div>
  )
}
