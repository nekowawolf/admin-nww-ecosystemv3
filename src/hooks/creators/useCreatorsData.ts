import { useState, useEffect } from 'react'
import { getCreators, deleteCreator } from '@/services/creators/creatorsService'
import { CreatorsResponse } from '@/types/creators'

export const useCreatorsData = () => {
  const [data, setData] = useState<CreatorsResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getCreators()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.name
      ) : []
      setData([...validData].reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch Creators')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCreator(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete Creator')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    handleDelete
  }
}