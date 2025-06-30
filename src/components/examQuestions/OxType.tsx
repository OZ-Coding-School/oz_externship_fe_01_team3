import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
interface OxTypeProps {
  options: string[] 
  question_Id: number
  disabled?: boolean
  student_answer?: string
  correct_answer?: string
  is_result?: boolean
  onSelect?: (selected: string[]) => void 
}
export default function OxType({
  options,
  question_Id,
  disabled = false,
  student_answer,
  correct_answer,
  is_result = false,
  onSelect,
}: OxTypeProps) {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (student_answer) {
      setSelected(student_answer)
    }
  }, [])

  const handleSelect = (option: string) => {
    if (disabled || is_result) return
    setSelected(option)
    if (onSelect) onSelect([option]) 
  }

  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'

  return (
    <div className="w-[340px] h-auto pl-8 flex flex-col">
      {options.map((option, index) => {
        // 얘네 차피 다 공통 아님? 다 뺄 수 있지 않나?
        const inputId = `question-${question_Id}-${index}`
        const isChecked = is_result ? student_answer === option : selected === option
        const isCorrect = is_result && correct_answer === option
        const isWrong = is_result && isChecked && !isCorrect

        //함수는 다 빼자

        const getBgColor = () => {
          if (is_result) {
            if (isCorrect) return 'bg-[#E9FBF3]'  
            if (isWrong) return 'bg-[#FDECEF]'     
            return 'bg-[#F2F3F5]'                   
          }
          return isChecked ? 'bg-[#EFE6FC]' : 'bg-[#F2F3F5]' 
        }
        
        const getTextColor = () => {
          if (is_result) {
            if (isCorrect) return 'text-[#14C786]' 
            if (isWrong) return 'text-[#EC0037]'   
          }
          return 'text-black'
        }
    
        
        const getIconColor = () => {
          if (option !== 'X') {
            if(is_result) {
              if (isCorrect) return 'border-[#14C786]'
              if(isChecked) return 'border-[#EC0037]'
            }
            return isChecked ? 'border-[#6200FF]' : 'border-[#BDBDBD]'
          }
          if (is_result) {
            if (isCorrect) return 'text-[#14C786]' 
            if (isWrong) return 'text-[#EC0037]'  
          }
          return isChecked ? 'text-[#EC0037]' : 'text-[#BDBDBD]'
        }
        
        return (
          <div
            key={inputId}
            className={`w-[308px] h-12  ${index !== 0 ? 'mt-3' : ''}`}
          >
            <input
              id={inputId}
              type="radio"
              name={`question-${question_Id}`}
              value={option}
              checked={isChecked}
              onChange={() => handleSelect(option)}
              className="peer hidden"
              disabled={disabled || is_result}
            />
            <label
  htmlFor={inputId}
  className={`flex items-center cursor-pointer justify-between rounded-[4px] ${padding} ${getBgColor()} transition-colors duration-200 group`}
>
  <div className="flex flex-row justify-center items-center">
    {option === 'O' ? (
      <div
        className={`w-[16px] h-[16px] mr-2 border-[2px] rounded-full ${getIconColor()}`}
      />
    ) : (
      <X strokeWidth={2} className={`w-5 h-5 mr-[4px] ${getIconColor()}`} />
    )}

    <span className={`font-medium text-base ${getTextColor()}`}>
      {option === 'O' ? '맞아요' : '아니에요'}
    </span>
  </div>

  <div className="flex items-center">
    {is_result ? (
      isCorrect ? (
        <img src="/src/assets/check-correct.svg" className="w-5" />
      ) : isWrong ? (
        <img src="/src/assets/check-wrong.svg" className="w-5" />
      ) : null
    ) : (
      <>
        <img
          src="/src/assets/check-OX.svg"
          className={`w-5 ${isChecked ? 'hidden' : 'block'}`}
        />
        <img
          src="/src/assets/check-OX-answer.svg"
          className={`w-5 ${isChecked ? 'block' : 'hidden'}`}
        />
      </>
    )}
  </div>
</label>

          </div>
        )
      })}
    </div>
  )
}
