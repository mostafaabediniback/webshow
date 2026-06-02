import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <div className="fixed bottom-0 left-0 w-full ">
        <Footer />
      </div>{" "}
    </div>
  );
}

export default Layout;
