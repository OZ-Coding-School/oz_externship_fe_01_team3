import { ArrowLeft } from 'lucide-react'
import ShowOptionHeader from './examQuestionUI/showOptionHeader'
import { containerStyle, leftContainerStyle } from './style'

interface QuestionHeaderProps {
  title: string
  subTitle?: string
  time?: number
  showOption?: boolean
}

export default function QuestionHeader({
  title,
  subTitle,
  time,
  showOption,
}: QuestionHeaderProps) {
  const containerClass = containerStyle(showOption || false)
  const leftContainerClass = leftContainerStyle(showOption || false)

  return (
    <div className={containerClass}>
      <div className={leftContainerClass}>
        <div className="mt-[2px] h-6 w-6 cursor-pointer">
          <ArrowLeft size={24} />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[20px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#000000]">
            {title}
          </h1>
          <h2 className="text-[16px] leading-[1.4] font-medium tracking-[-0.03em] text-[#4d4d4d]">
            {subTitle}
          </h2>
        </div>
      </div>

      {showOption && <ShowOptionHeader time={time || 0} />}
    </div>
  )
}
