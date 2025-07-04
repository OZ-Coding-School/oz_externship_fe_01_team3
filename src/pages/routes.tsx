import ExampleListContainer from '@/components/examList/ExampleContainer'
import ProtectedRoute from '@/components/ProtectedRoute'
import { createBrowserRouter, Outlet } from 'react-router'
import LandingPage from './LandingPage'
import { Header } from '@/components/common/Header'
import ExamResult from './ExamResult'

// TODO: 임시 컴포넌트들 - 실제 컴포넌트 구현 후 교체 예정입니다. (각자 파트로 교체 해주세요 😀)
const AuthPage = () => <div>Auth Page - 구현 예정</div>
const RestoreAccount = () => <div>Restore Account - 구현 예정</div>
const StudentRegistration = () => <div>Student Registration - 구현 예정</div>
const QuizResult = () => <div>Quiz Result - 구현 예정</div>
const ExamPage = () => <div>Exam Page - 구현 예정</div>

const LayoutWithHeader = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

const LayoutWithoutHeader = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithoutHeader />,
    children: [
      // 메인 페이지
      {
        index: true,
        element: <LandingPage />,
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
          <ProtectedRoute requireAuth={false}>
            <StudentRegistration />
          </ProtectedRoute>
        ),
      },
      // 시험 응시 페이지 - 로그인 필요
      {
        path: 'exam/:id',
        element: (
          <ProtectedRoute requireAuth>
            <ExamPage />
          </ProtectedRoute>
        ),
      },
      // 쪽지시험 결과확인 - 로그인 필요
      {
        path: 'quiz/:quizId/result',
        element: (
          <ProtectedRoute requireAuth>
            <ExamResult />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <LayoutWithHeader />,
    children: [
      // 로그인/회원가입 - 로그인 안한 사람만
      {
        path: 'auth',
        element: (
          <ProtectedRoute requireAuth={false}>
            <AuthPage />
          </ProtectedRoute>
        ),
      },
      // 마이페이지 쪽지시험 목록 - 로그인 필요
      {
        path: 'my-quiz',
        element: (
          <ProtectedRoute requireAuth={false}>
            <ExampleListContainer />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
