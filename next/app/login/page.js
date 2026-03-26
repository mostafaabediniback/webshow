export const metadata = {
  title: 'ورود',
  description: 'ورود کاربران به پنل اربعین تی وی',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <section className="container" style={{ maxWidth: 500 }}>
      <article className="card">
        <h1>ورود</h1>
        <form className="grid">
          <label>شماره موبایل<input style={{ width: '100%', padding: 8 }} /></label>
          <label>رمز عبور<input type="password" style={{ width: '100%', padding: 8 }} /></label>
          <button className="btn" type="submit">ورود</button>
        </form>
      </article>
    </section>
  )
}
