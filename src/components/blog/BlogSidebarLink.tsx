'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { BlogProject, getBlogDashboardRoute } from '@/config/blogProjects'

interface Props {
  project: BlogProject
  variant: 'list' | 'add'
  onClose?: () => void
}

export default function BlogSidebarLink({ project, variant, onClose }: Props) {
  const pathname = usePathname()
  const baseRoute = getBlogDashboardRoute(project)
  const href = `${baseRoute}/${variant === 'list' ? 'blog-list' : 'add-blog'}`
  const active = pathname === href || (variant === 'list' && pathname.startsWith(`${baseRoute}/edit-blog/`))

  if (variant === 'list') {
    return (
      <Link href={href} onClick={onClose} aria-current={active ? 'page' : undefined} className={`block rounded-lg px-0 py-2 text-sm transition-colors ${active ? 'text-accent font-semibold' : 'text-secondary hover:text-accent'}`}>
        Blog List
      </Link>
    )
  }

  return (
    <Link href={href} onClick={onClose} aria-current={active ? 'page' : undefined} className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors border-l-4 ${active ? 'border-accent text-accent bg-accent/10' : 'border-transparent text-secondary hover:hover-bg'}`}>
      <IoIosAddCircleOutline className={active ? 'text-accent' : 'text-muted'} size={18} />
      <span>Add Blog</span>
    </Link>
  )
}