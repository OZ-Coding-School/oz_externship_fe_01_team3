import { ArrowLeft } from 'lucide-react'
import ShowOptionHeader from './examQuestionUI/showOptionHeader'
import { containerStyle, leftContainerStyle } from './style'

interface QuestionHeaderProps {
  title: string
  subTitle?: string
  time?: number
  showOption?: boolean
}

const QuestionHeader = ({
  title,
  subTitle,
  time,
  showOption,
}: QuestionHeaderProps) => {
  const containerClass = containerStyle(showOption || false)
  const leftContainerClass = leftContainerStyle(showOption || false)

  return (
    <div className={containerClass}>
      <div className={leftContainerClass}>
        <div className="w-6 h-6 cursor-pointer mt-[2px]">
          <ArrowLeft size={24} />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[20px] text-[#000000] font-semibold leading-[1.4] tracking-[-0.03em]">
            {title}
          </h1>
          <h2 className="text-[16px] text-[#4d4d4d] font-medium leading-[1.4] tracking-[-0.03em]">
            {subTitle}
          </h2>
        </div>
      </div>

      {showOption && <ShowOptionHeader time={time || 0} />}
    </div>
  )
}

export default QuestionHeader
