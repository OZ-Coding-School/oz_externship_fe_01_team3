import { QustionTitleFontStyle } from './style'

interface QuestionTitleProps {
  number: number
  question: string
  score: number
  type: string
}

export default function QuestionTitle({
  number,
  question,
  score,
  type,
}: QuestionTitleProps) {
  return (
    <div className="flex flex-row gap-2">
      <div className={`${QustionTitleFontStyle} text-[20px] font-bold`}>
        {number}.{' '}
      </div>
      <div className={`${QustionTitleFontStyle} text-[20px] font-bold`}>
        {question}
      </div>
      <div className="flex flex-row items-center gap-2.5">
        <div
          className={`${QustionTitleFontStyle} w-[42px] h-[24px] text-[12px]  font-medium bg-[#ececec] rounded-[2px] text-center`}
        >
          {score}점
        </div>
        <div
          className={`${QustionTitleFontStyle} w-[65px] h-[24px] text-[12px]  font-medium bg-[#ececec] rounded-[2px] text-center`}
        >
          {type}
        </div>
      </div>
    </div>
  )
}
