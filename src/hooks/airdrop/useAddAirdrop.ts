import { useState } from 'react'
import { toast } from 'sonner'
import { createAirdrop } from '@/services/airdrop/airdropService'
import { AirdropRequest } from '@/types/airdrop'

export function useAddAirdrop() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitAirdrop = async (
    data: AirdropRequest,
    type: 'free' | 'paid'
  ) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      // Ensure the is_paid flag is set correctly based on the type parameter
      const payload = {
        ...data,
        is_paid: type === 'paid'
      }

      await createAirdrop(payload as AirdropRequest)
      const successText = `${type === 'free' ? 'Free' : 'Paid'} airdrop created successfully!`
      toast.success(successText)
      setSuccessMessage(successText)
      return true
    } catch (error) {
      console.error('Error creating airdrop:', error)
      const errorMsg = error instanceof Error
        ? error.message
        : 'Failed to create airdrop. Please try again.'
      setErrorMessage(errorMsg)
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitAirdrop }
}