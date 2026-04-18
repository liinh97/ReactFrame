import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import api from '@/services/api'
import { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem('access_token')
    const user = localStorage.getItem('user')
    return {
      token,
      user: user ? (JSON.parse(user) as User) : null,
      isAuthenticated: !!token,
      isLoading: false,
    }
  })

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const { data } = await api.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      })
      localStorage.setItem('access_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setState({ token: data.token, user: data.user, isAuthenticated: true, isLoading: false })
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setState({ token: null, user: null, isAuthenticated: false, isLoading: false })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
