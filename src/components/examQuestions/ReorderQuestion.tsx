interface Option {
  id: number
  test: string
}

interface ReorderQuestionProps {
  options: Option[]
  questionId: string
  disabled?: boolean
}

export default function ReorderQuestion({
  options,
  questionId,
  disabled = false,
}: ReorderQuestionProps) {
  return (
    <div className="w-[680px] h-[310px] bg-amber-200">
      {options.map((option) => {
        return <div>{option.id}</div>
      })}
    </div>
  )
}
