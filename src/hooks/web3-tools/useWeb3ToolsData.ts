import { useState, useEffect } from 'react'
import { getWeb3Tools, deleteWeb3Tool } from '@/services/web3-tools/web3ToolsService'
import { Web3ToolsResponse } from '@/types/web3-tools'

export const useWeb3ToolsData = () => {
  const [data, setData] = useState<Web3ToolsResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getWeb3Tools()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.name
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch Web3 tools')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteWeb3Tool(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete Web3 tool')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    handleDelete
  }
}
