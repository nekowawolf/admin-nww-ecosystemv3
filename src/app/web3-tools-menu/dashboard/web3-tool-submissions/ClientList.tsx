'use client'

import Web3ToolsSubmissionsTable from '@/components/web3-tools/Web3ToolsSubmissionsTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useWeb3ToolSubmissions } from '@/hooks/web3-tools/useWeb3ToolSubmissions'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, deleteSubmission } = useWeb3ToolSubmissions()

  return (
    <Web3ToolsSubmissionsTable
      title="Web3 Tool Submissions"
      subtitle="Manage submitted Web3 Tool websites"
      data={data}
      loading={loading}
      error={error}
      onDelete={deleteSubmission}
    />
  )
}