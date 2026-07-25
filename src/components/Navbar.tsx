import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Search, Bell } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { path: '/', label: '首頁' },
    { path: '/forum', label: '論壇' },
    { path: '/plants', label: '植物圖鑑' },
    { path: '/journal', label: '成長日誌' },
    { path: '/community', label: '社群' },
  ]

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex items-center justify-between px-6 lg:px-8 py-4 bg-white/90 backdrop-blur-lg border-b border-green-100 dark:bg-gray-900/90 dark:border-gray-700 sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-3xl">🌍</div>
          <div>
            <div className="text-xl font-bold text-plant-primary dark:text-green-300">植物星球</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">PlantPlanet</div>
          </div>
        </Link>

        <div className="flex items-center gap-1 bg-green-50/80 rounded-2xl px-2 py-1.5 dark:bg-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-white text-plant-primary shadow-sm dark:bg-gray-700 dark:text-green-300'
                  : 'text-gray-500 hover:text-plant-primary hover:bg-white/60 dark:text-gray-400 dark:hover:text-green-300 dark:hover:bg-gray-700/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 text-gray-400 hover:text-plant-primary hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-green-300 rounded-xl transition-all"
          >
            <Search size={20} />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-plant-primary hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-green-300 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 text-gray-400 hover:text-plant-primary hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-yellow-300 rounded-xl transition-all"
            aria-label={isDark ? '切換為亮色模式' : '切換為暗色模式'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/profile"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-plant-primary text-white rounded-xl text-sm font-semibold hover:bg-plant-dark dark:hover:bg-green-600 transition-all"
          >
            <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-sm">🌱</span>
            我的植物星球
          </Link>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-lg border-b border-green-100 dark:bg-gray-900/95 dark:border-gray-700 sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl">🌍</div>
          <div>
            <div className="text-lg font-bold text-plant-primary dark:text-green-300">植物星球</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-gray-400 hover:text-plant-primary hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-green-300 rounded-xl transition-all"
          >
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-plant-primary hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-yellow-300 rounded-xl transition-all"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-plant-primary hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-300 rounded-xl transition-all"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-4 h-0.5 bg-current ml-auto" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 pt-20 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-plant-primary text-white'
                      : 'text-gray-600 hover:bg-green-50 hover:text-plant-primary dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-green-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-green-100 mt-6 pt-6 dark:border-gray-700">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-plant-primary text-white rounded-xl text-sm font-semibold"
              >
                <span>🌱</span>
                我的植物星球
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSearchOpen(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 shadow-xl dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <Search className="text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="搜尋植物、貼文、討論..."
                className="flex-1 text-sm outline-none py-1.5 placeholder:text-gray-400 dark:text-gray-100"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-green-100 z-10 dark:bg-gray-900/95 dark:border-gray-700">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                location.pathname === item.path
                  ? 'text-plant-primary dark:text-green-300'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
