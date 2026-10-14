import BlogForm from '@/components/blog/BlogForm'

export const metadata = {
  title: 'Add Blog | Admin',
  description: 'Create a Guild blog article',
}

export default function AddBlogPage() {
  return <BlogForm project="guild" />
}