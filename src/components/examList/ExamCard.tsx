import type {
  ExamCardProps,
  TechIconProps,
  StatusBadgeProps,
} from '@/types/examList'

const TechIcon = ({ tech, className = '' }: TechIconProps) => {
  const getIconStyle = (tech: string) => {
    const techLower = tech.toLowerCase()
    if (techLower.includes('html')) return 'bg-orange-100 text-orange-600'
    if (techLower.includes('css')) return 'bg-blue-100 text-blue-600'
    if (techLower.includes('javascript') || techLower.includes('js'))
      return 'bg-yellow-100 text-yellow-600'
    if (techLower.includes('react')) return 'bg-cyan-100 text-cyan-600'
    if (techLower.includes('typescript')) return 'bg-blue-100 text-blue-700'
    if (techLower.includes('node')) return 'bg-green-100 text-green-600'
    if (techLower.includes('python')) return 'bg-blue-100 text-blue-500'
    if (techLower.includes('aws')) return 'bg-orange-100 text-orange-500'
    if (techLower.includes('github')) return 'bg-gray-100 text-gray-800'
    if (techLower.includes('django')) return 'bg-green-100 text-green-700'
    if (techLower.includes('fastapi')) return 'bg-teal-100 text-teal-600'
    if (techLower.includes('flask')) return 'bg-gray-100 text-gray-600'
    if (techLower.includes('database')) return 'bg-indigo-100 text-indigo-600'
    return 'bg-gray-100 text-gray-600'
  }

  const iconStyle = getIconStyle(tech)

  return (
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconStyle} ${className}`}
    >
      <span className="text-lg font-bold">
        {tech.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        응시완료
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
      미응시
    </span>
  )
}

export default function ExamCard({
  exam,
  onTakeExam,
  onViewDetails,
}: ExamCardProps) {
  const handleButtonClick = () => {
    if (exam.status === 'completed') {
      onViewDetails(exam.id)
    } else {
      onTakeExam(exam.id)
    }
  }

  const getScoreDisplay = (): string => {
    if (
      exam.status === 'completed' &&
      exam.score &&
      exam.totalScore &&
      exam.correctAnswers &&
      exam.totalQuestions
    ) {
      return `${exam.technology} · ${exam.score}점/${exam.totalScore}점 · ${exam.correctAnswers}/${exam.totalQuestions}개 정답`
    }
    return exam.description
  }

  return (
    <div className="bg-[#FAFAFA] rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <TechIcon tech={exam.technology} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {exam.title}
              </h3>
              <StatusBadge status={exam.status} />
            </div>
            <p className="text-sm text-gray-600 truncate">
              {getScoreDisplay()}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 ml-4">
          <button
            onClick={handleButtonClick}
            className={`w-[112px] h-[46px] rounded-lg font-medium text-sm transition-colors duration-200 ${
              exam.status === 'completed'
                ? 'bg-[#ECECEC] border-1 border-[#BDBDBD] text-[#4D4D4D]'
                : 'bg-[#EFE6FC] border-1 border-[#6201E0] text-[#4E01B3]'
            }`}
          >
            {exam.status === 'completed' ? '상세보기' : '응시하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
