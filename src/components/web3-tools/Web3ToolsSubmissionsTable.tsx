'use client'

import NetSubmissionsTable from '@/components/net/NetSubmissionsTable'
import { Web3ToolsSubmission } from '@/types/web3-tools'

interface Web3ToolsSubmissionsTableProps {
  data: Web3ToolsSubmission[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => Promise<void>
  title?: string
  subtitle?: string
}

export default function Web3ToolsSubmissionsTable({
  data,
  loading,
  error,
  onDelete,
  title = 'Web3 Tool Submissions',
  subtitle = 'Review and manage incoming Web3 Tool submissions',
}: Web3ToolsSubmissionsTableProps) {
  return (
    <NetSubmissionsTable
      data={data}
      loading={loading}
      error={error}
      onDelete={onDelete}
      title={title}
      subtitle={subtitle}
    />
  )
}