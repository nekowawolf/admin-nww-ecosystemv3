import { useState, useEffect } from 'react'
import { getGithubRepos, deleteGithubRepo } from '@/services/github-repos/githubReposService'
import { GithubRepoResponse } from '@/types/github-repos'

export const useGithubReposData = () => {
  const [data, setData] = useState<GithubRepoResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getGithubRepos()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.name
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub repos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteGithubRepo(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete GitHub repo')
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
