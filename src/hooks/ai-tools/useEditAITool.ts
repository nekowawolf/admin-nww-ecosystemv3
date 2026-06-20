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
            video_url: data.video_url || '',
            imgURL: data.imgURL || '',
            website: data.website || '',
            twitter: data.twitter || '',
            instagram: data.instagram || '',
            discord: data.discord || '',
            telegram: data.telegram || ''
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
