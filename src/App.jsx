import { Routes, Route, Navigate } from 'react-router-dom'

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

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
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
  )
}

export default App
