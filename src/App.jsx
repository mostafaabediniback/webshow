import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/v/:id" element={<Video />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
