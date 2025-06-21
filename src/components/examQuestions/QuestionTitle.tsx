interface QuestionTitleProps {
  number: number
  question: string
  score: number
  type: string
}

const QuestionTitle = ({
  number,
  question,
  score,
  type,
}: QuestionTitleProps) => {
  return (
    <div className="flex flex-row gap-2">
      <div className={fontStyle}>{number}. </div>
      <div className={fontStyle}>{question}</div>
      <div className="flex flex-row items-center gap-2.5">
        <div className={`${scoreSelect} w-[42px] h-[24px]`}>{score}점</div>
        <div className={`${scoreSelect} w-[65px] h-[24px]`}>{type}</div>
      </div>
    </div>
  )
}

const fontStyle =
  'text-[20px] text-[#121212] font-bold leading-[1.4] tracking-[-0.03em]'
const scoreSelect =
  'text-[12px] text-[#121212] font-medium leading-[1.4] tracking-[-0.03em] bg-[#ececec] rounded-[2px] text-center'

export default QuestionTitle
