'use client'

import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'

export default function BackButton() {
  const router = useRouter()
  
  return (
    <button 
      onClick={() => router.back()} 
      className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-6 group text-sm font-medium w-fit"
    >
      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
      <span>Back</span>
    </button>
  )
}