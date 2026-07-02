import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getGithubRepoById, updateGithubRepo } from '@/services/github-repos/githubReposService'
import { GithubRepoRequest } from '@/types/github-repos'

export function useEditGithubRepo(id: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<GithubRepoRequest | null>(null)

  useEffect(() => {
    const fetchGithubRepo = async () => {
      try {
        const data = await getGithubRepoById(id)
        if (data) {
          setInitialData({
            name: data.name || '',
            description: data.description || '',
            category: data.category || '',
            repo_url: data.repo_url || '',
            owner: data.owner || '',
            repo_name: data.repo_name || '',
            website: data.website || '',
            twitter: data.twitter || '',
            instagram: data.instagram || '',
            discord: data.discord || '',
            telegram: data.telegram || ''
          })
        }
      } catch (err: any) {
        console.error('Error fetching GitHub Repo:', err)
        toast.error('Failed to load GitHub Repo data')
      }
    }

    if (id) {
      fetchGithubRepo()
    }
  }, [id])

  const submitEditGithubRepo = async (data: GithubRepoRequest) => {
    setIsSubmitting(true)
    try {
      await updateGithubRepo(id, data)
      toast.success('GitHub Repo updated successfully!')
      return true
    } catch (err: any) {
      console.error('Error updating GitHub Repo:', err)
      const errorMsg = err.message || 'Failed to update GitHub Repo. Please try again.'
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, initialData, submitEditGithubRepo }
}
