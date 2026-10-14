import EditBlogClient from '@/components/blog/EditBlogClient'

export const metadata = {
  title: 'Edit Blog | Admin',
  description: 'Edit a NET blog article',
}

export default function EditBlogPage() {
  return <EditBlogClient project="net" />
}