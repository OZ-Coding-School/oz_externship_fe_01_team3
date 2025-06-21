import { useState } from 'react'

type QuestionTextareaProps = {
  id: string
  maxLength: number
  height: number
  placeholder: string
  paddingX: number
  paddingY: number
  onChange: (value: string) => void
}

const QuestionTextarea = ({
  id,
  maxLength,
  height,
  placeholder,
  paddingX,
  paddingY,
  onChange,
}: QuestionTextareaProps) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div>
      <textarea
        id={id}
        style={{
          height: `${height}px`,
          padding: `${paddingY}px ${paddingX}px`,
        }}
        className="w-[648px] bg-[#F2F3F5] font-medium text-[16px] rounded-[4px] left-[32px] leading-[1.4] tracking-[-0.02em] resize-none overflow-hidden"
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default QuestionTextarea

/* 
사용법

<QuestionTextarea
        id="question-textarea"
        maxLength={20}
        height={48}
        placeholder="20글자 이내로 입력해 주세요"
        paddingX={10}
        paddingY={16}
        onChange={() => {}}
      />
*/
