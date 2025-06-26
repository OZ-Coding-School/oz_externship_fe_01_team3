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
  ExamListResponseItem,
  StatusBadgeProps,
  TechIconProps,
} from '@/types/examList/examList'

const TechIcon = ({ title, thumbnailUrl, className = '' }: TechIconProps) => {
  const getIconImage = (title: string) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('html')) return htmlIcon
    if (titleLower.includes('css')) return cssIcon
    if (titleLower.includes('javascript') || titleLower.includes('js'))
      return javascriptIcon
    if (titleLower.includes('react')) return reactIcon
    if (titleLower.includes('typescript')) return typescriptIcon
    if (titleLower.includes('node')) return nodejsIcon
    if (titleLower.includes('python')) return pythonIcon
    if (titleLower.includes('aws')) return awsIcon
    if (titleLower.includes('github')) return githubIcon
    if (titleLower.includes('django')) return djangoIcon
    if (titleLower.includes('fastapi')) return fastapiIcon
    if (titleLower.includes('flask')) return flaskIcon
    if (titleLower.includes('database')) return databaseIcon
    return null
  }

  const iconImage = getIconImage(title)

  return (
    <div
      className={`flex h-[48px] w-[48px] items-center justify-center rounded-lg bg-[#EFE6FC] ${className}`}
    >
      {iconImage ? (
        <img src={iconImage} alt={title} className="h-[28px] object-contain" />
      ) : thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-[28px] object-contain"
        />
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      )}
    </div>
  )
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'submitted') {
    return (
      <span className="inline-flex h-[24px] w-[57px] items-center justify-center rounded-[2px] bg-[#CAF6E6] text-[12px] font-medium text-[#085036]">
        응시완료
      </span>
    )
  }
  return (
    <span className="inline-flex h-[24px] w-[57px] items-center justify-center rounded-[2px] bg-[#FFC1D0] text-[12px] font-medium text-[#5E0016]">
      미응시
    </span>
  )
}

interface ExamCardProps {
  exam: ExamListResponseItem
  onTakeExam: (examId: number) => void
  onViewDetails: (examId: number) => void
}

export default function ExamCard({
  exam,
  onTakeExam,
  onViewDetails,
}: ExamCardProps) {
  const handleButtonClick = () => {
    if (exam.submission_status === 'submitted') {
      onViewDetails(exam.test_id)
    } else {
      onTakeExam(exam.test_id)
    }
  }

  const getDescriptionText = (): string => {
    if (exam.submission_status === 'submitted') {
      // 응시완료된 시험의 점수 정보 표시
      const scoreInfo = exam.score
        ? `${exam.score}점/${exam.total_score}점`
        : ''
      const correctInfo = exam.correct_count
        ? `${exam.correct_count}/${exam.question_count}개 정답`
        : ''

      if (scoreInfo && correctInfo) {
        return `${exam.subject_title} · ${scoreInfo} · ${correctInfo}`
      } else if (scoreInfo) {
        return `${exam.subject_title} · ${scoreInfo}`
      } else if (correctInfo) {
        return `${exam.subject_title} · ${correctInfo}`
      }
      return `${exam.subject_title} · ${exam.question_count}문항`
    }

    // 미응시 시험
    return `${exam.subject_title} · ${exam.question_count}문항`
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <TechIcon
            title={exam.test_title}
            thumbnailUrl={exam.thumbnail_img_url}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <h3 className="truncate text-lg font-semibold text-gray-900">
                {exam.test_title}
              </h3>
              <StatusBadge status={exam.submission_status} />
            </div>
            <p className="truncate text-sm text-gray-600">
              {getDescriptionText()}
            </p>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleButtonClick}
            className={`h-[46px] w-[112px] cursor-pointer rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-sm ${
              exam.submission_status === 'submitted'
                ? 'border-[#BDBDBD] bg-[#ECECEC] text-[#4D4D4D] hover:bg-[#E0E0E0]'
                : 'border-[#6201E0] bg-[#EFE6FC] text-[#4E01B3] hover:bg-[#E6D9F9]'
            }`}
          >
            {exam.submission_status === 'submitted' ? '상세보기' : '응시하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
