import { useEffect, useRef, useState } from 'react'
import ExamCard from './ExamCard'
import type { TabId, Tab } from '@/types/examList'
import { infiniteScrolling } from '@/hooks/examList/useInfiniteScroll'
import { useInfiniteQuery } from '@tanstack/react-query'

const TABS: Tab[] = [
  { id: 'all', label: '전체보기' },
  { id: 'completed', label: '응시완료' },
  { id: 'notStart', label: '미응시' },
]

export default function ExamList() {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const observerRef = useRef<HTMLDivElement>(null)

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['exam', activeTab],
    queryFn: ({ pageParam = 1 }) => infiniteScrolling(pageParam, activeTab, 5),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })

  const allExams = data?.pages.flatMap((p) => p.data) ?? []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )
    if (observerRef.current) {
      observer.observe(observerRef.current)
    }
    return () => observer.disconnect()
  }, [fetchNextPage])

  const handleTakeExam = (examId: string): void => {
    console.log('응시하기:', examId)
  }

  const handleViewDetails = (examId: string): void => {
    console.log('상세보기:', examId)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error..</p>
  return (
    <div className="flex-1">
      <h2 className="text-[32px] font-bold mb-6">쪽지시험</h2>

      {/* 탭 네비게이션 */}
      <nav className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[20px] whitespace-nowrap py-4 px-1 border-b-2 font-medium focus:outline-none transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 시험 카드 리스트 */}
      <div className="space-y-4">
        {allExams.length > 0 ? (
          <>
            {allExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onTakeExam={handleTakeExam}
                onViewDetails={handleViewDetails}
              />
            ))}

            {/* 로딩 인디케이터 */}
            {isFetchingNextPage && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-gray-500">
                  더 많은 시험을 불러오는 중...
                </p>
              </div>
            )}

            {/* 마지막 페이지 표시 */}
            {!hasNextPage && allExams.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">모든 시험을 불러왔습니다.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">해당하는 시험이 없습니다.</p>
          </div>
        )}
      </div>

      <div ref={observerRef} className="h-4" />
    </div>
  )
}
