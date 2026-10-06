'use client'

import GuildSubmissionsTable from '@/components/guild/GuildSubmissionsTable'
import { AIToolSubmission } from '@/types/ai-tools'

interface AIToolSubmissionsTableProps {
  data: AIToolSubmission[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => Promise<void>
  title?: string
  subtitle?: string
}

export default function AIToolSubmissionsTable(props: AIToolSubmissionsTableProps) {
  return (
    <GuildSubmissionsTable
      {...props}
      submissionUrlKey="website"
      entityName="AI Tool"
      linkColumnLabel="Website"
      searchPlaceholder="Search AI Tool submissions..."
    />
  )
}