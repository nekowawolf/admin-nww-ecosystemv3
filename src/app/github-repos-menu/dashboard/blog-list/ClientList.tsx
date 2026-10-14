'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useGithubBlogsData } from '@/hooks/github-repos/useGithubBlogsData'
import GithubBlogsTable from '@/components/github-repos/blog/GithubBlogsTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, refetch, handleDelete } = useGithubBlogsData()
  return <GithubBlogsTable data={data} loading={loading} error={error} refetch={refetch} onDelete={handleDelete} />
}