"use client"

import { useState } from 'react'

interface MessageFormProps {
  initialData?: string
  onSubmit: (content: string) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
}

export default function MessageForm({ initialData, onSubmit, onCancel, isSubmitting }: MessageFormProps) {
  const [content, setContent] = useState(initialData || '')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(content)
  }

  return (
    <div className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-primary mb-6">
        {initialData !== undefined ? 'Edit Message' : 'Add New Message'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-secondary text-sm font-medium">Content *</label>
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
            placeholder="Enter message content"
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
            {isSubmitting ? 'Saving...' : 'Save Message'}
          </button>
        </div>
      </form>
    </div>
  )
}