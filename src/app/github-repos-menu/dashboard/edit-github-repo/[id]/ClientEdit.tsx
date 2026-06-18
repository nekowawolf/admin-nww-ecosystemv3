'use client'

import EditGithubReposForm from '@/components/github-repos/EditGithubReposForm'
import { useParams } from 'next/navigation'

export default function ClientEdit() {
  const params = useParams()
  const id = params.id as string

  return (
    <div>
      <EditGithubReposForm id={id} />
    </div>
  )
}
