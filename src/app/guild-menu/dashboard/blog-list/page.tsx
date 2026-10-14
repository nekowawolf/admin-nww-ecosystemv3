import BlogListClient from '@/components/blog/BlogListClient'

export const metadata = {
  title: 'Blog List | Admin',
  description: 'Manage Guild blog articles',
}

export default function BlogListPage() {
  return <BlogListClient project="guild" />
}