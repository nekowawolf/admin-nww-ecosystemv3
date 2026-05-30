import { authFetch } from '@/services/auth/authService'
import { AirdropFreeRequest } from '@/types/airdrop'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createAirdropFree = async (data: AirdropFreeRequest) => {
  const response = await authFetch(`${API_BASE_URL}/freeairdrop`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create free airdrop')
  }

  return response.json()
}

export const getAirdropFree = async () => {
  const response = await authFetch(`${API_BASE_URL}/freeairdrop`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch free airdrops')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateAirdropFree = async (id: string, data: AirdropFreeRequest) => {
  const response = await authFetch(`${API_BASE_URL}/freeairdrop/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update free airdrop')
  }

  return response.json()
}

export const getAirdropFreeById = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/freeairdrop/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch airdrop')
  }

  const data = await response.json()
  return data.data
}

export const deleteAirdropFree = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/freeairdrop/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete free airdrop')
  }

  return response.json()
}