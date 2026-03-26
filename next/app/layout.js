import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/providers'

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'اربعین تی وی',
    template: '%s | اربعین تی وی',
  },
  description: 'پلتفرم اشتراک و تماشای ویدیوهای اربعین تی وی',
  openGraph: {
    type: 'website',
    siteName: 'اربعین تی وی',
    title: 'اربعین تی وی',
    description: 'پلتفرم اشتراک و تماشای ویدیوهای اربعین تی وی',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اربعین تی وی',
    description: 'پلتفرم اشتراک و تماشای ویدیوهای اربعین تی وی',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
