import { authFetch } from '@/services/auth/authService'
import { BlogProject, blogProjects } from '@/config/blogProjects'
import { BlogRequest, BlogResponse } from '@/types/blog'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function blogRequest(project: BlogProject, path = '', options: RequestInit = {}) {
  const response = await authFetch(`${API_BASE_URL}/${blogProjects[project].endpoint}${path}`, {
    ...options,
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || error.message || `Failed to process ${blogProjects[project].label} blog`)
  }
  return response.json()
}

export async function getBlogs(project: BlogProject): Promise<BlogResponse[]> {
  const result = await blogRequest(project)
  return Array.isArray(result.data) ? result.data : []
}

export async function getBlogById(project: BlogProject, id: string): Promise<BlogResponse> {
  return blogRequest(project, `/${encodeURIComponent(id)}`)
}

export async function createBlog(project: BlogProject, data: BlogRequest) {
  return blogRequest(project, '', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateBlog(project: BlogProject, id: string, data: BlogRequest) {
  return blogRequest(project, `/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteBlog(project: BlogProject, id: string) {
  return blogRequest(project, `/${encodeURIComponent(id)}`, { method: 'DELETE' })
}