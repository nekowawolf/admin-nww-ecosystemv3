'use client'

import { useParams } from 'next/navigation'
import GithubBlogForm from '@/components/github-repos/blog/GithubBlogForm'

export default function ClientEdit() {
  const { id } = useParams<{ id: string }>()
  return <GithubBlogForm id={id} />
}