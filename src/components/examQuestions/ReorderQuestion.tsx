import { useState } from 'react'

interface Option {
  id: number
  test: string
  label: string
}

interface ReorderQuestionProps {
  options: Option[]
  question_Id: number
}

export default function ReorderQuestion({ options }: ReorderQuestionProps) {
  const [draggingItem, setDraggingItem] = useState<Option | null>(null)
  const [droppedAnswers, setDroppedAnswers] = useState<(Option | null)[]>(
    Array(options.length).fill(null)
  )

  const handleDragStart = (item: Option) => {
    setDraggingItem(item)
  }

  const handleDrop = (index: number) => {
    if (!draggingItem) return

    const newAnswers = [...droppedAnswers]
    const existingIndex = newAnswers.findIndex(
      (answer) => answer?.id === draggingItem.id
    )

    if (existingIndex === index) {
      setDraggingItem(null)
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
  }

  const padding = 'pt-[20px] pb-[20px] pr-[16px] pl-[16px]'
  const answerString = droppedAnswers.map((ans) => ans?.id ?? '').join(',')

  return (
    <div className="w-[680px] h-[310px] ml-[30px] mb-[100px]">
      {/* 상단 보기 박스 */}
      <div
        className={`w-[648px] h-[228px] ml-[32px] bg-[#F2F3F5] mb-[20px] rounded-[4px] ${padding}`}
      >
        <div className="w-[276px] h-[188px] flex justify-start flex-col">
          {options.map((option, index) => (
            <div
              key={option.id}
              draggable
              onDragStart={() => handleDragStart(option)}
              className={`w-[276px] h-[32px] flex flex-row items-center ${index !== 0 ? 'mt-[20px]' : ''} cursor-pointer`}
            >
              <div className="w-[32px] h-[32px] bg-[#EFE6FC] mr-[8px] rounded-[4px] flex justify-center text-[#6201E0] items-center">
                {option.label}
              </div>
              <span className="font-medium text-base flex justify-start items-center">
                {option.test}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 드롭 박스 */}
      <div className="w-[680px] h-[62px] pl-[32px] flex flex-row">
        {droppedAnswers.map((answer, index) => (
          <div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="w-[62px] h-[62px] bg-[#F2F3F5] mr-[10px] rounded-[4px] flex justify-center items-center border border-gray-300"
            draggable={!!answer}
            onDragStart={() => answer && handleDragStart(answer)}
          >
            {answer ? <span className="font-bold">{answer.label}</span> : null}
          </div>
        ))}
      </div>
      <input type="hidden" name="answer" value={answerString} />
    </div>
  )
}
