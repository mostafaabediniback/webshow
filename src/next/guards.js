import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { safeSessionStorage } from '../utils/safeStorage'

export function useRequireAuth() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const token = safeSessionStorage.get('token')
    if (!token) {
      router.replace('/login')
      return
    }
    setAllowed(true)
  }, [router])

  return allowed
}

export function useRequireUserRole() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const role = safeSessionStorage.get('role')
    if (role !== 'admin') {
      router.replace('/dashboard')
      return
    }
    setAllowed(true)
  }, [router])

  return allowed
}

export function useRequireAdminRole() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const role = safeSessionStorage.get('role')
    if (role === 'admin') {
      router.replace('/dashboard/user-videos')
      return
    }
    setAllowed(true)
  }, [router])

  return allowed
}
