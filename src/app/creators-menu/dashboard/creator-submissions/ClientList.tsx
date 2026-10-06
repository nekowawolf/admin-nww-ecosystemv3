'use client'

import CreatorSubmissionsTable from '@/components/creators/CreatorSubmissionsTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useCreatorSubmissions } from '@/hooks/creators/useCreatorSubmissions'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, deleteSubmission } = useCreatorSubmissions()

  return (
    <CreatorSubmissionsTable
      title="Creator Submissions"
      subtitle="Manage submitted Creator websites"
      data={data}
      loading={loading}
      error={error}
      onDelete={deleteSubmission}
    />
  )
}