import { useState } from 'react'
import { toast } from 'sonner'
import { createCreator } from '@/services/creators/creatorsService'
import { CreatorsRequest } from '@/types/creators'

export function useAddCreator() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitCreator = async (data: CreatorsRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createCreator(data)
      toast.success('Creator added successfully!')
      setSuccessMessage('Creator added successfully!')
      return true
    } catch (err: any) {
      console.error('Error creating Creator:', err)
      const errorMsg = err.message || 'Failed to add Creator. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitCreator }
}