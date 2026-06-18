import { authFetch } from '@/services/auth/authService'
import { Web3ToolsRequest, Web3ToolsResponse } from '@/types/web3-tools'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createWeb3Tool = async (data: Web3ToolsRequest) => {
  const response = await authFetch(`${API_BASE_URL}/web3tools`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create Web3 tool')
  }

  return response.json()
}

export const getWeb3Tools = async (): Promise<Web3ToolsResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/web3tools`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch Web3 tools')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateWeb3Tool = async (_id: string, data: Web3ToolsRequest) => {
  const response = await authFetch(`${API_BASE_URL}/web3tools/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update Web3 tool')
  }

  return response.json()
}

export const getWeb3ToolById = async (_id: string): Promise<Web3ToolsResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/web3tools/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch Web3 tool')
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
    console.error('Error in getWeb3ToolById:', error)
    throw error
  }
}

export const deleteWeb3Tool = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/web3tools/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete Web3 tool')
  }

  return response.json()
}
