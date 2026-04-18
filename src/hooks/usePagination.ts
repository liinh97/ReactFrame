import { useState, useMemo } from 'react'

interface UsePaginationProps {
  total: number
  pageSize?: number
  initialPage?: number
}

interface UsePaginationReturn {
  page: number
  pageSize: number
  totalPages: number
  offset: number
  hasPrev: boolean
  hasNext: boolean
  goTo: (page: number) => void
  next: () => void
  prev: () => void
  setPageSize: (size: number) => void
}

export function usePagination({
  total,
  pageSize: initialPageSize = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages))
  const next = () => goTo(page + 1)
  const prev = () => goTo(page - 1)

  const setPageSize = (size: number) => {
    setPageSizeState(size)
    setPage(1)
  }

  return {
    page,
    pageSize,
    totalPages,
    offset: (page - 1) * pageSize,
    hasPrev: page > 1,
    hasNext: page < totalPages,
    goTo,
    next,
    prev,
    setPageSize,
  }
}
