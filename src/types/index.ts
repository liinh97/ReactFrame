// ─── API Response Wrapper ────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── Common Entity ───────────────────────────────────────────────────────────
export interface BaseEntity {
  id: string | number
  createdAt: string
  updatedAt: string
}

// ─── User ────────────────────────────────────────────────────────────────────
export interface User extends BaseEntity {
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
}

// ─── Utility Types ───────────────────────────────────────────────────────────
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type ID = string | number
