import { useQuery } from '@tanstack/react-query'

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const useFetch = <T = any>(url: string | null): UseFetchReturn<T> => {
  const { data, isLoading, error, refetch } = useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const response = await fetch(url!)
      if (!response.ok) throw new Error(`Error: ${response.status}`)
      return response.json()
    },
    enabled: !!url,
  })

  return {
    data: data ?? null,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Something went wrong') : null,
    refetch: async () => {
      try {
        await refetch()
      } catch (e) {
        // swallow — caller can handle UI feedback
      }
    }
  }
}

export default useFetch
