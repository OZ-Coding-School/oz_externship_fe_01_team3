import { useState, useEffect } from 'react'
import ExamResultExplanation from './examQuestionUI/ExamResultExplanation'
import useExamValidation from '@/hooks/examResult/useExamValidation'

interface QuestionTextareaProps {
  question_Id: number
  prompt: string
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  explanation?: string
  is_result?: boolean
  onChange?: (value: string) => void
}

export default function QuestionTextarea({
  onChange,
  prompt,
  disabled = false,
  is_result = false,
  correct_answer = [],
  student_answer = [],
  explanation,
}: QuestionTextareaProps) {
  const [value, setValue] = useState(student_answer[0] ?? '')

  useEffect(() => {
    setValue(student_answer[0] ?? '')
  }, [student_answer])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange?.(newValue)
  }

  const getTextColor = () => {
    if (!is_result) return 'text-black'
    if (value === (correct_answer[0] ?? '')) return 'text-[#14C786]'
    return 'text-[#EC0037]'
  }

  const { IS_WRONG_CHECK } = useExamValidation(
    is_result,
    correct_answer,
    student_answer
  )

  return (
    <>
      <div className="pl-8">
        <p className="mb-5 h-auto w-[486px] rounded bg-[#F9F9FA] pt-5 pr-4 pb-5 pl-4 text-[16px] leading-[1.5] text-[#222222]">
          {prompt}
        </p>
        <textarea
          className={`h-12 w-[648px] resize-none rounded bg-[#F2F3F5] px-4 text-base font-normal tracking-[-0.03em] outline-none placeholder:text-[#BDBDBD] ${getTextColor()}`}
          style={{
            lineHeight: '3rem',
          }}
          maxLength={20}
          value={value}
          placeholder="20글자 이내로 입력해 주세요."
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      <ExamResultExplanation
        IS_WRONG_CHECK={IS_WRONG_CHECK}
        explanation={explanation}
        is_result={is_result}
      />
    </>
  )
}
