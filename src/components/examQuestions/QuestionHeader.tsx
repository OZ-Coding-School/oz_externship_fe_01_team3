import { ArrowLeft } from 'lucide-react'
import Timer from '@/components/common/Timer'

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

      {showOption && (
        <div className="flex gap-6 items-center">
          <h3 className={timerStyle}>
            <Timer time={time} />
            &nbsp;뒤에 끝나요
          </h3>
          <div className={cheatContainerStyle}>
            <h3 className={cheatTitleStyle}>부정행위</h3>
            <div className="flex gap-2">
              {[...Array(3)].map((_, index) => (
                <span key={index} className={warningCardStyle}>
                  !
                </span>
              ))}
              {/* 컴포넌트로 뺴기기 */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* text, border, lineheight */

const warningCardStyle =
  'w-[20px] h-[26.67px] rounded-[2px] border-[1.5px] border-[#bdbdbd] bg-[#fafafa] text-[16px] text-[#bdbdbd] font-bold flex items-center justify-center'
const titleStyle =
  'text-[20px] text-[#000000] font-semibold leading-[1.4] tracking-[-0.03em]'
const subTitleStyle =
  'text-[16px] text-[#4d4d4d] font-medium leading-[1.4] tracking-[-0.03em]'
const timerStyle =
  'w-[169px] h-[45px] bg-[#ffffff] border border-[#ececec] text-[18px] text-[#6201E0] font-semibold rounded-[99px] flex items-center justify-center'
const cheatContainerStyle =
  'flex items-center gap-2 w-[183px] h-[45px] bg-[#ffffff] border border-[#ececec] rounded-[99px] px-3'
const cheatTitleStyle =
  'text-[18px] text-[#303030] font-semibold leading-[1.4] tracking-[-0.03em]'

/* 스타일 파일 하나 더 만들어서 따로 처리 하는 것도 좋음 */

//flex items-center, justify-center

export default QuestionHeader
