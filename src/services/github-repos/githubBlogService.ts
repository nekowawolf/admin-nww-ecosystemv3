import { authFetch } from '@/services/auth/authService'
import { GithubBlogRequest, GithubBlogResponse } from '@/types/github-blog'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function blogRequest(path = '', options: RequestInit = {}) {
  const response = await authFetch(`${API_BASE_URL}/githubblog${path}`, {
    ...options,
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || error.message || 'Failed to process GitHub blog')
  }
  return response.json()
}

export async function getGithubBlogs(): Promise<GithubBlogResponse[]> {
  const result = await blogRequest()
  return Array.isArray(result.data) ? result.data : []
}

export async function getGithubBlogById(id: string): Promise<GithubBlogResponse> {
  return blogRequest(`/${encodeURIComponent(id)}`)
}

export async function createGithubBlog(data: GithubBlogRequest) {
  return blogRequest('', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateGithubBlog(id: string, data: GithubBlogRequest) {
  return blogRequest(`/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteGithubBlog(id: string) {
  return blogRequest(`/${encodeURIComponent(id)}`, { method: 'DELETE' })
}