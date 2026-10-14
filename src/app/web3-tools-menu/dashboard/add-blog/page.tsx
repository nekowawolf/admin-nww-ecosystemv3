import BlogForm from '@/components/blog/BlogForm'

export const metadata = {
  title: 'Add Blog | Admin',
  description: 'Create a Web3 Tools blog article',
}

export default function AddBlogPage() {
  return <BlogForm project="web3-tools" />
}