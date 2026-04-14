import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Channels from './pages/Channels'
import Upload from './pages/Upload'
import Videos from './pages/Videos'
import VideoEdit from './pages/VideoEdit'
import Search from './pages/Search'
import Users from './pages/Users'
import UserVideos from './pages/UserVideos'
import UploadedVideos from './pages/UploadedVideos'
import SettingsPage from './pages/SettingsPage'
import useAuthStore, { hydrateAuthStore } from './store/useAuthStore'

const RequireAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const RequirePlatformAdmin = ({ children }) => {
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin)
  return isChannelAdmin ? <Navigate to="/dashboard/user-videos" replace /> : children
}

const RequireChannelAdmin = ({ children }) => {
  const isChannelAdmin = useAuthStore((state) => state.isChannelAdmin)
  return isChannelAdmin ? children : <Navigate to="/dashboard" replace />
}

const PublicOnly = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const defaultDashboardRoute = useAuthStore((state) => state.defaultDashboardRoute)

  return isAuthenticated
    ? <Navigate to={defaultDashboardRoute} replace />
    : children
}

function AuthNavigationEffects() {
  const navigate = useNavigate()

  useEffect(() => {
    hydrateAuthStore()

    const handleUnauthorized = () => {
      hydrateAuthStore()
      navigate('/login', { replace: true })
    }

    const handleStorageChange = () => {
      hydrateAuthStore()
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [navigate])

  return null
}

function App() {
  return (
    <>
      <AuthNavigationEffects />
      <Routes>
        <Route path="/:username?" element={<Home />} />
        <Route path="/search/:q" element={<Search />} />
        <Route path="/v/:id" element={<Video />} />
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />

        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/channels" element={<RequireAuth><RequirePlatformAdmin><Channels /></RequirePlatformAdmin></RequireAuth>} />
        <Route path="/dashboard/upload" element={<RequireAuth><RequirePlatformAdmin><Upload /></RequirePlatformAdmin></RequireAuth>} />
        <Route path="/dashboard/videos" element={<RequireAuth><RequirePlatformAdmin><Videos /></RequirePlatformAdmin></RequireAuth>} />
        <Route path="/dashboard/videos/:id" element={<RequireAuth><RequirePlatformAdmin><VideoEdit /></RequirePlatformAdmin></RequireAuth>} />
        <Route path="/dashboard/users" element={<RequireAuth><RequirePlatformAdmin><Users /></RequirePlatformAdmin></RequireAuth>} />
        <Route path="/dashboard/user-upload" element={<RequireAuth><RequireChannelAdmin><UserVideos /></RequireChannelAdmin></RequireAuth>} />
        <Route path="/dashboard/user-videos" element={<RequireAuth><RequireChannelAdmin><UploadedVideos /></RequireChannelAdmin></RequireAuth>} />
        <Route path="/dashboard/settings" element={<RequireAuth><RequireChannelAdmin><SettingsPage /></RequireChannelAdmin></RequireAuth>} />
      </Routes>
    </>
  )
}

export default App
