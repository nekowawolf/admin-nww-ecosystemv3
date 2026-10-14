'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { toast } from 'sonner'
import { SearchInput } from '@/components/ui/SearchInput'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { BlogProject, blogProjects, getBlogDashboardRoute } from '@/config/blogProjects'
import { BlogResponse } from '@/types/blog'
import { blogButtonClass } from './BlogField'

interface Props {
  project: BlogProject
  data: BlogResponse[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function BlogsTable({ project, data, loading, error, refetch, onDelete }: Props) {
  const label = blogProjects[project].label
  const dashboardRoute = getBlogDashboardRoute(project)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<BlogResponse | null>(null)
  const [deleting, setDeleting] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [actionBlog, setActionBlog] = useState<BlogResponse | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const filtered = data.filter(blog => [blog.name, blog.slug, blog.added_by?.name, ...(blog.categories || [])].some(value => value?.toLowerCase().includes(search.toLowerCase())))
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10))
  const currentPage = Math.min(page, totalPages)
  const rows = filtered.slice((currentPage - 1) * 10, currentPage * 10)

  useEffect(() => {
    if (selected) dialog.current?.showModal()
    else dialog.current?.close()
  }, [selected])

  useEffect(() => {
    if (!actionBlog) return
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setActionBlog(null)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActionBlog(null)
    }
    const close = () => setActionBlog(null)
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [actionBlog])

  const paginationRange: (number | string)[] = []
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) paginationRange.push(i)
  } else {
    paginationRange.push(1)
    if (currentPage > 3) paginationRange.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) paginationRange.push(i)
    if (currentPage < totalPages - 2) paginationRange.push('...')
    paginationRange.push(totalPages)
  }

  const confirmDelete = async () => {
    if (!selected || deleting) return
    setDeleting(true)
    try {
      await onDelete(selected._id)
      toast.success('Blog deleted successfully!')
      setSelected(null)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete blog')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">{label} Blog List</h2>
        <p className="text-xs sm:text-sm text-secondary">Manage your {label} Blog articles</p>
      </div>
      <SearchInput aria-label="Search blogs" placeholder={`Search ${label} Blogs...`} value={search} onChange={value => { setSearch(value); setPage(1); setActionBlog(null) }} suggestionData={data} suggestionKey="name" />
      {loading ? (
        <div role="status" aria-label="Loading blogs" className="flex justify-center py-10"><Spinner variant="circle" size={40} className="text-blue-500" /></div>
      ) : error ? (
        <div className="flex flex-col items-center gap-4 py-10 w-full">
          <div role="alert" className="text-red-500 text-center py-4 px-6 bg-red-500/10 rounded-lg border border-red-500/20 w-full max-w-md mx-auto">{error}</div>
          <button type="button" className={blogButtonClass} onClick={() => void refetch()}>Retry</button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg bg-[var(--fill-color)] border border-border-divider">
            <table className="w-full text-left text-primary">
              <thead className="bg-[var(--card-color3)]">
                <tr>
                  <th scope="col" className="px-6 py-2 min-w-[150px]">Title</th>
                  <th scope="col" className="px-6 py-2 min-w-[200px]">Slug</th>
                  <th scope="col" className="px-6 py-2 min-w-[250px]">Description</th>
                  <th scope="col" className="px-6 py-2 min-w-[200px]">Categories</th>
                  <th scope="col" className="px-6 py-2 min-w-[150px]">Author</th>
                  <th scope="col" className="px-6 py-2 min-w-[120px]">Date</th>
                  <th scope="col" className="px-6 py-2 min-w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(blog => {
                  const date = new Date(blog.created_at)
                  return (
                    <tr key={blog._id} className="border-t border-border-divider text-primary">
                      <td className="px-6 py-2 whitespace-nowrap">{blog.name || 'N/A'}</td>
                      <td className="px-6 py-2 text-secondary"><div className="max-w-[240px] truncate" title={blog.slug}>{blog.slug}</div></td>
                      <td className="px-6 py-2"><div className="max-w-[280px] truncate" title={blog.description}>{blog.description || 'N/A'}</div></td>
                      <td className="px-6 py-2">
                        <div className="flex flex-wrap gap-1.5">
                          {blog.categories?.length ? blog.categories.map(category => <span key={category} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs whitespace-nowrap flex-shrink-0">{category}</span>) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-secondary">{blog.added_by?.name || 'N/A'}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-secondary">{Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="px-6 py-2 relative">
                        <button type="button" aria-label={`Actions for ${blog.name}`} aria-haspopup="menu" aria-expanded={actionBlog?._id === blog._id} disabled={deleting} className="cursor-pointer p-2 disabled:opacity-50" onClick={event => {
                          const rect = event.currentTarget.getBoundingClientRect()
                          setDropdownPosition({ top: Math.max(8, Math.min(rect.top, window.innerHeight - 100)), left: Math.max(8, rect.left - 144) })
                          setActionBlog(blog)
                        }}><HiEllipsisVertical size={20} /></button>
                      </td>
                    </tr>
                  )
                })}
                {!rows.length && <tr><td colSpan={7} className="text-center py-4 text-secondary">No {label} Blogs found.</td></tr>}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <>
              <Pagination aria-label="Blog pagination" className="flex justify-center mt-4">
                <PaginationContent className="flex flex-wrap justify-center gap-1">
                  <PaginationItem><PaginationPrevious disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className={cn('cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm', currentPage === 1 && 'pointer-events-none opacity-50')} /></PaginationItem>
                  {paginationRange.map((value, index) => (
                    <PaginationItem key={index}>
                      {value === '...' ? <PaginationEllipsis className="text-xs sm:text-base" /> : (
                        <PaginationLink isActive={currentPage === value} onClick={() => setPage(Number(value))} className={cn('cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm transition-none', currentPage === value ? 'text-primary hover-bg-accent border-[var(--border-divider)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-accent)]')}>{value}</PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem><PaginationNext disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} className={cn('cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm', currentPage === totalPages && 'pointer-events-none opacity-50')} /></PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="text-center text-xs mt-2 text-secondary">Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, filtered.length)} of {filtered.length} {label} Blogs</div>
            </>
          )}
        </>
      )}
      {actionBlog && createPortal(
        <div ref={dropdownRef} className="fixed z-30 w-36 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider" style={dropdownPosition}>
          <ul role="menu" aria-label={`Actions for ${actionBlog.name}`} className="py-2 text-sm text-primary">
            <li><Link role="menuitem" href={`${dashboardRoute}/edit-blog/${actionBlog._id}`} onClick={() => setActionBlog(null)} className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 hover:bg-[var(--hover-bg)]"><MdEdit size={16} /> Edit</Link></li>
            <li><button type="button" role="menuitem" onClick={() => { setSelected(actionBlog); setActionBlog(null) }} className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-[var(--hover-bg)]"><FaTrash size={16} /> Delete</button></li>
          </ul>
        </div>, document.body
      )}
      <dialog ref={dialog} aria-labelledby="delete-blog-title" onCancel={event => { if (deleting) event.preventDefault(); else setSelected(null) }} onClose={() => setSelected(null)} className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-sm dropdown-bg rounded-lg shadow-lg p-6 text-center text-primary backdrop:bg-[var(--overlay-bg)]">
        <FaTrash size={32} className="text-red-600 mx-auto mb-4" />
        <h3 id="delete-blog-title" className="text-primary text-lg font-semibold mb-2">Delete {label} Blog</h3>
        <p className="text-secondary mb-6">Are you sure you want to delete this {label} Blog: <span className="font-semibold text-primary">{selected?.name}</span>?</p>
        <div className="flex justify-center gap-4">
          <button type="button" disabled={deleting} className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50" onClick={() => void confirmDelete()}>{deleting ? 'Deleting...' : 'Yes'}</button>
          <button type="button" autoFocus disabled={deleting} className="cursor-pointer bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50" onClick={() => setSelected(null)}>No</button>
        </div>
      </dialog>
    </div>
  )
}