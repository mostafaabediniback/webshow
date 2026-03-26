import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="card" style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/">اربعین تی وی</Link>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/search/اربعین">جستجو</Link>
          <Link href="/login">ورود</Link>
          <Link href="/dashboard/videos">داشبورد</Link>
        </nav>
      </div>
    </header>
  )
}
