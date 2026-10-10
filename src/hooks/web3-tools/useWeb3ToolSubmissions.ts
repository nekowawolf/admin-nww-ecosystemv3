'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  deleteWeb3ToolSubmission,
  getWeb3ToolSubmissions,
} from '@/services/web3-tools/web3ToolsService'
import { Web3ToolsSubmission } from '@/types/web3-tools'

export const useWeb3ToolSubmissions = () => {
  const [data, setData] = useState<Web3ToolsSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const submissions = await getWeb3ToolSubmissions()
      setData(submissions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Web3 Tool submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteSubmission = async (_id: string) => {
    await deleteWeb3ToolSubmission(_id)
    setData((current) => current.filter((submission) => submission._id !== _id))
  }

  return { data, loading, error, deleteSubmission, refetch: fetchData }
}