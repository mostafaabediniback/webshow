import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import VideoSkeleton from './components/VideoSkeleton'

const Home = lazy(() => import('./pages/Home'))
const Video = lazy(() => import('./pages/Video'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Channels = lazy(() => import('./pages/Channels'))
const Upload = lazy(() => import('./pages/Upload'))
const Videos = lazy(() => import('./pages/Videos'))
const VideoEdit = lazy(() => import('./pages/VideoEdit'))
const Search = lazy(() => import('./pages/Search'))
const Users = lazy(() => import('./pages/Users'))
const UserVideos = lazy(() => import('./pages/UserVideos'))
const UploadedVideos = lazy(() => import('./pages/UploadedVideos'))

const RequireAuth = ({ children }) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null
  return token ? children : <Navigate to="/login" replace />
}

const RequireUserRole = ({ children }) => {
  const role = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null
  if (role === 'admin') return children
  return <Navigate to="/dashboard" replace />
}

const RequireAdminRole = ({ children }) => {
  const role = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null
  if (role === 'admin') return <Navigate to="/dashboard/user-videos" replace />
  return children
}

const RouteFallback = () => (
  <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8">
    <VideoSkeleton count={6} />
  </div>
)

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/:username?" element={<Home />} />
        <Route path="/search/:q" element={<Search />} />
        <Route path="/v/:id" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/dashboard/channels" element={<RequireAuth><RequireAdminRole><Channels /></RequireAdminRole></RequireAuth>} />
        <Route path="/dashboard/upload" element={<RequireAuth><RequireAdminRole><Upload /></RequireAdminRole></RequireAuth>} />
        <Route path="/dashboard/videos" element={<RequireAuth><RequireAdminRole><Videos /></RequireAdminRole></RequireAuth>} />
        <Route path="/dashboard/videos/:id" element={<RequireAuth><RequireAdminRole><VideoEdit /></RequireAdminRole></RequireAuth>} />
        <Route path="/dashboard/users" element={<RequireAuth><RequireAdminRole><Users /></RequireAdminRole></RequireAuth>} />
        <Route path="/dashboard/user-upload" element={<RequireAuth><RequireUserRole><UserVideos /></RequireUserRole></RequireAuth>} />
        <Route path="/dashboard/user-videos" element={<RequireAuth><RequireUserRole><UploadedVideos /></RequireUserRole></RequireAuth>} />
      </Routes>
    </Suspense>
  )
}

export default App
