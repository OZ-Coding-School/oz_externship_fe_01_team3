import ExampleListContainer from '@/components/examList/ExampleContainer'
import ProtectedRoute from '@/components/ProtectedRoute'
import { createBrowserRouter, Outlet } from 'react-router'
import LandingPage from './LandingPage'
import { Header } from '@/components/common/Header'
import ExamResult from './ExamResult'
import Join from './Join'
import Login from './Login'
import Register from './Register'
import ExamTakingPage from './ExamTakingPage'
import KaKaoCallback from '@/components/Login/callback/KaKaoCallback'
import NaverCallback from '@/components/Login/callback/NaverCallback'

// TODO: 임시 컴포넌트들 - 실제 컴포넌트 구현 후 교체 예정입니다. (각자 파트로 교체 해주세요 😀)

const RestoreAccount = () => <div>Restore Account - 구현 예정</div>
const StudentRegistration = () => <div>Student Registration - 구현 예정</div>

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
      // 소셜 로그인 콜백 페이지 (네이버, 카카오)
      {
        path: 'auth/callback/kakao',
        element: <KaKaoCallback />,
      },
      {
        path: 'auth/callback/naver',
        element: <NaverCallback />,
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
          <ProtectedRoute requireAuth={false}>
            <ExamTakingPage />
          </ProtectedRoute>
        ),
      },
      // 쪽지시험 결과확인 - 로그인 필요
      {
        path: 'quiz/:quizId/result',
        element: (
          <ProtectedRoute requireAuth={false}>
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
      //회원가입 메인 - 로그인 안한 사람만
      {
        path: 'join',
        element: (
          <ProtectedRoute requireAuth={false}>
            <Join />
          </ProtectedRoute>
        ),
      },
      // 로그인 - 로그인 안한 사람만
      {
        path: 'login',
        element: (
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      //회원가입 일반회원 - 로그인 안한 사람만
      {
        path: 'register',
        element: (
          <ProtectedRoute requireAuth={false}>
            <Register />
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
