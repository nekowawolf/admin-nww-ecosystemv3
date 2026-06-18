import { useState } from 'react'
import { toast } from 'sonner'
import { createAITool } from '@/services/ai-tools/aiToolsService'
import { AIToolsRequest } from '@/types/ai-tools'

export function useAddAITool() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitAITool = async (data: AIToolsRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createAITool(data)
      toast.success('AI Tool added successfully!')
      setSuccessMessage('AI Tool added successfully!')
    } catch (err: any) {
      console.error('Error creating AI Tool:', err)
      const errorMsg = err.message || 'Failed to add AI Tool. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitAITool }
}
