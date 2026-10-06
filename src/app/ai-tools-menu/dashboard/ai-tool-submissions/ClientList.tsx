'use client'

import AIToolSubmissionsTable from '@/components/ai-tools/AIToolSubmissionsTable'
import { useAIToolSubmissions } from '@/hooks/ai-tools/useAIToolSubmissions'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, deleteSubmission } = useAIToolSubmissions()

  return (
    <AIToolSubmissionsTable
      title="AI Tool Submissions"
      subtitle="Review and manage incoming AI Tool submissions"
      data={data}
      loading={loading}
      error={error}
      onDelete={deleteSubmission}
    />
  )
}