/** 실제 API 응답 타입 */
export interface ExamListApiResponse {
  id: number
  test: {
    subject: {
      title: string
    }
    title: string
    thumbnail_img_url: string
  }
  question_count: number
  question_score: number
  submission_status: string
  score?: string
  correct_count?: string
}

/** 프론트엔드에서 사용할 변환된 타입 */
export type ExamListResponseItem = {
  test_id: number
  test_title: string
  thumbnail_img_url: string
  subject_title: string
  question_count: number
  total_score: number
  submission_status: 'submitted' | 'not_submitted'
  score?: number
  correct_count?: number
}

// API 응답을 프론트엔드 형식으로 변환하는 함수
export const mapApiToExamData = (
  apiData: ExamListApiResponse
): ExamListResponseItem => {
  // submission_status 매핑 로직을 더 유연하게 처리
  const getSubmissionStatus = (
    status: string
  ): 'submitted' | 'not_submitted' => {
    const lowercaseStatus = status.toLowerCase()
    if (
      lowercaseStatus.includes('submit') ||
      lowercaseStatus.includes('complet') ||
      lowercaseStatus.includes('finish')
    ) {
      return 'submitted'
    }
    return 'not_submitted'
  }

  return {
    test_id: apiData.id,
    test_title: apiData.test.title,
    thumbnail_img_url: apiData.test.thumbnail_img_url,
    subject_title: apiData.test.subject.title,
    question_count: apiData.question_count,
    total_score: apiData.question_score,
    submission_status: getSubmissionStatus(apiData.submission_status),
    score: apiData.score ? Number(apiData.score) : undefined,
    correct_count: apiData.correct_count
      ? Number(apiData.correct_count)
      : undefined,
  }
}

// UI 관련 타입들
export type TabId = 'all' | 'submitted' | 'not_submitted'
export type SideTabId = 'exam' | 'info' | 'password'

export interface SideTab {
  id: SideTabId
  label: string
}

export interface SideBarProps {
  activeTab?: SideTabId
  onTabChange?: (tabId: SideTabId) => void
}

// 유틸리티 컴포넌트 Props
export interface StatusBadgeProps {
  status: 'submitted' | 'not_submitted'
}
