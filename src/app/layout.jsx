import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Providers from './providers'

export const metadata = {
  title: 'WebShow',
  description: 'Arbaeen TV',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
