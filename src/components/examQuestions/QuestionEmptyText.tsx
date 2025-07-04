import { useState, useEffect } from 'react'
import ExamResultExplanation from './examQuestionUI/ExamResultExplanation'
import useExamValidation from '@/hooks/examResult/ExamValidation'

interface QuestionEmptyTextProps {
  placeholder?: string
  blank_count: number
  prompt: string
  disabled?: boolean
  student_answer?: string[]
  correct_answer?: string[]
  explanation?: string
  is_result?: boolean

  onChange?: (value: string[]) => void
}

export default function QuestionEmptyText({
  prompt,
  blank_count,
  placeholder = '정답을 입력해 주세요.',
  disabled = false,
  student_answer = [],
  correct_answer = [],
  explanation,
  is_result = false,
  onChange,
}: QuestionEmptyTextProps) {
  const [values, setValues] = useState<string[]>(
    student_answer ?? Array(blank_count).fill('')
  )

  useEffect(() => {
    if (student_answer) {
      setValues(student_answer)
    }
  }, [student_answer])

  const handleChange = (index: number, value: string) => {
    const updated = [...values]
    updated[index] = value
    setValues(updated)
    onChange?.(updated)
  }

  const getTextColor = (value?: string, correct?: string) => {
    const safeValue = value ?? ''
    if (!is_result || safeValue.trim() === '') return 'text-black'
    return safeValue === correct ? 'text-[#14C786]' : 'text-[#EC0037]'
  }

  const getAlphaLabel = (i: number) => String.fromCharCode(65 + i)

  /* 정답, 오답 확인 */
  const { IS_WRONG_CHECK } = useExamValidation(
    is_result,
    correct_answer,
    student_answer
  )

  return (
    <>
      <div className="flex flex-col gap-[16px] pl-8">
        <div className="h-29 w-162 rounded-[4px] bg-[#f2f3f5]">
          <p className="mt-5 ml-4 text-base font-bold text-balance text-[#222222]">
            {prompt}
          </p>
        </div>

        {Array.from({ length: blank_count }).map((_, index) => (
          <div
            key={index}
            className="flex h-[48px] w-[288px] items-center rounded-[4px] bg-[#f2f3f5] px-[12px]"
          >
            <span className="mr-[12px] text-[18px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#222222]">
              {getAlphaLabel(index)}
            </span>
            <input
              type="text"
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={20}
              className={`h-[48px] w-[240px] rounded-[4px] bg-[#f2f3f5] text-[16px] outline-none ${getTextColor(
                values[index],
                correct_answer?.[index]
              )}`}
            />
          </div>
        ))}
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
