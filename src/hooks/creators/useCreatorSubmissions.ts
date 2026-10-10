'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  deleteCreatorSubmission,
  getCreatorSubmissions,
} from '@/services/creators/creatorsService'
import { CreatorSubmission } from '@/types/creators'

export const useCreatorSubmissions = () => {
  const [data, setData] = useState<CreatorSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const submissions = await getCreatorSubmissions()
      setData([...submissions].reverse())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch creator submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteSubmission = async (_id: string) => {
    await deleteCreatorSubmission(_id)
    setData((current) => current.filter((submission) => submission._id !== _id))
  }

  return { data, loading, error, deleteSubmission, refetch: fetchData }
}