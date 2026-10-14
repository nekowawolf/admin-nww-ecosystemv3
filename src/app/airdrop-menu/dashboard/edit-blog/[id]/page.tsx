import EditBlogClient from '@/components/blog/EditBlogClient'

export const metadata = {
  title: 'Edit Blog | Admin',
  description: 'Edit an Airdrop blog article',
}

export default function EditBlogPage() {
  return <EditBlogClient project="airdrop" />
}