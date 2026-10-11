import { authFetch } from '@/services/auth/authService'
import { SupporterResponse } from '@/types/supporter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createSupporter = async (data: Omit<SupporterResponse, '_id' | 'created_at'>) => {
  const response = await authFetch(`${API_BASE_URL}/supporters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to create Supporter')
  }

  return response.json()
}

export const getSupporters = async (): Promise<SupporterResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/supporters`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch Supporters')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateSupporter = async (_id: string, data: Omit<SupporterResponse, '_id' | 'created_at'>) => {
  const response = await authFetch(`${API_BASE_URL}/supporters/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || errorData.message || 'Failed to update Supporter')
  }

  return response.json()
}

export const getSupporterById = async (_id: string): Promise<SupporterResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/supporters/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch Supporter')
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
    console.error('Error in getSupporterById:', error)
    throw error
  }
}

export const deleteSupporter = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/supporters/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete Supporter')
  }

  return response.json()
}