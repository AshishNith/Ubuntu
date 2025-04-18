import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import TopBar from './components/TopBar'
import Dock from './components/Dock'
import { WindowProvider } from './contexts/WindowContext'

const App = () => {
  return (
    <Router>
      <WindowProvider>
        <div className='text-black'>
          <TopBar />
          <Dock />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </WindowProvider>
    </Router>
  )
}

export default App