'use client'

import { BlogProject } from '@/config/blogProjects'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useBlogsData } from '@/hooks/blog/useBlogsData'
import BlogsTable from './BlogsTable'

export default function BlogListClient({ project }: { project: BlogProject }) {
  useAuthGuard()
  const { data, loading, error, refetch, handleDelete } = useBlogsData(project)
  return <BlogsTable project={project} data={data} loading={loading} error={error} refetch={refetch} onDelete={handleDelete} />
}