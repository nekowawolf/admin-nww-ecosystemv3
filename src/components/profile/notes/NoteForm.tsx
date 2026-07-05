"use client"

import { useState } from 'react'
import { NoteRequest } from '@/types/notes'
import { CustomDropdown } from '@/components/ui/CustomDropdown'

interface NoteFormProps {
  initialData?: NoteRequest
  onSubmit: (data: NoteRequest) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
}

export default function NoteForm({ initialData, onSubmit, onCancel, isSubmitting }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteRequest>(
    initialData || { title: '', content: '', type: 'journal' }
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <div className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-primary mb-6">
        {initialData ? 'Edit Note' : 'Add New Note'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter note title"
            required
            className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-medium">Type *</label>
          <CustomDropdown
            id="type"
            name="type"
            value={formData.type}
            onChange={(value) => handleDropdownChange('type', value)}
            options={[
              { value: 'journal', label: 'Journal' },
              { value: 'idea', label: 'Idea' },
              { value: 'task', label: 'Task' }
            ]}
            placeholder="Select Type"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-medium">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Enter note content"
            required
            className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-secondary border border-border-divider hover:bg-[var(--hover-bg)] cursor-pointer text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors"
          >
            {isSubmitting ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  )
}