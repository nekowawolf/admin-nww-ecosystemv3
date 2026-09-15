import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getGuildById, updateGuild } from '@/services/guild/guildService'
import { GuildRequest } from '@/types/guild'

export function useEditGuild(id: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<GuildRequest | null>(null)

  useEffect(() => {
    const fetchGuild = async () => {
      try {
        const data = await getGuildById(id)
        if (data) {
          setInitialData({
            name: data.name || '',
            description: data.description || '',
            image_url: data.image_url || '',
            website: data.website || '',
            platform: data.platform || '',
            category: data.category || '',
            link: data.link || '',
            socials: {
              twitter: data.socials?.twitter || '',
              instagram: data.socials?.instagram || '',
              discord: data.socials?.discord || '',
              github: data.socials?.github || '',
              youtube: data.socials?.youtube || ''
            }
          })
        }
      } catch (err: any) {
        console.error('Error fetching Guild:', err)
        toast.error('Failed to load Guild data')
      }
    }

    if (id) {
      fetchGuild()
    }
  }, [id])

  const submitEditGuild = async (data: GuildRequest) => {
    setIsSubmitting(true)
    try {
      await updateGuild(id, data)
      toast.success('Guild updated successfully!')
      return true
    } catch (err: any) {
      console.error('Error updating Guild:', err)
      const errorMsg = err.message || 'Failed to update Guild. Please try again.'
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, initialData, submitEditGuild }
}