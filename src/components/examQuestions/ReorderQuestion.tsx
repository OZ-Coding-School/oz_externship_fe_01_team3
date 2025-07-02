import { useEffect, useState } from 'react'
import ExamResultExplanation from './examQuestionUI/ExamResultExplanation'

interface ReorderQuestionProps {
  disabled?: boolean
  options_json: string[]
  question_Id: number
  student_answer?: string[]
  correct_answer?: string[]
  explanation?: string
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
  // 제출 미구현 id 미사용
  explanation,
  student_answer = [],
  correct_answer = [],
  is_result = false,
  onSelect,
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
      const filled = student_answer.map(
        (test) => options.find((opt) => opt.test === test) || null
      )
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
    const existingIndex = newAnswers.findIndex(
      (answer) => answer?.id === draggingItem.id
    )

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

  const IS_WRONG_CHECK = droppedAnswers.some((_, index) => isWrongAnswer(index))

  return (
    <>
      <div className="mb-[100px] ml-[30px] h-[310px] w-[680px]">
        {/* 상단 보기 박스 */}
        <div className="mb-5 ml-8 h-[228px] w-[648px] rounded-[4px] bg-[#F2F3F5] pt-5 pr-4 pb-5 pl-4">
          <div className="flex h-[188px] w-[276px] flex-col justify-start">
            {options.map((option, index) => (
              <div
                key={option.id}
                draggable={!disabled}
                onDragStart={() => handleDragStart(option)}
                className={`flex h-8 w-[276px] flex-row items-center ${index !== 0 ? 'mt-5' : ''} cursor-pointer`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#EFE6FC] text-[#6201E0]">
                  {option.label}
                </div>
                <span className="text-base font-medium">{option.test}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 드롭 박스 */}
        <div className="flex h-[62px] w-[680px] flex-row pl-8">
          {droppedAnswers.map((answer, index) => (
            <div
              key={index}
              onDragOver={(e) => handleDragOver(index, e)}
              onDragLeave={() => setDragOverIndex(null)}
              onDrop={() => handleDrop(index)}
              className={`mr-[10px] flex h-[62px] w-[62px] items-center justify-center rounded-[4px] border border-gray-300 ${getBackgroundColor(index)}`}
              draggable={!disabled && !!answer}
              onDragStart={() => answer && handleDragStart(answer)}
            >
              {answer ? (
                <span className={`font-bold ${getTextColor(index)}`}>
                  {answer.label}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <input type="hidden" name="answer" value={answerString} />
      </div>

      <ExamResultExplanation
        IS_WRONG_CHECK={IS_WRONG_CHECK}
        explanation={explanation}
        is_result={is_result}
      />
    </>
  )
}
