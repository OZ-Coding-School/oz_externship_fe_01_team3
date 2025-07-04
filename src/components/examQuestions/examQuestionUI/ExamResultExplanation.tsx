interface ExamResultExplanationProps {
  IS_WRONG_CHECK: boolean
  explanation?: string
}

export default function ExamResultExplanation({
  IS_WRONG_CHECK,
  explanation,
}: ExamResultExplanationProps) {
  return (
    <div
      className={`mt-5 ml-8 flex h-20 w-242 items-center px-6 py-4 ${
        IS_WRONG_CHECK
          ? 'wrong-text result-wrong-box'
          : 'correct-text result-correct-box'
      }`}
    >
      <div className="mr-3 shrink-0 text-2xl">
        {IS_WRONG_CHECK ? '❌' : '🟢'}
      </div>
      <div className="text-base leading-[1.4] tracking-[-0.03em] break-words">
        {explanation}
      </div>
    </div>
  )
}
