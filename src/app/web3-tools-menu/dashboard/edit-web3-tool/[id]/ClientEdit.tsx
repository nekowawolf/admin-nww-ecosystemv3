'use client'

import EditWeb3ToolsForm from '@/components/web3-tools/EditWeb3ToolsForm'
import { useParams } from 'next/navigation'

export default function ClientEdit() {
  const params = useParams()
  const id = params.id as string

  return (
    <div>
      <EditWeb3ToolsForm id={id} />
    </div>
  )
}
