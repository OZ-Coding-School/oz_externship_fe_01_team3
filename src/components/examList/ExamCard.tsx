import htmlIcon from '@/assets/examList/html.png'
import cssIcon from '@/assets/examList/css.png'
import javascriptIcon from '@/assets/examList/nodejs.png'
import reactIcon from '@/assets/examList/Frame.png'
import typescriptIcon from '@/assets/examList/typescript.png'
import nodejsIcon from '@/assets/examList/nodejs.png'
import pythonIcon from '@/assets/examList/python.png'
import awsIcon from '@/assets/examList/aws.png'
import githubIcon from '@/assets/examList/github.png'
import djangoIcon from '@/assets/examList/django.png'
import fastapiIcon from '@/assets/examList/fastapi.png'
import flaskIcon from '@/assets/examList/flask.png'
import databaseIcon from '@/assets/examList/amazon-database.png'

import type {
  ExamCardProps,
  StatusBadgeProps,
  TechIconProps,
} from '@/types/examList/examList'

const TechIcon = ({
  tech,
  className = '',
}: TechIconProps & { iconPath?: string }) => {
  const getIconImage = (tech: string) => {
    const techLower = tech.toLowerCase()
    if (techLower.includes('html')) return htmlIcon
    if (techLower.includes('css')) return cssIcon
    if (techLower.includes('javascript') || techLower.includes('js'))
      return javascriptIcon
    if (techLower.includes('react')) return reactIcon
    if (techLower.includes('typescript')) return typescriptIcon
    if (techLower.includes('node')) return nodejsIcon
    if (techLower.includes('python')) return pythonIcon
    if (techLower.includes('aws')) return awsIcon
    if (techLower.includes('github')) return githubIcon
    if (techLower.includes('django')) return djangoIcon
    if (techLower.includes('fastapi')) return fastapiIcon
    if (techLower.includes('flask')) return flaskIcon
    if (techLower.includes('database')) return databaseIcon
    return null
  }

  const iconImage = getIconImage(tech)
  if (iconImage) {
    return (
      <div
        className={`flex h-[48px] w-[48px] items-center justify-center bg-[#EFE6FC] ${className}`}
      >
        <img src={iconImage} alt={tech} className="h-[28px] object-contain" />
      </div>
    )
  }
  return <div>이미지를 찾을 수 없습니다.</div>
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'completed') {
    return (
      <span className="h-[24px] w-[57px] bg-[#CAF6E6] text-center text-[12px] leading-[24px] font-medium text-[#085036]">
        응시완료
      </span>
    )
  }
  return (
    <span className="h-[24px] w-[57px] rounded-[2px] bg-[#FFC1D0] text-center text-[12px] leading-[24px] font-medium text-[#5E0016]">
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
    <div className="rounded-lg border border-gray-200 bg-[#FAFAFA] p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <TechIcon tech={exam.technology} iconPath={exam.icon} />

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <h3 className="truncate text-lg font-semibold text-gray-900">
                {exam.title}
              </h3>
              <StatusBadge status={exam.status} />
            </div>
            <p className="truncate text-sm text-gray-600">
              {getScoreDisplay()}
            </p>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleButtonClick}
            className={`h-[46px] w-[112px] cursor-pointer rounded-lg text-sm font-medium transition-colors duration-200 ${
              exam.status === 'completed'
                ? 'border-1 border-[#BDBDBD] bg-[#ECECEC] text-[#4D4D4D]'
                : 'border-1 border-[#6201E0] bg-[#EFE6FC] text-[#4E01B3]'
            } `}
          >
            {exam.status === 'completed' ? '상세보기' : '응시하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
