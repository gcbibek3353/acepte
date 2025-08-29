import { useState, useEffect } from 'react'

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const useFetch = <T = any>(url: string | null): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch;