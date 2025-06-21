import { useState } from 'react'
import ExamCard from './ExamCard'
import type { TabId, Tab, ExamData } from '@/types/examList'

const TABS: Tab[] = [
  { id: 'all', label: '전체보기' },
  { id: 'completed', label: '응시완료' },
  { id: 'notStart', label: '미응시' },
]

const mockExamData: ExamData[] = [
  // 프론트엔드 과목
  {
    id: 'html-css',
    title: 'HTML 기초',
    category: 'frontend',
    technology: 'HTML/CSS',
    description: 'HTML · 80점/100점 · 8/10개 정답',
    status: 'completed',
    score: 80,
    totalScore: 100,
    correctAnswers: 8,
    totalQuestions: 10,
    icon: '/examList/html.png',
  },
  {
    id: 'javascript-basic',
    title: 'JavaScript 기초',
    category: 'frontend',
    technology: 'JavaScript',
    description: 'JavaScript · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/nodejs.png',
  },
  {
    id: 'github-usage',
    title: 'Github 응용',
    category: 'frontend',
    technology: 'Github',
    description: 'github · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/github.png',
  },
  {
    id: 'react-basic',
    title: 'React 실습',
    category: 'frontend',
    technology: 'React',
    description: 'React · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/Frame.png',
  },
  {
    id: 'nodejs-basic',
    title: 'Node.js 기초',
    category: 'frontend',
    technology: 'Node.js',
    description: 'Node.js · 90점/100점 · 9/10개 정답',
    status: 'completed',
    score: 90,
    totalScore: 100,
    correctAnswers: 9,
    totalQuestions: 10,
    icon: '/examList/nodejs.png',
  },
  {
    id: 'database-basic',
    title: 'Database 기초',
    category: 'frontend',
    technology: 'Database',
    description: 'Database · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/amazon-database.png',
  },
  {
    id: 'typescript-basic',
    title: 'TypeScript 심화',
    category: 'frontend',
    technology: 'TypeScript',
    description: 'TypeScript · 75점/100점 · 7.5/10개 정답',
    status: 'completed',
    score: 75,
    totalScore: 100,
    correctAnswers: 7.5,
    totalQuestions: 10,
    icon: '/examList/typescript.png',
  },
  {
    id: 'aws-frontend',
    title: 'AWS 심화',
    category: 'frontend',
    technology: 'AWS',
    description: 'AWS · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/aws.png',
  },
  {
    id: 'react-native',
    title: 'React Native 기초',
    category: 'frontend',
    technology: 'React Native',
    description: 'React Native · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/Frame.png',
  },
  // 백엔드 과목
  {
    id: 'python-basic',
    title: 'Python 기초',
    category: 'backend',
    technology: 'Python',
    description: 'Python · 85점/100점 · 8.5/10개 정답',
    status: 'completed',
    score: 85,
    totalScore: 100,
    correctAnswers: 8.5,
    totalQuestions: 10,
    icon: '/examList/python.png',
  },
  {
    id: 'html-css-backend',
    title: 'HTML/CSS 실습',
    category: 'backend',
    technology: 'HTML/CSS',
    description: 'HTML/CSS · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/html.png',
  },
  {
    id: 'javascript-backend',
    title: 'JavaScript 심화',
    category: 'backend',
    technology: 'JavaScript',
    description: 'JavaScript · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/nodejs.png',
  },
  {
    id: 'database-backend',
    title: 'Database 심화',
    category: 'backend',
    technology: 'Database',
    description: 'Database · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/amazon-database.png',
  },
  {
    id: 'django-basic',
    title: 'Django 기초',
    category: 'backend',
    technology: 'Django',
    description: 'Django · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/django.png',
  },
  {
    id: 'fastapi-basic',
    title: 'FastAPI 실습',
    category: 'backend',
    technology: 'FastAPI',
    description: 'FastAPI · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: '/examList/fastapi.png',
  },
  {
    id: 'flask-basic',
    title: 'Flask 기초',
    category: 'backend',
    technology: 'Flask',
    description: 'Flask · 응시하고 점수를 확인해보세요!',
    status: 'notStart',
    icon: 'flask',
  },
]

export default function ExamList() {
  const [activeTab, setActiveTab] = useState<TabId>('all')

  const filteredExams = mockExamData.filter((exam) => {
    switch (activeTab) {
      case 'all':
        return true
      case 'completed':
        return exam.status === 'completed'
      case 'notStart':
        return exam.status === 'notStart'
      default:
        return true
    }
  })

  const handleTakeExam = (examId: string): void => {
    // TODO: 실제 시험 페이지로 라우팅
    console.log('응시하기:', examId)
  }

  const handleViewDetails = (examId: string): void => {
    // TODO: 시험 결과 상세 페이지로 라우팅
    console.log('상세보기:', examId)
  }

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
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onTakeExam={handleTakeExam}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">해당하는 시험이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
