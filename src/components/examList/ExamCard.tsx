// 이미지 import
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
  TechIconProps,
  StatusBadgeProps,
} from '@/types/examList'

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
        className={`w-[48px] h-[48px] bg-[#EFE6FC] flex items-center justify-center ${className}`}
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
      <span className="w-[57px] h-[24px] leading-[24px] font-medium text-[12px] bg-[#CAF6E6] text-[#085036] text-center">
        응시완료
      </span>
    )
  }
  return (
    <span className="w-[57px] h-[24px] leading-[24px] font-medium text-[12px] bg-[#FFC1D0] text-[#5E0016] text-center rounded-[2px]">
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
          <TechIcon tech={exam.technology} iconPath={exam.icon} />

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
            className={`w-[112px] h-[46px] rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer 
              ${
                exam.status === 'completed'
                  ? 'bg-[#ECECEC] border-1 border-[#BDBDBD] text-[#4D4D4D]'
                  : 'bg-[#EFE6FC] border-1 border-[#6201E0] text-[#4E01B3]'
              }
            `}
          >
            {exam.status === 'completed' ? '상세보기' : '응시하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
