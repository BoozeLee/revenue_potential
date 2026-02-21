import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Pricing from './pages/Pricing'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">Revenue Potential</Link>
              <div className="space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
