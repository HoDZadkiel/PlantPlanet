import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ForumPage from './pages/ForumPage'
import PlantLibraryPage from './pages/PlantLibraryPage'
import JournalPage from './pages/JournalPage'
import CommunityPage from './pages/CommunityPage'
import PostPage from './pages/PostPage'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-green-50 dark:bg-gray-950">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/:id" element={<PostPage />} />
            <Route path="/plants" element={<PlantLibraryPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
