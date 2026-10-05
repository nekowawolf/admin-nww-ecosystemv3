'use client'

import NetSubmissionsTable from '@/components/net/NetSubmissionsTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useNetSubmissions } from '@/hooks/net/useNetSubmissions'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, deleteSubmission } = useNetSubmissions()

  return (
    <NetSubmissionsTable
      title="Net Submissions"
      subtitle="Manage submitted websites"
      data={data}
      loading={loading}
      error={error}
      onDelete={deleteSubmission}
    />
  )
}