import { useState } from 'react'
//TODO: isworng,iscorrect studentAnswer 
interface Option {
  id: number
  test: string
  label: string
}

interface ReorderQuestionProps {
  options: Option[]
  question_Id: number
  student_answer?: string
  correct_answer?: string
  is_correct?: boolean
}

export default function ReorderQuestion({ options }: ReorderQuestionProps) {
  const [draggingItem, setDraggingItem] = useState<Option | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [droppedAnswers, setDroppedAnswers] = useState<(Option | null)[]>(
    Array(options.length).fill(null)
  )

  const handleDragStart = (item: Option) => {
    setDraggingItem(item)
  }

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault()
    setDragOverIndex(index)
    e.dataTransfer.dropEffect = 'move' 
  }

  const handleDrop = (index: number) => {
    if (!draggingItem) return

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
  }

  const answerString = droppedAnswers.map((ans) => ans?.id ?? '').join(',')
  return (
    <div className="w-[680px] h-[310px] ml-[30px] mb-[100px]">
      {/* 상단 보기 박스 */}
      <div className={`w-[648px] h-[228px] ml-8 bg-[#F2F3F5] mb-5 rounded-[4px] pt-5 pb-5 pr-4 pl-4`}>
        <div className="w-[276px] h-[188px] flex justify-start flex-col">
          {options.map((option, index) => (
            <div
              key={option.id}
              draggable
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
            className={`w-[62px] h-[62px] mr-[10px] rounded-[4px] flex justify-center items-center border 
              ${dragOverIndex === index ? 'bg-[#D0F5E8] border-[#14C786]' : 'bg-[#F2F3F5] border-gray-300'}`}
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
