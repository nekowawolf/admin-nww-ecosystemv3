import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getNetById, updateNet } from '@/services/net/netService'
import { NetRequest } from '@/types/net'

export function useEditNet(id: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<NetRequest | null>(null)

  useEffect(() => {
    const fetchNet = async () => {
      try {
        const data = await getNetById(id)
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
              github: data.socials?.github || '',
              youtube: data.socials?.youtube || ''
            },
            added_by: data.added_by
          })
        }
      } catch (err: any) {
        console.error('Error fetching Net:', err)
        toast.error('Failed to load Net data')
      }
    }

    if (id) {
      fetchNet()
    }
  }, [id])

  const submitEditNet = async (data: NetRequest) => {
    setIsSubmitting(true)
    try {
      await updateNet(id, data)
      toast.success('Net updated successfully!')
      return true
    } catch (err: any) {
      console.error('Error updating Net:', err)
      const errorMsg = err.message || 'Failed to update Net. Please try again.'
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, initialData, submitEditNet }
}