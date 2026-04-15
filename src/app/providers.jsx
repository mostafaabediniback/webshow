'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import GlobalLoading from '../components/GlobalLoading'

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <GlobalLoading />
      <ToastContainer position="top-right" theme="colored" rtl />
    </QueryClientProvider>
  )
}
