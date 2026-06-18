'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAIToolsData } from '@/hooks/ai-tools/useAIToolsData'
import AIToolsTable from '@/components/ai-tools/AIToolsTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useAIToolsData()

  return (
    <div>
      <AIToolsTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}
