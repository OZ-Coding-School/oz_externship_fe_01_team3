import { useAuthStore } from '@/stores/useAuthStore'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

interface ProtectedRoute {
  children: ReactNode
  requireAuth?: boolean
}
export default function ProtectedRoute({
  children,
  requireAuth,
}: ProtectedRoute) {
  const { isAuthenticated } = useAuthStore()

  // TODO: 로그인은 안되어있는데, 권한이 필요한 경우  (Login Redirect)
  if (!isAuthenticated && requireAuth) {
    return <Navigate to="/auth" replace />
  }

  // TODO: 로그인이 되어있음, 권한이 없는경우 (Guest)
  if (isAuthenticated && !requireAuth) {
    return <Navigate to="/my-quiz" replace />
  }

  return <>{children}</>
}
