'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useGithubReposData } from '@/hooks/github-repos/useGithubReposData'
import GithubReposTable from '@/components/github-repos/GithubReposTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useGithubReposData()

  return (
    <div>
      <GithubReposTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}
