interface LabeledInputProps {
  label?: string
  id: string
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
}

export default function LabeledInput({
  label,
  id,
  value,
  placeholder,
  onChange,
  disabled = false,
  className = '',
}: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`h-12 rounded-sm border border-[#bdbdbd] px-4 ${
          disabled ? 'bg-[#ececec]' : ''
        } ${className}`}
      />
    </div>
  )
}
