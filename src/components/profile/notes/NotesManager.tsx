"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { NoteResponse, NoteRequest } from '@/types/notes'
import { getNotes, createNote, updateNote, deleteNote } from '@/services/notes/notesService'
import NotesTable from './NotesTable'
import NoteForm from './NoteForm'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa'
import { FiFilter, FiChevronDown, FiCheck } from 'react-icons/fi'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

function FilterDropdown({ selectedType, setSelectedType }: { selectedType: string, setSelectedType: (type: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setIsOpen(false)
          }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const hasActiveFilters = selectedType !== 'All'
  const types = ['All', 'Journal', 'Idea', 'Task']
  
  return (
    <div className="relative inline-block text-left shrink-0" ref={dropdownRef}>
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
                flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer border
                ${isOpen || hasActiveFilters ? 'bg-blue-500/10 text-blue-600 border-blue-500/50' : 'bg-[var(--fill-color)] text-secondary border-border-divider hover:text-primary hover:border-primary'}
            `}
        >
            <FiFilter className={`w-4 h-4 ${isOpen || hasActiveFilters ? 'text-blue-500' : ''}`} />
            <span>Filter</span>
            <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
            <div className="absolute z-50 mt-2 w-48 rounded-xl bg-[var(--fill-color)] border border-border-divider shadow-xl overflow-hidden focus:outline-none left-0 sm:left-auto sm:right-0 origin-top-left sm:origin-top-right">
                <div className="px-2 py-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary px-2 mb-2 mt-1">Category Type</h3>
                    <div className="space-y-1">
                        {types.map(type => (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedType(type)
                                    setIsOpen(false)
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${selectedType === type
                                        ? 'bg-blue-500/10 text-blue-600 font-medium'
                                        : 'text-secondary hover:bg-[var(--hover-bg)] hover:text-primary'
                                    }`}
                            >
                                <span>{type}</span>
                                {selectedType === type && <FiCheck className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default function NotesManager() {
  useAuthGuard()

  const [notes, setNotes] = useState<NoteResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list')
  const [selectedNote, setSelectedNote] = useState<NoteResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedType, setSelectedType] = useState('All')

  const filteredNotes = useMemo(() => {
    if (selectedType === 'All') return notes;
    return notes.filter(n => n.type?.toLowerCase() === selectedType.toLowerCase())
  }, [notes, selectedType])

  const fetchNotes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getNotes()
      setNotes(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notes')
      toast.error('Failed to load notes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleAddSubmit = async (data: NoteRequest) => {
    setIsSubmitting(true)
    try {
      await createNote(data)
      toast.success('Note added successfully')
      fetchNotes()
      setView('list')
    } catch (err: any) {
      toast.error(err.message || 'Failed to add note')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (data: NoteRequest) => {
    if (!selectedNote) return
    setIsSubmitting(true)
    try {
      await updateNote(selectedNote._id, data)
      toast.success('Note updated successfully')
      fetchNotes()
      setView('list')
      setSelectedNote(null)
    } catch (err: any) {
      toast.error(err.message || 'Failed to update note')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id)
      toast.success('Note deleted successfully')
      setNotes(prev => prev.filter(note => note._id !== id))
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete note')
    }
  }

  const handleEditClick = (note: NoteResponse) => {
    setSelectedNote(note)
    setView('edit')
  }

  const handleCancelForm = () => {
    setView('list')
    setSelectedNote(null)
  }

  return (
    <div className="w-full mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary">Admin Notes</h2>
          <p className="text-sm text-secondary">Manage your journals, ideas, and tasks</p>
        </div>
        {view === 'list' && (
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <FilterDropdown selectedType={selectedType} setSelectedType={setSelectedType} />
            <button
              onClick={() => setView('add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FaPlus size={12} /> Add Note
            </button>
          </div>
        )}
      </div>

      {view === 'list' && (
        <>
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner variant="circle" size={40} className="text-blue-500" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-10 w-full">
              <div className="text-red-500 text-center py-4 px-6 bg-red-500/10 rounded-lg border border-red-500/20 w-full max-w-md mx-auto">
                {error}
              </div>
            </div>
          ) : (
            <NotesTable data={filteredNotes} onEdit={handleEditClick} onDelete={handleDelete} />
          )}
        </>
      )}

      {view === 'add' && (
        <NoteForm
          onSubmit={handleAddSubmit}
          onCancel={handleCancelForm}
          isSubmitting={isSubmitting}
        />
      )}

      {view === 'edit' && selectedNote && (
        <NoteForm
          initialData={{
            title: selectedNote.title,
            content: selectedNote.content,
            type: selectedNote.type || 'journal'
          }}
          onSubmit={handleEditSubmit}
          onCancel={handleCancelForm}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}