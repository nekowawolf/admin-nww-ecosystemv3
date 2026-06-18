import { useState } from 'react'
import { toast } from 'sonner'
import { createGithubRepo } from '@/services/github-repos/githubReposService'
import { GithubRepoRequest } from '@/types/github-repos'

export function useAddGithubRepo() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitGithubRepo = async (data: GithubRepoRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createGithubRepo(data)
      toast.success('GitHub Repo added successfully!')
      setSuccessMessage('GitHub Repo added successfully!')
    } catch (err: any) {
      console.error('Error creating GitHub Repo:', err)
      const errorMsg = err.message || 'Failed to add GitHub Repo. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitGithubRepo }
}
