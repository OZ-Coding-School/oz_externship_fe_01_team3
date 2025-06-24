interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?:
    | 'default'
    | 'wrong'
    | 'correct'
    | 'textDefault'
    | 'disabled'
    | 'checked'
  type: 'text' | 'checkbox' | 'radio'
  name?: string
  message?: string
  classNames?: string
}

export default function Input({
  type = 'text',
  status = 'default',
  classNames,
  ...props
}: InputProps) {
  const styles = {
    text: {
      default: '',
      textDefault:
        'border border-[#BDBDBD] focus:border-[#6201E0] outline-none',
      wrong: 'border border-[#EC0037] outline-none',
      correct: 'border border-[#14C786] focus:border-[#14c786] outline-none',
      disabled:
        'bg-[#ECECEC] border border-[#BDBDBD] text-[#BDBDBD] pointer-events-none outline-none',
    },
    checkbox: {
      default: 'appearance-none',
      checked: 'bg-[#6201E0] border-none',
    },
    radio: {
      default: 'appearance-none rounded-full',
      checked: 'bg-[#6201E0] border-none',
    },
  }

  // 타입 안전한 스타일 접근
  const styleGroup = styles[type]
  const appliedStyle = styleGroup[status as keyof typeof styleGroup]

  return (
    <div className="relative">
      <input
        type={type}
        className={`${appliedStyle} ${classNames}`}
        onChange={(e) => {
          props.onChange?.(e)
        }}
        {...props}
      />
    </div>
  )
}
