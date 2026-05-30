import { authFetch } from '@/services/auth/authService'
import { CommunityRequest } from '@/types/community'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createCommunity = async (data: CommunityRequest) => {
  const response = await authFetch(`${API_BASE_URL}/cryptocommunity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create community')
  }

  return response.json()
}

export const getCommunity = async () => {
  const response = await authFetch(`${API_BASE_URL}/cryptocommunity`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch communities')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateCommunity = async (_id: string, data: CommunityRequest) => {
  const response = await authFetch(`${API_BASE_URL}/cryptocommunity/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update community')
  }

  return response.json()
}

export const getCommunityById = async (_id: string) => {
  try {
    const response = await authFetch(`${API_BASE_URL}/cryptocommunity/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch community')
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
    console.error('Error in getCommunityById:', error)
    throw error
  }
}

export const deleteCommunity = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/cryptocommunity/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete community')
  }

  return response.json()
}