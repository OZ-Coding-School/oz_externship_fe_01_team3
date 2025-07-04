import { useEffect, useState } from 'react'
import ExamResultExplanation from './examQuestionUI/ExamResultExplanation'
import useExamValidation from '@/hooks/examResult/useExamValidation'
import ExamOption from '@/hooks/examResult/useExamOption'

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

  /* 정답, 오답 확인 */
  const { IS_WRONG_CHECK } = useExamValidation(
    is_result,
    correct_answer,
    student_answer
  )

  return (
    <>
      <div className="flex h-[144px] w-[1000px] flex-col pr-[26px] pl-8">
        {options.map((option, index) => {
          const { optionKey, IS_CHECKED, TEXT_COLOR } = ExamOption(
            option,
            is_result,
            student_answer,
            selected,
            correct_answer
          )

          const radioId = `${question_Id}-${index}`

          return (
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
