import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Search, Bell } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/forum', label: 'Forum', icon: '💬' },
    { path: '/plants', label: 'Plants', icon: '🌿' },
    { path: '/journal', label: 'Journal', icon: '📓' },
    { path: '/community', label: 'Community', icon: '👥' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-green-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🌍</span>
            <span className="text-xl font-['Playfair_Display'] font-bold text-plant-primary">PlantPlanet</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path === '/forum' && location.pathname.startsWith('/forum'))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-plant-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-plant-primary hover:bg-plant-light'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-plant-light hover:text-plant-primary transition-all"
            >
              <Search size={18} />
            </button>
            <button className="relative p-2.5 rounded-xl text-gray-500 hover:bg-plant-light hover:text-plant-primary transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-plant-light hover:text-plant-primary transition-all"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-plant-light transition-all"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                alt="Profile"
                className="w-8 h-8 rounded-full bg-plant-light"
              />
            </Link>
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <input
            type="text"
            placeholder="Search plants, posts, topics..."
            className="input-field py-3"
            autoFocus
          />
        </div>
      )}

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/forum' && location.pathname.startsWith('/forum'))
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'text-plant-primary'
                    : 'text-gray-400'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
