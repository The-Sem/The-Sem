import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingSocial from './components/FloatingSocial'
import RequireAdmin from './components/RequireAdmin'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Menu from './pages/Menu'
import CraftCocktail from './pages/CraftCocktail'
import FounderPage from './pages/FounderPage'
import Gallery from './pages/Gallery'
import Reservation from './pages/Reservation'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Placeholder from './pages/Placeholder'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingSocial />
    </div>
  )
}

export default function App() {
  return (
    <>
      {/* Resets scroll to top on every route change */}
      <ScrollToTop />

      <Routes>
      {/* Admin routes — no public navbar/footer */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />

      {/* Public site */}
      <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
      <Route path="/menu" element={<SiteLayout><Menu /></SiteLayout>} />
      <Route
        path="/craft-your-cocktail"
        element={<SiteLayout><CraftCocktail /></SiteLayout>}
      />
      <Route path="/gallery" element={<SiteLayout><Gallery /></SiteLayout>} />
      <Route path="/reviews" element={<SiteLayout><Reviews /></SiteLayout>} />
      <Route path="/reservation" element={<SiteLayout><Reservation /></SiteLayout>} />
      <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
      <Route
        path="/founders/:slug"
        element={<SiteLayout><FounderPage /></SiteLayout>}
      />

      <Route
        path="*"
        element={
          <SiteLayout>
            <Placeholder
              title="Page Not Found"
              description="The page you're looking for doesn't exist."
            />
          </SiteLayout>
        }
      />
      </Routes>
    </>
  )
}
