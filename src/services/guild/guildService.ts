import { authFetch } from '@/services/auth/authService'
import { GuildRequest, GuildResponse } from '@/types/guild'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createGuild = async (data: GuildRequest) => {
  const response = await authFetch(`${API_BASE_URL}/guild`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create Guild')
  }

  return response.json()
}

export const getGuilds = async (): Promise<GuildResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/guild`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch Guilds')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateGuild = async (_id: string, data: GuildRequest) => {
  const response = await authFetch(`${API_BASE_URL}/guild/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update Guild')
  }

  return response.json()
}

export const getGuildById = async (_id: string): Promise<GuildResponse> => {
  try {
    const response = await authFetch(`${API_BASE_URL}/guild/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error('Failed to fetch Guild')
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
    console.error('Error in getGuildById:', error)
    throw error
  }
}

export const deleteGuild = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/guild/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete Guild')
  }

  return response.json()
}