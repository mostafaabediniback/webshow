import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import GlobalLoading from '../src/components/GlobalLoading'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoading />
      <Component {...pageProps} />
      <ToastContainer position="top-right" theme="colored" rtl />
    </QueryClientProvider>
  )
}
