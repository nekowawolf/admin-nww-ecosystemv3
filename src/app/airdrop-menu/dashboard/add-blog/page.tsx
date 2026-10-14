import BlogForm from '@/components/blog/BlogForm'

export const metadata = {
  title: 'Add Blog | Admin',
  description: 'Create an Airdrop blog article',
}

export default function AddBlogPage() {
  return <BlogForm project="airdrop" />
}