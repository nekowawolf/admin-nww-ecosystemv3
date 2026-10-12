'use client'

import { useParams } from 'next/navigation'
import ClientAddSupporterPage from '../../add-supporter/ClientAddSupporterPage'

export default function ClientEdit() {
  const { id } = useParams<{ id: string }>()
  return <ClientAddSupporterPage editId={id} />
}