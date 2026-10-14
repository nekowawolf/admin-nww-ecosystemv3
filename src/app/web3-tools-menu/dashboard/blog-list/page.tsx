import BlogListClient from '@/components/blog/BlogListClient'

export const metadata = {
  title: 'Blog List | Admin',
  description: 'Manage Web3 Tools blog articles',
}

export default function BlogListPage() {
  return <BlogListClient project="web3-tools" />
}