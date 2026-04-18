import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <LoginPage />,
  },

  // Protected routes (wrap with ProtectedRoute to enable auth guard)
  {
    path: '/',
    element: <MainLayout />,
    // element: <ProtectedRoute />,   ← uncomment to require login
    // children: [{ path: '/', element: <MainLayout /> ... }]
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

