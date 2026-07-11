import { authFetch } from '@/services/auth/authService'
import { MessageData } from '@/types/messages'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getMessage = async (): Promise<MessageData> => {
  const response = await authFetch(`${API_BASE_URL}/message`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch messages')
  }

  const data = await response.json()
  return data.data
}

export const updateMessage = async (data: MessageData) => {
  const response = await authFetch(`${API_BASE_URL}/message`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update messages')
  }

  return response.json()
}