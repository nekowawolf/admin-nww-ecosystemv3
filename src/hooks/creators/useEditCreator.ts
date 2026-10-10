import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getCreatorById, updateCreator } from '@/services/creators/creatorsService'
import { CreatorsRequest } from '@/types/creators'

export function useEditCreator(id: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<CreatorsRequest | null>(null)

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const data = await getCreatorById(id)
        if (data) {
          setInitialData({
            name: data.name || '',
            description: data.description || '',
            image_url: data.image_url || '',
            website: data.website || '',
            category: data.category || '',
            language: data.language || '',
            open_to_work: data.open_to_work || false,
            socials: {
              twitter: data.socials?.twitter || '',
              instagram: data.socials?.instagram || '',
              discord: data.socials?.discord || '',
              youtube: data.socials?.youtube || '',
              telegram: data.socials?.telegram || '',
              github: data.socials?.github || '',
              tiktok: data.socials?.tiktok || ''
            },
            platforms: {
              fiverr: data.platforms?.fiverr || '',
              upwork: data.platforms?.upwork || '',
              peopleperhour: data.platforms?.peopleperhour || '',
              freelancer: data.platforms?.freelancer || ''
            },
            added_by: data.added_by
          })
        }
      } catch (err: any) {
        console.error('Error fetching Creator:', err)
        toast.error('Failed to load Creator data')
      }
    }

    if (id) {
      fetchCreator()
    }
  }, [id])

  const submitEditCreator = async (data: CreatorsRequest) => {
    setIsSubmitting(true)
    try {
      await updateCreator(id, data)
      toast.success('Creator updated successfully!')
      return true
    } catch (err: any) {
      console.error('Error updating Creator:', err)
      const errorMsg = err.message || 'Failed to update Creator. Please try again.'
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, initialData, submitEditCreator }
}