import { authFetch } from '@/services/auth/authService'
import { AIToolsRequest, AIToolsResponse } from '@/types/ai-tools'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createAITool = async (data: AIToolsRequest) => {
  const response = await authFetch(`${API_BASE_URL}/aitools`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create AI tool')
  }

  return response.json()
}

export const getAITools = async (): Promise<AIToolsResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/aitools`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch AI tools')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateAITool = async (_id: string, data: AIToolsRequest) => {
  const response = await authFetch(`${API_BASE_URL}/aitools/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update AI tool')
  }

  return response.json()
}

export const getAIToolById = async (_id: string): Promise<AIToolsResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/aitools/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch AI tool')
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
    console.error('Error in getAIToolById:', error)
    throw error
  }
}

export const deleteAITool = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/aitools/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete AI tool')
  }

  return response.json()
}
