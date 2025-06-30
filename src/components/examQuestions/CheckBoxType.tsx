import { useEffect, useState } from 'react'

interface CheckBoxTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  is_result?: boolean
  exam_h: string
  onSelect?: (selected: string[]) => void
}

export default function CheckBoxType({
  options,
  question_Id,
  disabled = false,
  is_result = false,
  exam_h,
  student_answer = [],
  correct_answer = [],
  onSelect,
}: CheckBoxTypeProps) {
  const [selected, setSelected] = useState<string[]>([])

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
  return (
    <div className={`flex ${exam_h} w-[1000px] flex-col pr-[26px] pl-8`}>
      {options.map((option, index) => {
        const ISCHECKED = is_result && student_answer.includes(option)
        const ISCORRECT = correct_answer.includes(option)
        const ISWRONG = ISCHECKED && !ISCORRECT
        const TEXTCOLOR = ISCORRECT
          ? 'text-[#14c786]'
          : ISWRONG
            ? 'text-[#ec0037]'
            : 'text-[#222222]'

        const checkboxId = `${question_Id}-${index}`
        return (
          <label
            key={checkboxId}
            htmlFor={checkboxId}
            className={`flex h-[27px] w-[942px] cursor-pointer items-center ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="relative mt-[4.5px] mr-3 mb-[4.5px] h-[18px] w-[18px]">
              <input
                checked={
                  is_result
                    ? student_answer.includes(option)
                    : selected.includes(option)
                }
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
        )
      })}
    </div>
  )
}
