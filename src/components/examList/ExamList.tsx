import { useEffect, useRef, useState } from 'react'
import ExamCard from './ExamCard'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { Tab, TabId } from '@/types/examList/examList'
import { infiniteScrolling } from '@/hooks/examList/useInfiniteScroll'

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

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
      <h2 className="mb-6 text-[32px] font-bold">쪽지시험</h2>

      {/* 탭 네비게이션 */}
      <nav className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-1 py-4 text-[20px] font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
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
              <div className="py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
                <p className="mt-2 text-gray-500">
                  더 많은 시험을 불러오는 중...
                </p>
              </div>
            )}

            {/* 마지막 페이지 표시 */}
            {!hasNextPage && allExams.length > 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500">모든 시험을 불러왔습니다.</p>
              </div>
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">해당하는 시험이 없습니다.</p>
          </div>
        )}
      </div>

      <div ref={observerRef} className="h-4" />
    </div>
  )
}
