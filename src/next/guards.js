import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useRequireAuth() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null
    if (!token) {
      router.replace('/login')
      return
    }
    setAuthorized(true)
  }, [router])

  return authorized
}

export function useRequireUserRole() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const role = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null
    if (role !== 'admin') {
      router.replace('/dashboard')
      return
    }
    setAuthorized(true)
  }, [router])

  return authorized
}

export function useRequireAdminRole() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const role = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null
    if (role === 'admin') {
      router.replace('/dashboard/user-videos')
      return
    }
    setAuthorized(true)
  }, [router])

  return authorized
}
