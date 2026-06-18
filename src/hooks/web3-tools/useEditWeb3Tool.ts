import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getWeb3ToolById, updateWeb3Tool } from '@/services/web3-tools/web3ToolsService'
import { Web3ToolsRequest } from '@/types/web3-tools'

export function useEditWeb3Tool(id: string) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<Web3ToolsRequest | null>(null)

  useEffect(() => {
    const fetchWeb3Tool = async () => {
      try {
        const data = await getWeb3ToolById(id)
        if (data) {
          setInitialData({
            name: data.name || '',
            description: data.description || '',
            category: data.category || '',
            chains: data.chains || [],
            imageUrl: data.imageUrl || '',
            website: data.website || '',
            twitter: data.twitter || '',
            discord: data.discord || '',
            telegram: data.telegram || ''
          })
        }
      } catch (err: any) {
        console.error('Error fetching Web3 Tool:', err)
        toast.error('Failed to load Web3 Tool data')
      }
    }

    if (id) {
      fetchWeb3Tool()
    }
  }, [id])

  const submitEditWeb3Tool = async (data: Web3ToolsRequest) => {
    setIsSubmitting(true)
    try {
      await updateWeb3Tool(id, data)
      toast.success('Web3 Tool updated successfully!')
      return true
    } catch (err: any) {
      console.error('Error updating Web3 Tool:', err)
      const errorMsg = err.message || 'Failed to update Web3 Tool. Please try again.'
      toast.error(errorMsg)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, initialData, submitEditWeb3Tool }
}
