type Status = 'radio' | 'text' | 'checkbox'

interface Test {
  type: Status
  disabled: boolean
  name: string
  className: string
  questionId?: string
}

export default function Test({
  type = 'text',
  disabled,
  name,
  className,
  questionId,
}: Test) {
  return (
    <input
      type={type}
      name={questionId}
      className={className}
      disabled={disabled}
    />
  )
}
