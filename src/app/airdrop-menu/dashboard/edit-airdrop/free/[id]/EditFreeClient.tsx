'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAirdropFreeById } from '@/services/airdrop/freeService'
import EditAirdropForm from '@/components/airdrops/EditAirdropForm'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { toast } from 'sonner'

export default function EditAirdropPage() {
  useAuthGuard()

  const params = useParams()
  const router = useRouter()
  const [airdropData, setAirdropData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const id = params.id as string

  useEffect(() => {
    const fetchAirdropData = async () => {
      try {
        setLoading(true)
        const airdrop = await getAirdropFreeById(id)
        setAirdropData(airdrop)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch airdrop data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAirdropData()
    }
  }, [id])

  const handleSuccess = () => {
    toast.success('Airdrop updated successfully!')
    router.push('/airdrop-menu/dashboard/airdrop/free')
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10 mt-36">
        <Spinner variant="circle" size={40} className="text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-primary mb-2">Error</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={() => router.push('/airdrop-menu/dashboard/airdrop/free')}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:text-base text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!airdropData) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-primary mb-2">Airdrop Not Found</h2>
          <p className="text-secondary mb-4 sm:text-base text-sm">The airdrop you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/airdrop-menu/dashboard/airdrop/free')}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:text-base text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <EditAirdropForm
        airdropData={airdropData}
        type="free"
        onSuccess={handleSuccess}
      />
    </div>
  )
}