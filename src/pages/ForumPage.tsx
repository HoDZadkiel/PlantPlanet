import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, MessageCircle, ThumbsUp, Pin } from 'lucide-react'
import { posts, categories } from '../data/mockData'

const ForumPage = () => {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'all'
  const [sortBy, setSortBy] = useState<'trending' | 'latest'>('trending')

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'trending') return b.upvotes - a.upvotes
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  const getCategoryColor = (catId: string) => {
    const cat = categories.find(c => c.id === catId)
    return cat?.color || 'bg-gray-100 text-gray-700'
  }

  const getCategoryName = (catId: string) => {
    const cat = categories.find(c => c.id === catId)
    return cat?.name || catId
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-1">Forum</h1>
          <p className="text-gray-500">Share your plant knowledge and learn from others</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span className="hidden sm:inline">New Post</span>
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => window.history.replaceState(null, '', '/forum')}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-plant-primary text-white'
              : 'bg-white text-gray-600 hover:bg-plant-light hover:text-plant-primary'
          }`}
        >
          All Topics
        </button>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/forum?category=${cat.id}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-plant-primary text-white'
                : 'bg-white text-gray-600 hover:bg-plant-light hover:text-plant-primary'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-white rounded-xl p-1 border border-green-100">
          <button
            onClick={() => setSortBy('trending')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'trending'
                ? 'bg-plant-primary text-white'
                : 'text-gray-500 hover:text-plant-primary'
            }`}
          >
            🔥 Trending
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              sortBy === 'latest'
                ? 'bg-plant-primary text-white'
                : 'text-gray-500 hover:text-plant-primary'
            }`}
          >
            🕐 Latest
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <Link to={`/forum/${post.id}`} key={post.id} className="card p-5 block">
            {post.isPinned && (
              <div className="flex items-center gap-1.5 mb-3">
                <Pin size={14} className="text-plant-primary" />
                <span className="text-xs text-plant-primary font-medium">Pinned Post</span>
              </div>
            )}
            <div className="flex gap-4">
              {/* Upvote column */}
              <div className="flex flex-col items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-plant-light transition-all">
                  <ThumbsUp size={18} className="text-gray-400 hover:text-plant-primary" />
                </button>
                <span className="text-sm font-semibold text-plant-primary">{post.upvotes}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full bg-plant-light" />
                  <span className="text-sm text-gray-600">{post.author}</span>
                  <span className="text-xs text-gray-400">• {post.timestamp}</span>
                  <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {getCategoryName(post.category)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 hover:text-plant-primary text-lg">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {post.images.slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={14} />
                    {post.comments} comments
                  </span>
                  <div className="flex gap-1.5">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {sortedPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-6">Be the first to start a conversation in this category!</p>
          <button className="btn-primary">Create a Post</button>
        </div>
      )}
    </div>
  )
}

export default ForumPage
