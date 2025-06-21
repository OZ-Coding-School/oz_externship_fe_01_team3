// 기본 타입 정의
export type ExamStatus = 'completed' | 'notStart'
export type ExamCategory = 'frontend' | 'backend'
export type TabId = 'all' | 'completed' | 'notStart'
export type SideTabId = 'exam' | 'info' | 'password'

// 시험 데이터 인터페이스
export interface ExamData {
  id: string
  title: string
  category: ExamCategory
  technology: string
  description: string
  status: ExamStatus
  score?: number
  totalScore?: number
  correctAnswers?: number
  totalQuestions?: number
  icon: string
}

export interface Tab {
  id: TabId
  label: string
}

export interface SideTab {
  id: SideTabId
  label: string
}

export interface ExamCardProps {
  exam: ExamData
  onTakeExam: (examId: string) => void
  onViewDetails: (examId: string) => void
}

export interface SideBarProps {
  activeTab?: SideTabId
  onTabChange?: (tabId: SideTabId) => void
}

// 유틸리티 타입
export interface TechIconProps {
  tech: string
  className?: string
}

export interface StatusBadgeProps {
  status: ExamStatus
}
