import { mockExamData } from '@/mock/examListData'
import type { ExamListResponseItem, TabId } from '@/types/examList/examList'

export const infiniteScrolling = async (
  pageParam: number = 1,
  tabId: TabId = 'all',
  nextParams: number = 5
): Promise<{
  data: ExamListResponseItem[]
  nextPage: number | undefined
  hasNextPage: boolean
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const filteredExampleList = mockExamData.filter((exam) => {
    switch (tabId) {
      case 'all':
        return true
      case 'submitted':
        return exam.submission_status === 'submitted'
      case 'not_submitted':
        return exam.submission_status === 'not_submitted'
      default:
        return true
    }
  })
  const startIdx = (pageParam - 1) * nextParams
  const endIdx = startIdx + nextParams
  const pageData = filteredExampleList.slice(startIdx, endIdx)
  const hasNextPage = endIdx < filteredExampleList.length
  const nextPage = hasNextPage ? pageParam + 1 : undefined

  return {
    data: pageData,
    nextPage,
    hasNextPage,
  }
}
