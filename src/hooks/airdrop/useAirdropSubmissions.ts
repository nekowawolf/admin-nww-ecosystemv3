'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  deleteAirdropSubmission,
  getAirdropSubmissions,
} from '@/services/airdrop/airdropService'
import { AirdropSubmission } from '@/types/airdrop'

export const useAirdropSubmissions = () => {
  const [data, setData] = useState<AirdropSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const submissions = await getAirdropSubmissions()
      setData(submissions)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch airdrop submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteSubmission = async (id: string) => {
    await deleteAirdropSubmission(id)
    setData((current) => current.filter((submission) => submission._id !== id))
  }

  return { data, loading, error, deleteSubmission, refetch: fetchData }
}