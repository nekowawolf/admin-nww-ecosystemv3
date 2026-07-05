"use client"

import { useState, useMemo, useRef, useEffect } from 'react'
import { NoteResponse } from '@/types/notes'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { HiEllipsisVertical } from "react-icons/hi2"
import { FaTrash, FaTimes, FaCalendarAlt, FaFileAlt } from "react-icons/fa"
import { MdEdit, MdTitle } from "react-icons/md"
import { TbCategoryFilled } from "react-icons/tb"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface NotesTableProps {
  data: NoteResponse[]
  onEdit: (note: NoteResponse) => void
  onDelete: (id: string) => void
}

export default function NotesTable({ data, onEdit, onDelete }: NotesTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState<NoteResponse | null>(null)
  const [selectedViewNote, setSelectedViewNote] = useState<NoteResponse | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const totalPages = Math.ceil(data.length / itemsPerPage)
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return data.slice(startIndex, startIndex + itemsPerPage)
  }, [data, currentPage])

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

  const handleOpenDropdown = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    
    let leftPos = rect.left + window.scrollX - 144
    if (leftPos < 8) leftPos = 8
    
    const dropdownWidth = 144
    if (leftPos + dropdownWidth > window.innerWidth) {
      leftPos = window.innerWidth - dropdownWidth - 8
    }

    setDropdownPosition({
      top: rect.top + window.scrollY,
      left: leftPos
    })
    setOpenDropdownIndex(index)
  }

  const handleDeleteClick = (note: NoteResponse) => {
    setSelectedNote(note)
    setShowConfirmModal(true)
    setOpenDropdownIndex(null)
  }

  const confirmDelete = () => {
    if (selectedNote) {
      onDelete(selectedNote._id)
      setShowConfirmModal(false)
      setSelectedNote(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg bg-[var(--fill-color)] border border-border-divider">
        <table className="w-full text-left">
          <thead className="bg-[var(--card-color3)]">
            <tr>
              <th className="px-6 py-4 font-semibold text-primary">Title</th>
              <th className="px-6 py-4 font-semibold text-primary">Type</th>
              <th className="px-6 py-4 font-semibold text-primary">Date</th>
              <th className="px-6 py-4 font-semibold text-primary">Content</th>
              <th className="px-6 py-4 font-semibold text-primary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-divider">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item._id} className="border-t border-border-divider">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedViewNote(item)} 
                      className="text-primary font-medium hover:text-blue-500 hover:underline transition-colors cursor-pointer text-left line-clamp-2"
                    >
                      {item.title}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs capitalize bg-blue-100 text-blue-800">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {item.created_at ? formatDate(item.created_at) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-secondary text-sm">
                      {item.content && item.content.length > 30 ? item.content.slice(0, 30) + '...' : item.content}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button onClick={(e) => handleOpenDropdown(e, index)} className="p-2 text-secondary hover:text-primary cursor-pointer rounded-lg hover:bg-border-divider transition-colors">
                      <HiEllipsisVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-secondary">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openDropdownIndex !== null &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-30 w-36 dropdown-bg divide-y divide-border-divider rounded-lg shadow-lg border border-border-divider"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <ul className="py-2 text-sm text-primary">
              <li>
                <button
                  onClick={() => {
                    onEdit(paginatedData[openDropdownIndex])
                    setOpenDropdownIndex(null)
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:hover-bg cursor-pointer"
                >
                  <MdEdit size={16} /> Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeleteClick(paginatedData[openDropdownIndex])}
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:hover-bg cursor-pointer"
                >
                  <FaTrash size={16} /> Delete
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )
      }

      {showConfirmModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-[var(--overlay-bg)] z-50 p-4">
            <div className="dropdown-bg rounded-xl shadow-2xl p-6 max-w-sm w-full text-center border border-border-divider">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash size={24} className="text-red-600" />
              </div>
              <h3 className="text-primary text-xl font-semibold mb-2">Delete Note</h3>
              <p className="text-secondary mb-8">
                Are you sure you want to delete <span className="font-semibold text-primary">"{selectedNote?.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 bg-[var(--fill-color)] border border-border-divider text-primary px-6 py-2.5 rounded-lg hover:bg-[var(--hover-bg)] transition-colors duration-200 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 cursor-pointer bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )
      }

      {totalPages > 1 && (
        <Pagination className="flex justify-center mt-4">
          <PaginationContent className="flex flex-wrap justify-center gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm cursor-pointer",
                  "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-accent)] bg-transparent",
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
                    className={cn(
                      "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm transition-none cursor-pointer",
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
                className={cn(
                  "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm cursor-pointer",
                  "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-accent)] bg-transparent",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedViewNote &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-[var(--overlay-bg)] z-50 p-4">
            <div className="dropdown-bg rounded-xl shadow-2xl p-6 max-w-lg w-full border border-border-divider relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedViewNote(null)}
                className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity text-primary cursor-pointer"
              >
                <FaTimes size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-primary mb-5 pr-8 border-b border-border-divider pb-3">
                Note Details
              </h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-secondary mb-1.5">
                    <MdTitle size={16} />
                    <span className="text-sm font-semibold">Title</span>
                  </div>
                  <p className="text-primary font-medium text-lg leading-snug">{selectedViewNote.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 bg-[var(--fill-color)] p-3 rounded-lg border border-border-divider">
                  <div>
                    <div className="flex items-center gap-2 text-secondary mb-2">
                      <TbCategoryFilled size={16} />
                      <span className="text-sm font-semibold">Type</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                      {selectedViewNote.type}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-secondary mb-2">
                      <FaCalendarAlt size={14} />
                      <span className="text-sm font-semibold">Date</span>
                    </div>
                    <p className="text-primary text-sm font-medium">
                      {selectedViewNote.created_at ? formatDate(selectedViewNote.created_at) : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <FaFileAlt size={14} />
                    <span className="text-sm font-semibold">Content</span>
                  </div>
                  <div className="bg-[var(--fill-color)] p-4 rounded-lg border border-border-divider max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <p className="text-primary text-sm whitespace-pre-wrap break-words w-full leading-relaxed">
                      {selectedViewNote.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  )
}