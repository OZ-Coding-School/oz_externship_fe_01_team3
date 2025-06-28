import { useState, useMemo } from 'react'
import ExamCard from '@/components/examList/ExamCard'
import type { TabId } from '@/types/examList/examList'
import { useExamListQuery } from '@/hooks/examList/useExamListQuery'

interface Tab {
  id: TabId
  label: string
}

interface ExamListProps {
  setIsModalOpen: (isModalOpen: boolean) => void
}

const tabs: Tab[] = [
  { id: 'all', label: '전체' },
  { id: 'submitted', label: '응시완료' },
  { id: 'not_submitted', label: '미응시' },
]

export default function ExamList({ setIsModalOpen }: ExamListProps) {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const { data: examList, isLoading, error } = useExamListQuery()

  // 탭에 따라 필터링된 시험 목록
  const filteredExams = useMemo(() => {
    if (!examList) return []

    switch (activeTab) {
      case 'submitted':
        return examList.filter((exam) => exam.submission_status === 'submitted')
      case 'not_submitted':
        return examList.filter(
          (exam) => exam.submission_status === 'not_submitted'
        )
      default:
        return examList
    }
  }, [examList, activeTab])

  const handleTakeExam = (examId: number) => {
    console.log('응시하기:', examId)
    // 미응시 시험의 응시하기 버튼 클릭 시 모달 열기
    setIsModalOpen(true)
  }

  const handleViewDetails = (examId: number) => {
    console.log('상세보기:', examId)
    // 응시완료된 시험의 상세보기 - 페이지 이동 또는 상세 모달
    // TODO: 상세 결과 보기 로직 구현 (페이지 이동 또는 별도 모달)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-500">시험 목록을 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-red-500">
          시험 목록을 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-1 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 시험 목록 */}
      <div className="space-y-4">
        {filteredExams.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-gray-500">
              {activeTab === 'all'
                ? '등록된 시험이 없습니다.'
                : activeTab === 'submitted'
                  ? '응시완료한 시험이 없습니다.'
                  : '미응시 시험이 없습니다.'}
            </div>
          </div>
        ) : (
          filteredExams.map((exam) => (
            <ExamCard
              key={exam.test_id}
              exam={exam}
              onTakeExam={handleTakeExam}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>
    </div>
  )
}
