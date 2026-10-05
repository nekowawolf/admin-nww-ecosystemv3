'use client'

import { useCallback, useEffect, useState } from 'react'
import { deleteNetSubmission, getNetSubmissions } from '@/services/net/netService'
import { NetSubmission } from '@/types/net'

export const useNetSubmissions = () => {
  const [data, setData] = useState<NetSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const submissions = await getNetSubmissions()
      setData(submissions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch net submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteSubmission = async (_id: string) => {
    await deleteNetSubmission(_id)
    setData((current) => current.filter((submission) => submission._id !== _id))
  }

  return { data, loading, error, deleteSubmission, refetch: fetchData }
}
