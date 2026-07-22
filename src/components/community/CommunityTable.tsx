'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { cn } from "@/lib/utils"
import { FallbackImage } from '@/components/ui/FallbackImage'
import { HiEllipsisVertical } from "react-icons/hi2"
import { FaTrash } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { SearchInput } from "@/components/ui/SearchInput"
import { createPortal } from "react-dom"
import { toast } from 'sonner'

interface CommunityTableProps {
  data: any[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => Promise<void>
  editRoute: string
  title: string
  subtitle: string
}

export default function CommunityTable({
  data,
  loading,
  error,
  onDelete,
  editRoute,
  title,
  subtitle
}: CommunityTableProps) {
  const router = useRouter()
  
  const safeData = Array.isArray(data) ? data.filter(item => 
    item && 
    item !== null && 
    item !== undefined && 
    item.name && 
    item.platforms && 
    item.category && 
    item.link_url
  ) : []

  // ===== STATE =====
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  // ===== HANDLE CLICK OUTSIDE DROPDOWN =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ===== FILTER & PAGINATION =====
  const filteredData = useMemo(() => {
    return safeData.filter(item =>
      (item.name?.toLowerCase() || '').includes(search.toLowerCase())
    )
  }, [search, safeData])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const getPaginationRange = () => {
    const range: (number | string)[] = []
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) range.push(i)
    } else {
      range.push(1)
      if (currentPage > 3) range.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) range.push(i)
      if (currentPage < totalPages - 2) range.push('...')
      range.push(totalPages)
    }
    return range
  }

  // ===== DROPDOWN ACTION =====
  const handleOpenDropdown = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - 144
    })
    setOpenDropdownIndex(index)
  }

  const handleEdit = (item: any) => {
    router.push(`${editRoute}/${item._id}`)
    setOpenDropdownIndex(null)
  }

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedId(id)
    setSelectedName(name)
    setShowConfirmModal(true)
    setOpenDropdownIndex(null)
  }

  const confirmDelete = async () => {
    if (!selectedId) return
    try {
      await onDelete(selectedId)
      toast.success("Community deleted successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to delete community.")
    } finally {
      setShowConfirmModal(false)
      setSelectedId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // ===== RENDER =====
  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">{title}</h2>
        <p className="text-xs sm:text-sm text-secondary">{subtitle}</p>
      </div>

      <SearchInput
        placeholder="Search communities..."
        value={search}
        onChange={setSearch}
      />

      {loading && (
        <div className="flex justify-center py-10">
          <Spinner variant="circle" size={40} className="text-blue-500" />
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-10 w-full">
          <div className="text-red-500 text-center py-4 px-6 bg-red-500/10 rounded-lg border border-red-500/20 w-full max-w-md mx-auto">
            {error}
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg bg-[var(--fill-color)] border border-border-divider">
          <table className="w-full text-left">
            <thead className="bg-[var(--card-color3)]">
              <tr>
                <th className="px-6 py-2 min-w-[80px]">Image</th>
                <th className="px-6 py-2 min-w-[120px]">Name</th>
                <th className="px-6 py-2 min-w-[120px]">Platform</th>
                <th className="px-6 py-2 min-w-[120px]">Category</th>
                <th className="px-6 py-2 min-w-[80px]">Link</th>
                <th className="px-6 py-2 min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="border-t border-border-divider">
                    <td className="px-6 py-2">
                          <div className="relative w-10 h-10">
                            <FallbackImage 
                              src={item.img_url || ''} 
                              alt={item.name || 'Community'}
                              fill
                              className="object-cover rounded-lg"
                              sizes="40px"
                            />
                          </div>
                    </td>
                    <td className="px-6 py-2">{item.name || 'N/A'}</td>
                    <td className="px-6 py-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {item.platforms || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-2">{item.category || 'N/A'}</td>
                    <td className="px-6 py-2 text-accent">
                      {item.link_url ? (
                        <a 
                          href={item.link_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          Visit
                        </a>
                      ) : (
                        <span className="text-primary">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-2 relative">
                      <button onClick={(e) => handleOpenDropdown(e, index)} className="cursor-pointer p-2">
                        <HiEllipsisVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-secondary">No communities found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {openDropdownIndex !== null &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-30 w-36 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`
            }}
          >
            <ul className="py-2 text-sm text-primary">
              <li>
                <button
                  onClick={() => handleEdit(paginatedData[openDropdownIndex])}
                  className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 hover:hover-bg"
                >
                  <MdEdit size={16} /> Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeleteClick(
                    paginatedData[openDropdownIndex]._id, 
                    paginatedData[openDropdownIndex].name || 'Unknown'
                  )}
                  className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:hover-bg"
                >
                  <FaTrash size={16} /> Delete
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )
      }

      {/* Confirm Delete Modal */}
      {showConfirmModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-[var(--overlay-bg)] z-50">
            <div className="dropdown-bg rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
              <FaTrash size={32} className="text-red-600 mx-auto mb-4" />
              <h3 className="text-primary text-lg font-semibold mb-2">Delete Community</h3>
              <p className="text-secondary mb-6">
                Are you sure you want to delete this community:{" "}
                <span className="font-semibold text-primary">{selectedName}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="cursor-pointer bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  No
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      }

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <>
          <Pagination className="flex justify-center mt-4">
            <PaginationContent className="flex flex-wrap justify-center gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={cn("cursor-pointer", 
                    "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {getPaginationRange().map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis className="text-xs sm:text-base" />
                  ) : (
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(Number(page))}
                      className={cn("cursor-pointer", 
                        "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm transition-none",
                        currentPage === page
                         ? "text-primary hover-bg-accent border-[var(--border-divider)] shadow-sm"
                         : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-accent)]"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={cn("cursor-pointer", 
                    "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm",
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          {/* Pagination Info */}
          <div className="text-center text-xs text-muted-foreground mt-2 text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} communities
          </div>
        </>
      )}
    </div>
  )
}