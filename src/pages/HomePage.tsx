import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { posts } from '../data/mockData'
import { categories } from '../data/mockData'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { icon: '🌿', label: 'Active Growers', value: '12,847' },
    { icon: '📝', label: 'Forum Posts', value: '89,562' },
    { icon: '🌱', label: 'Plants Documented', value: '4,291' },
    { icon: '📸', label: 'Photos Shared', value: '256,783' },
  ]

  const featuredPosts = posts.filter(p => p.upvotes > 80)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-plant-dark via-plant-primary to-plant-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-pulse">🌱</div>
          <div className="absolute top-20 right-20 text-6xl animate-pulse delay-100">🌿</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-pulse delay-200">🍃</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-pulse delay-300">🌺</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-white mb-6 leading-tight">
              Join the World's Most
              <br />
              <span className="text-plant-light">Thriving</span> Plant Community
            </h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Share your plant journey, get expert advice, and connect with fellow green thumbs from around the globe.
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for plants, care tips, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder:text-green-200 border border-white/20 focus:border-white/50 focus:bg-white/20 outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="px-3 py-1.5 bg-white/20 rounded-lg text-xs text-green-100">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/forum" className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
                Explore Forum
                <ArrowRight size={18} />
              </Link>
              <Link to="/plants" className="bg-white/10 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
                🌿 Plant Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card bg-white p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-plant-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse by Category</h2>
            <p className="text-gray-500">Find the perfect community for your plant interests</p>
          </div>
          <Link to="/forum" className="text-plant-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link to={`/forum?category=${cat.id}`} key={cat.id} className="card p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-2xl`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{cat.description}</p>
                  <div className="text-xs text-gray-400">{cat.postCount.toLocaleString()} posts</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp size={24} className="text-plant-primary" />
          <h2 className="text-3xl font-bold text-gray-800">Trending This Week</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredPosts.map((post) => (
            <Link to={`/forum/${post.id}`} key={post.id} className="card p-5">
              {post.images && post.images.length > 0 && (
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <div className="flex items-start gap-3 mb-3">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full bg-plant-light" />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{post.author}</div>
                  <div className="text-xs text-gray-400">{post.timestamp}</div>
                </div>
                {post.isPinned && (
                  <span className="px-2 py-1 bg-plant-primary text-white text-xs rounded-full">📌 Pinned</span>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 hover:text-plant-primary">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">👍 {post.upvotes}</span>
                <span className="flex items-center gap-1">💬 {post.comments}</span>
                <div className="flex gap-1 ml-auto">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-plant-primary to-plant-dark rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 right-10 text-7xl">🌿</div>
            <div className="absolute bottom-5 left-10 text-6xl">🍀</div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4">
              Ready to Start Your Plant Journey?
            </h2>
            <p className="text-green-100 mb-8 max-w-lg mx-auto">
              Join thousands of plant lovers sharing their passion, knowledge, and beautiful green spaces.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/forum" className="bg-white text-plant-primary px-8 py-3.5 rounded-2xl font-semibold hover:bg-plant-light transition-all">
                Start Posting
              </Link>
              <Link to="/journal" className="bg-white/10 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-white/20 transition-all">
                📓 Create Journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-green-100">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌍</span>
              <span className="text-lg font-bold text-plant-primary">PlantPlanet</span>
            </div>
            <p className="text-sm text-gray-500">
              The world's friendliest plant community. Grow together, learn together, thrive together.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Community</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <Link to="/forum" className="block hover:text-plant-primary">Forum</Link>
              <Link to="/plants" className="block hover:text-plant-primary">Plant Library</Link>
              <Link to="/community" className="block hover:text-plant-primary">Members</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <a href="#" className="block hover:text-plant-primary">Care Guides</a>
              <a href="#" className="block hover:text-plant-primary">Beginner's Corner</a>
              <a href="#" className="block hover:text-plant-primary">Plant ID Tool</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">About</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <a href="#" className="block hover:text-plant-primary">Our Story</a>
              <a href="#" className="block hover:text-plant-primary">Contact</a>
              <a href="#" className="block hover:text-plant-primary">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 pt-8 border-t border-green-50">
          © 2026 PlantPlanet. Made with 💚 for plant lovers everywhere.
        </div>
      </footer>
    </div>
  )
}

export default HomePage
