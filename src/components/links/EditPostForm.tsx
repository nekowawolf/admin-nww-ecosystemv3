'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { toast } from 'sonner'
import { updatePost, getPostById } from '@/services/links/linkService'
import { LinkPostRequest } from '@/types/link'
import { CustomDropdown } from '@/components/ui/CustomDropdown'


export default function EditPostForm() {
  useAuthGuard()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<LinkPostRequest>({
    caption: '',
    url: '',
    category: ''
  })

  // Fetch initial data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setInitialLoading(true)
        const data = await getPostById(id)
        if (data) {
          setFormData({
            caption: data.caption || '',
            url: data.url || '',
            category: data.category || ''
          })
        } else {
          setError('Post not found')
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch post')
      } finally {
        setInitialLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await updatePost(id, formData)
      toast.success('Post updated successfully')
      router.push('/links-menu/dashboard/posts')
    } catch (err: any) {
      toast.error(err.message || 'Failed to update post')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center py-10 mt-36">
        <Spinner variant="circle" size={40} className="text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-primary mb-2">Error</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={() => router.push('/links-menu/dashboard/posts')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:text-base text-sm"
          >
            Back to Posts
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Edit Post
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Update the link post data
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              
              {/* Caption */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="caption">
                  Caption *
                </label>
                <textarea
                  id="caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What is this post about?"
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="url">
                  URL (Optional)
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="category">
                  Category *
                </label>
                <CustomDropdown
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(val) => setFormData(p => ({...p, category: val}))}
                  options={[
                    { value: 'AI Prompts', label: 'AI Prompts' },
                    { value: 'Templates', label: 'Templates' },
                    { value: 'projects', label: 'Projects' }
                  ]}
                  placeholder="Select category"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
              <button
                type="button"
                onClick={() => router.push('/links-menu/dashboard/posts')}
                className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}