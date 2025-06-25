import { ArrowLeft } from 'lucide-react'
import ShowOptionHeader from './examQuestionsCompo/showOptionHeader'

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
  const containerClass = `flex ${
    showOption ? 'justify-around items-center' : 'items-center justify-start'
  } max-w-screen h-[128px] bg-[#fafafa] border-b border-[#bdbdbd] px-4`

  const leftContainerClass = `flex gap-5 ${!showOption && `relative left-[360px]`}`

  return (
    <div className={containerClass}>
      <div className={leftContainerClass}>
        <div className="w-6 h-6 cursor-pointer mt-[2px]">
          <ArrowLeft size={24} />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className={titleStyle}>{title}</h1>
          <h2 className={subTitleStyle}>{subTitle}</h2>
        </div>
      </div>

      {showOption && <ShowOptionHeader time={time || 0} />}
    </div>
  )
}

/* text, border, lineheight */

const titleStyle =
  'text-[20px] text-[#000000] font-semibold leading-[1.4] tracking-[-0.03em]'
const subTitleStyle =
  'text-[16px] text-[#4d4d4d] font-medium leading-[1.4] tracking-[-0.03em]'

/* 스타일 파일 하나 더 만들어서 따로 처리 하는 것도 좋음 */

//flex items-center, justify-center

export default QuestionHeader
