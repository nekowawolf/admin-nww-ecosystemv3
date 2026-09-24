import { useState, useEffect } from 'react'
import { getCommunitySubmissions, deleteCommunitySubmission } from '@/services/community/communityService'
import { CommunitySubmission } from '@/types/community'

export const useCommunitySubmissions = () => {
  const [data, setData] = useState<CommunitySubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getCommunitySubmissions()
      const validData = Array.isArray(result) ? result.filter(item =>
        item &&
        item !== null &&
        item !== undefined &&
        item.community_link
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch community submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCommunitySubmission(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete community submission')
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