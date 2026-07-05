import { authFetch } from '@/services/auth/authService'
import { NoteRequest, NoteResponse } from '@/types/notes'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createNote = async (data: NoteRequest) => {
  const response = await authFetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create note')
  }

  return response.json()
}

export const getNotes = async (): Promise<NoteResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/notes`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch notes')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [])
}

export const updateNote = async (_id: string, data: NoteRequest) => {
  const response = await authFetch(`${API_BASE_URL}/notes/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update note')
  }

  return response.json()
}

export const getNoteById = async (_id: string): Promise<NoteResponse> => {
  const response = await authFetch(`${API_BASE_URL}/notes/${_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch note')
  }

  const data = await response.json()
  if (data.data) {
    return data.data
  } else if (data._id) {
    return data
  } else {
    throw new Error('Unexpected response format')
  }
}

export const deleteNote = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/notes/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete note')
  }

  return response.json()
}
