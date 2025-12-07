import { Routes, Route, Navigate } from 'react-router-dom'
const RequireAuth = ({ children }) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null
  return token ? children : <Navigate to="/login" replace />
}
import Home from './pages/Home'
import Video from './pages/Video'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Channels from './pages/Channels'
import Upload from './pages/Upload'
import Videos from './pages/Videos'
import VideoEdit from './pages/VideoEdit'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/v/:id" element={<Video />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/dashboard/channels" element={<RequireAuth><Channels /></RequireAuth>} />
      <Route path="/dashboard/upload" element={<RequireAuth><Upload /></RequireAuth>} />
      <Route path="/dashboard/videos" element={<RequireAuth><Videos /></RequireAuth>} />
      <Route path="/dashboard/videos/:id" element={<RequireAuth><VideoEdit /></RequireAuth>} />
    </Routes>
  )
}

export default App
