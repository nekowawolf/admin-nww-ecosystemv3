'use client'

import AirdropSubmissionsTable from '@/components/airdrops/AirdropSubmissionsTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAirdropSubmissions } from '@/hooks/airdrop/useAirdropSubmissions'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, deleteSubmission } = useAirdropSubmissions()

  return (
    <AirdropSubmissionsTable
      title="Airdrop Submissions"
      subtitle="Manage submitted airdrop websites"
      data={data}
      loading={loading}
      error={error}
      onDelete={deleteSubmission}
    />
  )
}