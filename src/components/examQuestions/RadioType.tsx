import { useEffect, useState } from "react"

interface RadioTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  is_result?: boolean
  onSelect?: (selected: string[]) => void
}

export default function RadioType({
  options,
  question_Id,
  disabled = false,
  is_result = false,
  student_answer = [],
  correct_answer = [],
  onSelect,
}: RadioTypeProps) {
  const [selected, setSelected] = useState<string | null>(null)


  useEffect(() => {
    if (student_answer && student_answer.length > 0) {
      setSelected(student_answer[0]) 
    }
  }, [])

  const handleChange = (option: string) => {
    if (disabled || is_result) return

    setSelected(option)
    if (onSelect) onSelect([option])
  }

  return (
    <div className="w-[1000px] h-[144px] pr-[26px] pl-8 flex flex-col">
      {options.map((option, index) => {
        const ISCHECKED = is_result ? student_answer.includes(option) : selected === option
        const ISCORRECT = is_result && correct_answer.includes(option)
        const ISWRONG = is_result && ISCHECKED && !ISCORRECT
        const TEXTCOLOR = ISCORRECT
          ? 'text-[#14c786]'
          : ISWRONG
            ? 'text-[#ec0037]'
            : 'text-[#222222]'

        const radioId = `${question_Id}-${index}`

        return (
          <label
            key={radioId}
            htmlFor={radioId}
            className={`flex items-center cursor-pointer w-[942px] h-[27px] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="relative w-[18px] h-[18px] mt-[4.5px] mb-[4.5px] mr-3">
              <input
                id={radioId}
                type="radio"
                name={`question-${question_Id}`}
                value={option}
                checked={ISCHECKED}
                onChange={() => handleChange(option)}
                className="
                  appearance-none
                  w-full h-full
                  border-1
                  rounded-full
                  border-[#BDBDBD]
                  checked:bg-[#6200FF] checked:border-[#6200FF]
                  peer
                "
                disabled={disabled || is_result}
              />
              {/* 내부 원 기본 형태 */}
              <div
                className="
                absolute top-1/2 left-1/2
                w-[10px] h-[10px]
                rounded-full bg-[#ECECEC]
                transform -translate-x-1/2 -translate-y-1/2
                transition-opacity duration-200
                peer-checked:opacity-0
              "
              />
              {/* 내부 원 클릭 형태 */}
              <div
                className="
                absolute top-1/2 left-1/2
                w-[10px] h-[10px]
                rounded-full bg-white
                transform -translate-x-1/2 -translate-y-1/2
                transition-opacity duration-200
                opacity-0 peer-checked:opacity-100
              "
              />
            </div>
            <span className={`text-base font-medium ${TEXTCOLOR}`}>{option}</span>
          </label>
        )
      })}
    </div>
  )
}
