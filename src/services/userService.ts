import api from './api'
import { User, ApiResponse, PaginatedResponse } from '@/types'

export interface CreateUserPayload {
  name: string
  email: string
  role?: User['role']
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}

const userService = {
  getAll: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<User>>('/users', { params }),

  getById: (id: User['id']) =>
    api.get<ApiResponse<User>>(`/users/${id}`),

  create: (payload: CreateUserPayload) =>
    api.post<ApiResponse<User>>('/users', payload),

  update: (id: User['id'], payload: UpdateUserPayload) =>
    api.patch<ApiResponse<User>>(`/users/${id}`, payload),

  delete: (id: User['id']) =>
    api.delete<ApiResponse<null>>(`/users/${id}`),
}

export default userService
