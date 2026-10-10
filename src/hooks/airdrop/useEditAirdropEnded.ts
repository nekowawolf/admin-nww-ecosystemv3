import { useState } from 'react'
import { updateAirdrop } from '@/services/airdrop/airdropService'
import { AirdropRequest } from '@/types/airdrop'

export function useEditAirdropEnded() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const editAirdrop = async (id: string, data: AirdropRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await updateAirdrop(id, data)
      setSuccessMessage('Airdrop updated successfully!')
      return true
    } catch (error) {
      console.error('Error updating airdrop:', error)
      const errorMsg = error instanceof Error
        ? error.message
        : 'Failed to update airdrop. Please try again.'
      setErrorMessage(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, editAirdrop }
}