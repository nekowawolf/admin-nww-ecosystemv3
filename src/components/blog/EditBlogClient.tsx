'use client'

import { useParams } from 'next/navigation'
import { BlogProject } from '@/config/blogProjects'
import BlogForm from './BlogForm'

export default function EditBlogClient({ project }: { project: BlogProject }) {
  const { id } = useParams<{ id: string }>()
  return <BlogForm project={project} id={id} />
}