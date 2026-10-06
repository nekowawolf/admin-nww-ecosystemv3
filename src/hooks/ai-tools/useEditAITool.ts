import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getAIToolById, updateAITool } from '@/services/ai-tools/aiToolsService'
import { AIToolsRequest } from '@/types/ai-tools'

export function useEditAITool(id: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<AIToolsRequest | null>(null)

  useEffect(() => {
    const fetchAITool = async () => {
      try {
        const data = await getAIToolById(id)
        if (data) {
          setInitialData({
            name: data.name || '',
            description: data.description || '',
            categories: data.categories || [],
            image_url: data.image_url || '',
            website: data.website || '',
            media: {
              video_url: data.media?.video_url || '',
              screenshot_urls: data.media?.screenshot_urls || []
            },
            socials: {
              twitter: data.socials?.twitter || '',
              instagram: data.socials?.instagram || '',
              discord: data.socials?.discord || '',
              youtube: data.socials?.youtube || ''
            },
            added_by: {
              name: data.added_by?.name || '',
              url: data.added_by?.url || ''
            },
          })
        }
      } catch (err: any) {
        console.error('Error fetching AI Tool:', err)
        toast.error('Failed to load AI Tool data')
      }
    }

    if (id) {
      fetchAITool()
    }
  }, [id])

  const submitEditAITool = async (data: AIToolsRequest) => {
    setIsSubmitting(true)
    try {
      await updateAITool(id, data)
      toast.success('AI Tool updated successfully!')
      return true
    } catch (err: any) {
      console.error('Error updating AI Tool:', err)
      const errorMsg = err.message || 'Failed to update AI Tool. Please try again.'
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, initialData, submitEditAITool }
}