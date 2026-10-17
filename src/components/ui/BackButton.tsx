'use client'

import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'

export default function BackButton() {
  const router = useRouter()
  
  return (
    <button
      type="button"
      onClick={() => router.back()} 
      className="back-control mb-6 w-fit"
    >
      <FiArrowLeft aria-hidden="true" />
      <span>Back</span>
    </button>
  )
}