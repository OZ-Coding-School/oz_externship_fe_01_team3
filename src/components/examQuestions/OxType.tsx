import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import ExamResultExplanation from './examQuestionUI/ExamResultExplanation'
import useExamValidation from '@/hooks/examResult/useExamValidation'
import ExamOption from '@/hooks/examResult/useExamOption'
interface OxTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  is_result?: boolean
  explanation?: string
  onSelect?: (selected: string[]) => void
}
export default function OxType({
  options,
  question_Id,
  disabled = false,
  student_answer = [],
  correct_answer = [],
  is_result = false,
  explanation,
  onSelect,
}: OxTypeProps) {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (student_answer) {
      setSelected(student_answer[0])
    }
  }, [])

  const handleSelect = (option: string) => {
    if (disabled || is_result) return
    setSelected(option)
    if (onSelect) onSelect([option])
  }

  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'

  const { IS_WRONG_CHECK } = useExamValidation(
    is_result,
    correct_answer,
    student_answer
  )

  return (
    <>
      <div className="flex h-auto w-[340px] flex-col pl-8">
        {options.map((option, index) => {
          // 얘네 차피 다 공통 아님? 다 뺄 수 있지 않나?
          const inputId = `question-${question_Id}-${index}`

          const { IS_CHECKED, IS_WRONG_OPTION, IS_CORRECT_OPTION } = ExamOption(
            option,
            is_result,
            student_answer,
            selected,
            correct_answer
          )

          //함수는 다 빼자

          const getBgColor = () => {
            if (is_result) {
              if (IS_CORRECT_OPTION) return 'bg-[#E9FBF3]'
              if (IS_WRONG_OPTION) return 'bg-[#FDECEF]'
              return 'bg-[#F2F3F5]'
            }
            return IS_CHECKED ? 'bg-[#EFE6FC]' : 'bg-[#F2F3F5]'
          }

          const getTextColor = () => {
            if (is_result) {
              if (IS_CORRECT_OPTION) return 'text-[#14C786]'
              if (IS_WRONG_OPTION) return 'text-[#EC0037]'
            }
            return 'text-black'
          }

          const getIconColor = () => {
            if (option !== 'X') {
              if (is_result) {
                if (IS_CORRECT_OPTION) return 'border-[#14C786]'
                if (IS_CHECKED) return 'border-[#EC0037]'
              }
              return IS_CHECKED ? 'border-[#6200FF]' : 'border-[#BDBDBD]'
            }
            if (is_result) {
              if (IS_CORRECT_OPTION) return 'text-[#14C786]'
              if (IS_WRONG_OPTION) return 'text-[#EC0037]'
            }
            return IS_CHECKED ? 'text-[#EC0037]' : 'text-[#BDBDBD]'
          }

          return (
            <div
              key={inputId}
              className={`h-12 w-[308px] ${index !== 0 ? 'mt-3' : ''}`}
            >
              <input
                id={inputId}
                type="radio"
                name={`question-${question_Id}`}
                value={option}
                checked={IS_CHECKED}
                onChange={() => handleSelect(option)}
                className="peer hidden"
                disabled={disabled || is_result}
              />
              <label
                htmlFor={inputId}
                className={`flex cursor-pointer items-center justify-between rounded-[4px] ${padding} ${getBgColor()} group transition-colors duration-200`}
              >
                <div className="flex flex-row items-center justify-center">
                  {option === 'O' ? (
                    <div
                      className={`mr-2 h-[16px] w-[16px] rounded-full border-[2px] ${getIconColor()}`}
                    />
                  ) : (
                    <X
                      strokeWidth={2}
                      className={`mr-[4px] h-5 w-5 ${getIconColor()}`}
                    />
                  )}

                  <span className={`text-base font-medium ${getTextColor()}`}>
                    {option === 'O' ? '맞아요' : '아니에요'}
                  </span>
                </div>

                <div className="flex items-center">
                  {is_result ? (
                    IS_CORRECT_OPTION ? (
                      <img
                        src="/src/assets/check-correct.svg"
                        className="w-5"
                      />
                    ) : IS_WRONG_OPTION ? (
                      <img src="/src/assets/check-wrong.svg" className="w-5" />
                    ) : null
                  ) : (
                    <>
                      <img
                        src="/src/assets/check-OX.svg"
                        className={`w-5 ${IS_CHECKED ? 'hidden' : 'block'}`}
                      />
                      <img
                        src="/src/assets/check-OX-answer.svg"
                        className={`w-5 ${IS_CHECKED ? 'block' : 'hidden'}`}
                      />
                    </>
                  )}
                </div>
              </label>
            </div>
          )
        })}
      </div>
      {is_result && (
        <ExamResultExplanation
          IS_WRONG_CHECK={IS_WRONG_CHECK}
          explanation={explanation}
        />
      )}
    </>
  )
}
