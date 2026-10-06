'use client'

import { useCallback, useEffect, useState } from 'react'
import { deleteGuildSubmission, getGuildSubmissions } from '@/services/guild/guildService'
import { GuildSubmission } from '@/types/guild'

export const useGuildSubmissions = () => {
  const [data, setData] = useState<GuildSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const submissions = await getGuildSubmissions()
      setData(submissions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch guild submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const deleteSubmission = async (_id: string) => {
    await deleteGuildSubmission(_id)
    setData((current) => current.filter((submission) => submission._id !== _id))
  }

  return { data, loading, error, deleteSubmission, refetch: fetchData }
}