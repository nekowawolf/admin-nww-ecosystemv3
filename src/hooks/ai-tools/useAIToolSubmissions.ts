'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  deleteAIToolSubmission,
  getAIToolSubmissions,
} from '@/services/ai-tools/aiToolsService'
import { AIToolSubmission } from '@/types/ai-tools'

export const useAIToolSubmissions = () => {
  const [data, setData] = useState<AIToolSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const submissions = await getAIToolSubmissions()
      setData(submissions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch AI Tool submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteSubmission = async (_id: string) => {
    await deleteAIToolSubmission(_id)
    setData((current) => current.filter((submission) => submission._id !== _id))
  }

  return { data, loading, error, deleteSubmission, refetch: fetchData }
}