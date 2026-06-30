import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  Images,
  Settings,
  Star,
  LogOut,
  Menu as MenuIcon,
  X,
} from 'lucide-react'
import OverviewTab from './tabs/OverviewTab'
import ReservationsTab from './tabs/ReservationsTab'
import GalleryTab from './tabs/GalleryTab'
import ReviewsTab from './tabs/ReviewsTab'
import SettingsTab from './tabs/SettingsTab'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'reservations', label: 'Reservations', icon: CalendarCheck },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('sem-admin-auth')
    navigate('/admin')
  }

  const TabComponent = {
    overview: OverviewTab,
    reservations: ReservationsTab,
    gallery: GalleryTab,
    reviews: ReviewsTab,
    settings: SettingsTab,
  }[activeTab]

  return (
    <div className="flex min-h-screen bg-pink-light/20">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-ink px-5 py-3.5 text-ivory lg:hidden">
        <span className="font-display text-lg font-semibold">The Sem Admin</span>
        <button onClick={() => setSidebarOpen((o) => !o)} aria-label="Toggle menu">
          {sidebarOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 flex-shrink-0 bg-ink text-ivory transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-5 py-6 pt-16 lg:pt-6">
          <p className="hidden font-display text-xl font-semibold lg:block">
            The Sem
          </p>
          <p className="hidden text-xs text-ivory/50 lg:block">Admin Dashboard</p>

          <nav className="mt-8 flex-1 space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id)
                  setSidebarOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  activeTab === id
                    ? 'bg-pink-deep text-ivory'
                    : 'text-ivory/70 hover:bg-ivory/10'
                }`}
              >
                <Icon size={17} /> {label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ivory/70 hover:bg-ivory/10"
          >
            <LogOut size={17} /> Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-ink/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 px-5 py-6 pt-20 sm:px-8 lg:pt-8">
        <TabComponent />
      </main>
    </div>
  )
}
