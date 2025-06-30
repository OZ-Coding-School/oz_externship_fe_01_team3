import { useEffect, useState } from "react"

interface CheckBoxTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  is_result?: boolean
  onSelect: (selected: string[])=>void
}

export default function CheckBoxType({
  options,
  question_Id,
  disabled = false,
  is_result = false,
  student_answer = [],
  correct_answer = [],
  onSelect
  
}: CheckBoxTypeProps) {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    if (student_answer && Array.isArray(student_answer)) {
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
    <div className="w-[1000px] h-[144px] pr-[26px] pl-8 flex flex-col">
      {options.map((option, index) => {
         /* 결과 창일 때 체크 여부 확인 */
         const ISCHECKED = is_result ? student_answer.includes(option) : false
         /* 정답 여부 확인 */
         const ISCORRECT = correct_answer.includes(option)
         /* 오답 여부 확인 */
         const ISWRONG = ISCHECKED && !ISCORRECT
 
         /* 정답, 오답, 기본 글자 색상 정의 */
         const TEXTCOLOR = ISCORRECT
           ? 'text-[#14c786]'
           : ISWRONG
             ? 'text-[#ec0037]'
             : 'text-[#222222]'

        const checkboxId = `${question_Id}-${index}`;
        return (
          <label
          key={checkboxId}
          htmlFor={checkboxId}
            className={`flex items-center cursor-pointer w-[942px] h-[27px] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="relative w-[18px] h-[18px] mt-[4.5px] mb-[4.5px] mr-3">
              <input
              checked={is_result ? student_answer.includes(option) : selected.includes(option)}
              id={checkboxId}
                type="checkbox"
                name={`question-${question_Id}`}
                value={option}
                onChange={()=>{handelChange(option)}}
                className="
                  appearance-none w-full h-full border rounded-[2px] cursor-pointer 
                  border-[#BDBDBD] checked:bg-[#6200FF] checked:border-[#6200FF] peer
                "
                disabled={disabled}
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           opacity-0 peer-checked:opacity-100 transition-opacity duration-200 w-4"
              >
                <img src="/src/assets/check.svg " className="w-full h-full" />
              </div>
            </div>
            <span className={`text-base font-medium ${TEXTCOLOR }`}>{option}</span>
          </label>
        )
      })}
    </div>
  )
}
