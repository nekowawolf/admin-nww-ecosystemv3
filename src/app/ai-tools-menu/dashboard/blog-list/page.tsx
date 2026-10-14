import BlogListClient from '@/components/blog/BlogListClient'

export const metadata = {
  title: 'Blog List | Admin',
  description: 'Manage AI Tools blog articles',
}

export default function BlogListPage() {
  return <BlogListClient project="ai-tools" />
}