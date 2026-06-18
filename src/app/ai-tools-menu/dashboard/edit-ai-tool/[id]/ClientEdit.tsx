'use client'

import EditAIToolsForm from '@/components/ai-tools/EditAIToolsForm'
import { useParams } from 'next/navigation'

export default function ClientEdit() {
  const params = useParams()
  const id = params.id as string

  return (
    <div>
      <EditAIToolsForm id={id} />
    </div>
  )
}
