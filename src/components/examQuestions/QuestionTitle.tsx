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
          className={`${QustionTitleFontStyle} flex h-[24px] w-[42px] items-center justify-center rounded-[2px] bg-[#ececec] text-center text-[12px] font-medium`}
        >
          {score}점
        </div>
        <div
          className={`${QustionTitleFontStyle} flex h-[24px] w-[65px] items-center justify-center rounded-[2px] bg-[#ececec] text-center text-[12px] font-medium`}
        >
          {type}
        </div>
      </div>
    </div>
  )
}
