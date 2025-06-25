import type { ExamData, TabId } from '@/types/examList/examList'

export const infiniteScrolling = async (
  pageParam: number = 1,
  tabId: TabId = 'all',
  nextParams: number = 5
): Promise<{
  data: ExamData[]
  nextPage: number | undefined
  hasNextPage: boolean
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const filteredExampleList = mockExamData.filter((exam) => {
    switch (tabId) {
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
