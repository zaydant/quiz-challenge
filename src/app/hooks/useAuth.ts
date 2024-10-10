'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/store/authStore'

export function useAuth() {
  const { user, token, setUser, setToken } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (!user || !token) {
        router.push('/signin')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [user, token, router])

  const logout = () => {
    setUser(null)
    setToken(null)
    router.push('/signin')
  }

  return { user, token, logout, isLoading }
}