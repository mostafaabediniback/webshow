import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout