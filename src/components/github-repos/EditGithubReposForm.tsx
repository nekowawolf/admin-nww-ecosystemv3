"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState, useEffect } from 'react'
import { FiUsers, FiLink, FiGithub } from 'react-icons/fi'
import { useEditGithubRepo } from '@/hooks/github-repos/useEditGithubRepo'
import { GithubRepoRequest } from '@/types/github-repos'
import { useRouter } from 'next/navigation'

export default function EditGithubReposForm({ id }: { id: string }) {
  useAuthGuard()
  const router = useRouter()
  const { isSubmitting, initialData, submitEditGithubRepo } = useEditGithubRepo(id)
  const [formData, setFormData] = useState<GithubRepoRequest>({
    name: '',
    description: '',
    category: '',
    repo_url: '',
    owner: '',
    repo_name: '',
    twitter: '',
    discord: '',
    telegram: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await submitEditGithubRepo(formData)
    if (success) {
      router.push('/github-repos-menu/dashboard/github-repos-list')
    }
  }

  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Edit GitHub Repo
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Update an existing GitHub Repo listing
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Project Name *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="category">
                  Category *
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Open Source, Tools, Library"
                  required
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Repo URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="repo_url">
                  Repository URL *
                </label>
                <div className="relative">
                  <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="repo_url"
                    name="repo_url"
                    value={formData.repo_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/owner/repo"
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Owner */}
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="owner">
                    Owner *
                  </label>
                  <input
                    type="text"
                    id="owner"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    placeholder="e.g., facebook"
                    required
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Repo Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="repo_name">
                    Repo Name *
                  </label>
                  <input
                    type="text"
                    id="repo_name"
                    name="repo_name"
                    value={formData.repo_name}
                    onChange={handleInputChange}
                    placeholder="e.g., react"
                    required
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
                <button
                  type="button"
                  onClick={() => router.push('/github-repos-menu/dashboard/github-repos-list')}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting ? 'Updating...' : 'Update Repo'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
