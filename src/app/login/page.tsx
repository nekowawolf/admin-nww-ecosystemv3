'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()

   useEffect(() => {
    const token = Cookies.get('refresh_token')
    if (token) router.push('/airdrop-menu/dashboard')
  }, [router])

  const handleClose = () => {
    router.push('/')
  }

  return (
    <section className="grid min-h-screen place-items-center bg-gray-900 p-8">
      <div className="w-80 rounded-md bg-gray-700 p-4 pt-0 shadow-lg transition-transform transform hover:scale-[1.01]">
        <header className="flex h-16 items-center justify-between font-bold text-white">
          <span>After Life</span>
          <i
            onClick={handleClose}
            className="fa-regular fa-x mr-1 cursor-pointer hover:text-gray-300 transition-colors"
          ></i>
        </header>
        <LoginForm />
      </div>
    </section>
  )
}