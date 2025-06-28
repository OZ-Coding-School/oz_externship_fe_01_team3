/** response type */
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
export interface TechIconProps {
  title: string
  thumbnailUrl?: string
  className?: string
}

export interface StatusBadgeProps {
  status: 'submitted' | 'not_submitted'
}
