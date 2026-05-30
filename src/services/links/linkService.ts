import { authFetch } from '@/services/auth/authService'
import { LinkPostRequest, Profile } from '@/types/link'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Profile
export const getProfile = async () => {
  const response = await authFetch(`${API_BASE_URL}/profilelink`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch profile')
  }

  return response.json()
}

export const updateProfile = async (data: Profile) => {
  const response = await authFetch(`${API_BASE_URL}/profilelink`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update profile')
  }

  return response.json()
}

// Posts
export const getPosts = async () => {
  const response = await authFetch(`${API_BASE_URL}/postslink`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch posts')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const getPostById = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/postslink/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }

  const data = await response.json()
  return data.data
}

export const createPost = async (data: LinkPostRequest) => {
  const response = await authFetch(`${API_BASE_URL}/postslink`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create post')
  }

  return response.json()
}

export const updatePost = async (id: string, data: LinkPostRequest) => {
  const response = await authFetch(`${API_BASE_URL}/postslink/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update post')
  }

  return response.json()
}

export const deletePost = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/postslink/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete post')
  }

  return response.json()
}