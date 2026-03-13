import { useMemo, useState } from 'react'

export function usePaginationParams(initialPage = 1) {
  const [page, setPage] = useState(initialPage)

  return useMemo(
    () => ({
      page,
      setPage,
    }),
    [page]
  )
}

export default usePaginationParams
