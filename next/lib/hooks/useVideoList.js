'use client'

import { useMemo, useState } from 'react'

export function useVideoList(initialItems = []) {
  const [page, setPage] = useState(1)
  const pageSize = 8
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return initialItems.slice(start, start + pageSize)
  }, [initialItems, page])

  return {
    page,
    setPage,
    items: paged,
    totalPages: Math.max(1, Math.ceil(initialItems.length / pageSize)),
  }
}
