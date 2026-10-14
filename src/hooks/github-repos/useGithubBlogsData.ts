'use client'

import { useCallback, useEffect, useState } from 'react'
import { deleteGithubBlog, getGithubBlogs } from '@/services/github-repos/githubBlogService'
import { GithubBlogResponse } from '@/types/github-blog'

export function useGithubBlogsData() {
  const [data, setData] = useState<GithubBlogResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await getGithubBlogs())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void refetch() }, [refetch])

  const handleDelete = async (id: string) => {
    await deleteGithubBlog(id)
    setData(previous => previous.filter(blog => blog._id !== id))
  }

  return { data, loading, error, refetch, handleDelete }
}