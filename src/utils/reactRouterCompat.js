'use client'

import { useEffect } from 'react'
import NextLink from 'next/link'
import { useParams as useNextParams, usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation'

const resolveHref = (to) => {
  if (typeof to === 'string') return to
  if (to && typeof to === 'object') {
    const pathname = to.pathname || ''
    const search = to.search || ''
    const hash = to.hash || ''
    return `${pathname}${search}${hash}`
  }
  return '/'
}

export function Link({ to = '/', children, ...props }) {
  const href = resolveHref(to)
  return <NextLink href={href} {...props}>{children}</NextLink>
}

export function NavLink(props) {
  return <Link {...props} />
}

export function useNavigate() {
  const router = useRouter()
  return (to, options = {}) => {
    const href = resolveHref(to)
    if (options?.replace) {
      router.replace(href)
      return
    }
    router.push(href)
  }
}

export function useLocation() {
  const pathname = usePathname()
  const searchParams = useNextSearchParams()
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : ''
  return { pathname, search, hash: '', state: null, key: pathname }
}

export function useParams() {
  return useNextParams()
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, to, replace])

  return null
}

export function BrowserRouter({ children }) {
  return children
}

export function Routes({ children }) {
  return children
}

export function Route() {
  return null
}
