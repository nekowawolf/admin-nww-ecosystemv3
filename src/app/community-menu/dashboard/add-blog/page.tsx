import BlogForm from '@/components/blog/BlogForm'

export const metadata = {
  title: 'Add Blog | Admin',
  description: 'Create a Crypto Community blog article',
}

export default function AddBlogPage() {
  return <BlogForm project="crypto-community" />
}