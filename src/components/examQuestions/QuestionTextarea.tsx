import { useState, useEffect } from 'react'

interface QuestionTextareaProps {
  question_Id: number
  disabled?: boolean
  student_answer?: string
  correct_answer?: string
  is_result?: boolean
  onChange: (value: string) => void
}

export default function QuestionTextarea({
  onChange,
  disabled = false,
  is_result = false,
  correct_answer,
  student_answer,
}: QuestionTextareaProps) {
  const [value, setValue] = useState(student_answer ?? '')

  useEffect(() => {
    setValue(student_answer ?? '')
  }, [student_answer])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange(newValue)
  }

  const getTextColor = () => {
    if (!is_result) return 'text-black'
    if (value === correct_answer) return 'text-[#14C786]'
    return 'text-[#EC0037]'
  }

  return (
    <div className="pl-8">
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
  )
}
