'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useWeb3ToolsData } from '@/hooks/web3-tools/useWeb3ToolsData'
import Web3ToolsTable from '@/components/web3-tools/Web3ToolsTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useWeb3ToolsData()

  return (
    <div>
      <Web3ToolsTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}
