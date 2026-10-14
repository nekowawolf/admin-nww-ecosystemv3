import EditBlogClient from '@/components/blog/EditBlogClient'

export const metadata = {
  title: 'Edit Blog | Admin',
  description: 'Edit an AI Tools blog article',
}

export default function EditBlogPage() {
  return <EditBlogClient project="ai-tools" />
}