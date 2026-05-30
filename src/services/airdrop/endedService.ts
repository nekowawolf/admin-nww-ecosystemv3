import { authFetch } from '@/services/auth/authService'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getAirdropEnded = async () => {
  try {
    const response = await authFetch(`${API_BASE_URL}/allairdrop`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch airdrops')
    }

    const responseData = await response.json()

    const endedData = Array.isArray(responseData.data)
      ? responseData.data.filter(
          (item: any) =>
            item &&
            item.status === 'ended' &&
            item.name &&
            item.task
        )
      : []

    return endedData
  } catch (err: any) {
    throw new Error(err.message || 'Failed to fetch ended airdrops')
  }
}

export const updateAirdropEnded = async (id: string, data: any) => {
  const response = await authFetch(`${API_BASE_URL}/allairdrop/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update airdrop')
  }

  return response.json()
}

export const getAirdropEndedById = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/allairdrop/${id}`, {
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

export const deleteAirdropEnded = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/allairdrop/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete airdrop')
  }

  return response.json()
}