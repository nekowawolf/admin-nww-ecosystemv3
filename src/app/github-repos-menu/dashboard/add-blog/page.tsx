import BlogForm from '@/components/blog/BlogForm'

export const metadata = {
  title: 'Add Blog | Admin',
  description: 'Create a GitHub Repos blog article',
}

export default function AddBlogPage() {
  return <BlogForm project="github-repos" />
}