import { Routes, Route } from 'react-router-dom'
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
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/channels" element={<Channels />} />
      <Route path="/dashboard/upload" element={<Upload />} />
      <Route path="/dashboard/videos" element={<Videos />} />
      <Route path="/dashboard/videos/:id" element={<VideoEdit />} />
    </Routes>
  )
}

export default App
