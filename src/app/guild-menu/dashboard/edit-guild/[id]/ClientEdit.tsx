'use client'

import EditGuildForm from '@/components/guild/EditGuildForm'
import { useParams } from 'next/navigation'

export default function ClientEdit() {
  const params = useParams()
  const id = params.id as string

  return (
    <div>
      <EditGuildForm id={id} />
    </div>
  )
}