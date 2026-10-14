'use client'

import { useCallback, useEffect, useState } from 'react'
import { BlogProject } from '@/config/blogProjects'
import { deleteBlog, getBlogs } from '@/services/blog/blogService'
import { BlogResponse } from '@/types/blog'

export function useBlogsData(project: BlogProject) {
  const [data, setData] = useState<BlogResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getBlogs(project)
      setData([...result].reverse())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }, [project])

  useEffect(() => { void refetch() }, [refetch])

  const handleDelete = async (id: string) => {
    await deleteBlog(project, id)
    setData(previous => previous.filter(blog => blog._id !== id))
  }

  return { data, loading, error, refetch, handleDelete }
}