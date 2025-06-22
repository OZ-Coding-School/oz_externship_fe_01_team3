import ProtectedRoute from '@/components/ProtectedRoute'
import { createBrowserRouter, Navigate } from 'react-router'

// TODO: 임시 컴포넌트들 - 실제 컴포넌트 구현 후 교체 예정입니다. (각자 파트로 교체 해주세요 😀)
const AuthPage = () => <div>Auth Page - 구현 예정</div>
const RestoreAccount = () => <div>Restore Account - 구현 예정</div>
const StudentRegistration = () => <div>Student Registration - 구현 예정</div>
const MyPageLayout = () => <div>My Page Layout - 구현 예정</div>
const ExamListPage = () => <div>Exam List Page - 구현 예정</div>
const QuizParticipation = () => <div>Quiz Participation - 구현 예정</div>
const QuizExam = () => <div>Quiz Exam - 구현 예정</div>
const QuizResult = () => <div>Quiz Result - 구현 예정</div>

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,
    children: [
      // 메인 페이지
      {
        index: true,
        element: <Navigate to="/auth" replace />,
      },
      // 로그인/회원가입 - 로그인 안한 사람만
      {
        path: 'auth',
        element: (
          <ProtectedRoute requireAuth={false}>
            <AuthPage />
          </ProtectedRoute>
        ),
      },
      // 탈퇴회원 복구 - 로그인 안한 사람만
      {
        path: 'restore-account',
        element: (
          <ProtectedRoute requireAuth={false}>
            <RestoreAccount />
          </ProtectedRoute>
        ),
      },
      // 수강생 등록하기 - 로그인 필요
      {
        path: 'student-registration',
        element: (
          <ProtectedRoute requireAuth>
            <StudentRegistration />
          </ProtectedRoute>
        ),
      },
      // 마이페이지 쪽지시험 목록 - 로그인 필요
      {
        path: 'my-quiz',
        element: (
          <ProtectedRoute requireAuth>
            <MyPageLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="all" replace />,
          },
          {
            path: 'all',
            element: <ExamListPage />,
          },
          {
            path: 'completed',
            element: <ExamListPage />,
          },
          {
            path: 'not-started',
            element: <ExamListPage />,
          },
        ],
      },
      // 쪽지시험 참여 - 로그인 필요
      {
        path: 'quiz/:quizId',
        element: (
          <ProtectedRoute requireAuth>
            <QuizParticipation />
          </ProtectedRoute>
        ),
      },
      // 쪽지시험 응시화면 - 로그인 필요
      {
        path: 'quiz/:quizId/exam',
        element: (
          <ProtectedRoute requireAuth>
            <QuizExam />
          </ProtectedRoute>
        ),
      },
      // 쪽지시험 결과확인 - 로그인 필요
      {
        path: 'quiz/:quizId/result',
        element: (
          <ProtectedRoute requireAuth>
            <QuizResult />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
