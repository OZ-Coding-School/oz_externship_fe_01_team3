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

export default function QuestionTextarea({
  id,
  maxLength,
  height,
  placeholder,
  paddingX,
  paddingY,
  onChange,
}: QuestionTextareaProps) {
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
        className="left-[32px] w-[648px] resize-none overflow-hidden rounded-[4px] bg-[#F2F3F5] text-[16px] leading-[1.4] font-medium tracking-[-0.03em]"
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}
