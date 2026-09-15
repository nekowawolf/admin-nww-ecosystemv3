'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useGuildData } from '@/hooks/guild/useGuildData'
import GuildTable from '@/components/guild/GuildTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useGuildData()

  return (
    <div>
      <GuildTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}