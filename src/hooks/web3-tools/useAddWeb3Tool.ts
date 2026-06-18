import { useState } from 'react'
import { toast } from 'sonner'
import { createWeb3Tool } from '@/services/web3-tools/web3ToolsService'
import { Web3ToolsRequest } from '@/types/web3-tools'

export function useAddWeb3Tool() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitWeb3Tool = async (data: Web3ToolsRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createWeb3Tool(data)
      toast.success('Web3 Tool added successfully!')
      setSuccessMessage('Web3 Tool added successfully!')
    } catch (err: any) {
      console.error('Error creating Web3 Tool:', err)
      const errorMsg = err.message || 'Failed to add Web3 Tool. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitWeb3Tool }
}
