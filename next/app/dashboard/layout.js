import Link from 'next/link'

export const metadata = {
  title: 'داشبورد',
  description: 'مدیریت محتوا',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }) {
  return (
    <section className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16 }}>
      <aside className="card">
        <nav className="grid">
          <Link href="/dashboard/videos">ویدیوها</Link>
          <Link href="/dashboard/uploaded-videos">ویدیوهای من</Link>
        </nav>
      </aside>
      <main>{children}</main>
    </section>
  )
}
