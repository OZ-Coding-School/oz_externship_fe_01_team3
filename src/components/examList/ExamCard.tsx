import { TechIcon } from '@/components/common/examList/ExamIcons'
import { StatusBadge } from '@/components/common/examList/StatusBadge'
import type { ExamListResponseItem } from '@/types/examList/examList'

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
  const isCompleted = exam.submission_status === 'submitted'

  const handleButtonClick = () => {
    if (isCompleted) {
      onViewDetails(exam.test_id)
    } else {
      onTakeExam(exam.test_id)
    }
  }

  const getDescriptionText = (): string => {
    if (isCompleted) {
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
    <div
      className={`rounded-lg border p-6 transition-all duration-200 ${
        isCompleted
          ? 'cursor-not-allowed border-gray-200 bg-gray-50'
          : 'cursor-pointer border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <TechIcon
            title={exam.test_title}
            thumbnailUrl={exam.thumbnail_img_url}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <h3
                className={`truncate text-lg font-semibold ${
                  isCompleted ? 'text-gray-500' : 'text-gray-900'
                }`}
              >
                {exam.test_title}
              </h3>
              <StatusBadge status={exam.submission_status} />
            </div>
            <p
              className={`truncate text-sm ${
                isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {getDescriptionText()}
            </p>
          </div>
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isCompleted}
            className={`h-[46px] w-[112px] rounded-lg border text-sm font-medium transition-all duration-200 ${
              isCompleted
                ? 'cursor-not-allowed border-[#BDBDBD] bg-[#ECECEC] text-[#4D4D4D] opacity-60'
                : 'cursor-pointer border-[#6201E0] bg-[#EFE6FC] text-[#4E01B3] hover:bg-[#E6D9F9] hover:shadow-sm'
            }`}
          >
            {isCompleted ? '상세보기' : '응시하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
