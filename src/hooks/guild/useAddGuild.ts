import { useState } from 'react'
import { toast } from 'sonner'
import { createGuild } from '@/services/guild/guildService'
import { GuildRequest } from '@/types/guild'

export function useAddGuild() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitGuild = async (data: GuildRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createGuild(data)
      toast.success('Guild added successfully!')
      setSuccessMessage('Guild added successfully!')
    } catch (err: any) {
      console.error('Error creating Guild:', err)
      const errorMsg = err.message || 'Failed to add Guild. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitGuild }
}