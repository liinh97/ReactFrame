import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context'

interface ProtectedRouteProps {
  redirectTo?: string
}

export default function ProtectedRoute({ redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return <Outlet />
}
