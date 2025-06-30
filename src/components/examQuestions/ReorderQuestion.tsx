import { useEffect, useState } from 'react'

interface ReorderQuestionProps {
  disabled?: boolean
  options_json: string[]
  question_id: number
  student_answer?: string[]
  correct_answer?: string[]
  is_result?: boolean
  onSelect?: (answer: string[]) => void
}

interface Option {
  id: string
  label: string
  test: string
}

export default function ReorderQuestion({
  disabled = false,
  options_json,
  // question 여기선 div에는 필요없음 나중에 보낼때 어캐 보낼지 생각
  question_id,
  student_answer = [],
  correct_answer = [],
  is_result = false,
  onSelect
}: ReorderQuestionProps) {
  const options: Option[] = options_json.map((text, index) => ({
    id: index.toString(),
    label: String.fromCharCode(65 + index),
    test: text,
  }))

  const [draggingItem, setDraggingItem] = useState<Option | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [droppedAnswers, setDroppedAnswers] = useState<(Option | null)[]>(
    Array(options.length).fill(null)
  )

  useEffect(() => {
    if (student_answer.length > 0) {
      const filled = student_answer.map((test) => options.find((opt) => opt.test === test) || null)
      setDroppedAnswers(filled)
    }
  }, [student_answer])

  const handleDragStart = (item: Option) => {
    if (disabled) return
    setDraggingItem(item)
  }

  const handleDragOver = (index: number, e: React.DragEvent) => {
    if (disabled) return
    e.preventDefault()
    setDragOverIndex(index)
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (index: number) => {
    if (disabled || !draggingItem) return

    const newAnswers = [...droppedAnswers]
    const existingIndex = newAnswers.findIndex((answer) => answer?.id === draggingItem.id)

    if (existingIndex === index) {
      setDraggingItem(null)
      setDragOverIndex(null)
      return
    }

    if (existingIndex !== -1) {
      const temp = newAnswers[index]
      newAnswers[index] = draggingItem
      newAnswers[existingIndex] = temp
    } else {
      newAnswers[index] = draggingItem
    }

    setDroppedAnswers(newAnswers)
    setDraggingItem(null)
    setDragOverIndex(null)

    const answerArray = newAnswers.map((ans) => ans?.test ?? '')
    if (onSelect) onSelect(answerArray)
  }

  const answerString = droppedAnswers.map((ans) => ans?.test ?? '').join(',')

  const isCorrectAnswer = (index: number): boolean => {
    if (!is_result || !correct_answer.length) return false
    const current = droppedAnswers[index]?.test ?? null
    return current === correct_answer[index]
  }

  const isWrongAnswer = (index: number): boolean => {
    if (!is_result || !correct_answer.length) return false
    const current = droppedAnswers[index]?.test ?? null
    return current !== null && current !== correct_answer[index]
  }

  const getTextColor = (index: number): string => {
    if (!is_result) return 'text-[#222222]'
    if (isCorrectAnswer(index)) return 'text-[#14C786]'
    if (isWrongAnswer(index)) return 'text-[#EC0037]'
    return 'text-[#222222]'
  }

  const getBackgroundColor = (index: number): string => {
    if (dragOverIndex === index) return 'bg-[#D0F5E8]'
    return 'bg-[#F2F3F5]'
  }

  return (
    <div className="w-[680px] h-[310px] ml-[30px] mb-[100px]">
      {/* 상단 보기 박스 */}
      <div className="w-[648px] h-[228px] ml-8 bg-[#F2F3F5] mb-5 rounded-[4px] pt-5 pb-5 pr-4 pl-4">
        <div className="w-[276px] h-[188px] flex justify-start flex-col">
          {options.map((option, index) => (
            <div
              key={option.id}
              draggable={!disabled}
              onDragStart={() => handleDragStart(option)}
              className={`w-[276px] h-8 flex flex-row items-center ${index !== 0 ? 'mt-5' : ''} cursor-pointer`}
            >
              <div className="w-8 h-8 bg-[#EFE6FC] mr-2 rounded-[4px] flex justify-center text-[#6201E0] items-center">
                {option.label}
              </div>
              <span className="font-medium text-base">{option.test}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 드롭 박스 */}
      <div className="w-[680px] h-[62px] pl-8 flex flex-row">
        {droppedAnswers.map((answer, index) => (
          <div
            key={index}
            onDragOver={(e) => handleDragOver(index, e)}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={() => handleDrop(index)}
            className={`w-[62px] h-[62px] mr-[10px] rounded-[4px] flex justify-center items-center border border-gray-300 ${getBackgroundColor(index)}`}
            draggable={!disabled && !!answer}
            onDragStart={() => answer && handleDragStart(answer)}
          >
            {answer ? <span className={`font-bold ${getTextColor(index)}`}>{answer.label}</span> : null}
          </div>
        ))}
      </div>

      <input type="hidden" name="answer" value={answerString} />
    </div>
  )
}