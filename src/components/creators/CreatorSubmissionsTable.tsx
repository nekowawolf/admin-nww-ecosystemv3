'use client'

import GuildSubmissionsTable from '@/components/guild/GuildSubmissionsTable'
import { CreatorSubmission } from '@/types/creators'

interface CreatorSubmissionsTableProps {
  data: CreatorSubmission[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => Promise<void>
  title?: string
  subtitle?: string
}

export default function CreatorSubmissionsTable(props: CreatorSubmissionsTableProps) {
  return (
    <GuildSubmissionsTable
      {...props}
      submissionUrlKey="website"
      entityName="Creator"
      linkColumnLabel="Website"
      searchPlaceholder="Search Creator submissions..."
    />
  )
}