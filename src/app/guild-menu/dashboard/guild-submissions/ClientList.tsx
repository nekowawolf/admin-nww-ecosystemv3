'use client'

import GuildSubmissionsTable from '@/components/guild/GuildSubmissionsTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useGuildSubmissions } from '@/hooks/guild/useGuildSubmissions'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, deleteSubmission } = useGuildSubmissions()

  return (
    <GuildSubmissionsTable
      title="Guild Submissions"
      subtitle="Manage submitted Guild links"
      data={data}
      loading={loading}
      error={error}
      onDelete={deleteSubmission}
    />
  )
}