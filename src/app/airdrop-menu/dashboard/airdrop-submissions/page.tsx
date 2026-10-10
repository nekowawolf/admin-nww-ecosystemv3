import ClientList from './ClientList'
import { dashboardMetadata } from '@/constants/metadataTemplates'

export const metadata = dashboardMetadata(
  'Airdrop Submissions',
  'Review and manage incoming airdrop submissions'
)

export default function AirdropSubmissionsPage() {
  return <ClientList />
}