'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useCommunitySubmissions } from '@/hooks/community/useCommunitySubmissions'
import CommunitySubmissionsTable from '@/components/community/CommunitySubmissionsTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useCommunitySubmissions()

  return (
    <div>
      <CommunitySubmissionsTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}