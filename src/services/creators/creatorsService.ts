import { authFetch } from '@/services/auth/authService'
import { CreatorSubmission, CreatorsRequest, CreatorsResponse } from '@/types/creators'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createCreator = async (data: CreatorsRequest) => {
  const response = await authFetch(`${API_BASE_URL}/creators`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to create Creator')
  }

  return response.json()
}

export const getCreators = async (): Promise<CreatorsResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/creators`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to fetch Creators')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateCreator = async (_id: string, data: CreatorsRequest) => {
  const response = await authFetch(`${API_BASE_URL}/creators/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to update Creator')
  }

  return response.json()
}

export const getCreatorSubmissions = async (): Promise<CreatorSubmission[]> => {
  const response = await authFetch(`${API_BASE_URL}/creator-submissions`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to fetch creator submissions')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const deleteCreatorSubmission = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/creator-submissions/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to delete creator submission')
  }

  return response.json()
}

export const getCreatorById = async (_id: string): Promise<CreatorsResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/creators/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch Creator')
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
    console.error('Error in getCreatorById:', error)
    throw error
  }
}

export const deleteCreator = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/creators/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to delete Creator')
  }

  return response.json()
}