import { useState, useEffect, useCallback } from 'react'
import api from '@/services/api'
import { AxiosRequestConfig } from 'axios'

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => void
}

export function useFetch<T>(
  url: string,
  config?: AxiosRequestConfig
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await api.get<T>(url, config)
      setState({ data: response.data, loading: false, error: null })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setState({ data: null, loading: false, error: message })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { ...state, refetch: fetchData }
}
