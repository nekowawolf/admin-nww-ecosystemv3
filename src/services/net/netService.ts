import { authFetch } from '@/services/auth/authService'
import { NetRequest, NetResponse, NetSubmission } from '@/types/net'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createNet = async (data: NetRequest) => {
  const response = await authFetch(`${API_BASE_URL}/net`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create Net')
  }

  return response.json()
}

export const getNets = async (): Promise<NetResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/net`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch Nets')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateNet = async (_id: string, data: NetRequest) => {
  const response = await authFetch(`${API_BASE_URL}/net/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update Net')
  }

  return response.json()
}

export const getNetSubmissions = async (): Promise<NetSubmission[]> => {
  const response = await authFetch(`${API_BASE_URL}/net-submissions`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch net submissions')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const deleteNetSubmission = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/net-submissions/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete net submission')
  }

  return response.json()
}

export const getNetById = async (_id: string): Promise<NetResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/net/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch Net')
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
    console.error('Error in getNetById:', error)
    throw error
  }
}

export const deleteNet = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/net/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete Net')
  }

  return response.json()
}