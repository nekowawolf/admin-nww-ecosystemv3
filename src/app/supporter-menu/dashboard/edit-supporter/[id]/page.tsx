'use client'

import { useParams } from 'next/navigation'
import ClientAddSupporterPage from '../../add-supporter/ClientAddSupporterPage'

export default function EditSupporterPage() {
  const { id } = useParams<{ id: string }>()
  return <ClientAddSupporterPage editId={id} />
}