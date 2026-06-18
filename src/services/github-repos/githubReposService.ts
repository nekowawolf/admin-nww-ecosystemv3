import { authFetch } from '@/services/auth/authService'
import { GithubRepoRequest, GithubRepoResponse } from '@/types/github-repos'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createGithubRepo = async (data: GithubRepoRequest) => {
  const response = await authFetch(`${API_BASE_URL}/githubrepo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create GitHub repo')
  }

  return response.json()
}

export const getGithubRepos = async (): Promise<GithubRepoResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/githubrepo`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch GitHub repos')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateGithubRepo = async (_id: string, data: GithubRepoRequest) => {
  const response = await authFetch(`${API_BASE_URL}/githubrepo/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update GitHub repo')
  }

  return response.json()
}

export const getGithubRepoById = async (_id: string): Promise<GithubRepoResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/githubrepo/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch GitHub repo')
    }

    const data = await response.json()
    
    if (data.data) {
      return data.data
    } else if (data.success && data.data) {
      return data.data
    } else if (data._id) {
      return data
    } else {
      throw new Error('Unexpected response format')
    }
  } catch (error) {
    console.error('Error in getGithubRepoById:', error)
    throw error
  }
}

export const deleteGithubRepo = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/githubrepo/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete GitHub repo')
  }

  return response.json()
}
