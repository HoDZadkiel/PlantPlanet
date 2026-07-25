import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, MessageCircle, ThumbsUp, Pin } from 'lucide-react'
import { posts, categories } from '../data/mockData'

const ForumPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState<'new' | 'hot' | 'top'>('new')
  const [showNewPost, setShowNewPost] = useState(false)

  const filteredPosts = posts
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'hot') return b.likes + b.replies - (a.likes + a.replies)
      if (sortBy === 'top') return b.likes - a.likes
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId)
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: catId })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">論壇</h1>
          <p className="text-gray-500">與植物愛好者交流心得、分享經驗</p>
        </div>
        <button
          onClick={() => setShowNewPost(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">新貼文</span>
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <button
          onClick={() => handleCategoryClick('all')}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-plant-primary text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-plant-light hover:text-plant-primary'
          }`}
        >
          全部 ({posts.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-plant-primary text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-plant-light hover:text-plant-primary'
            }`}
          >
            {cat.icon} {cat.name} ({cat.postCount})
          </button>
        ))}
      </div>

      {/* Sort tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {[
            { id: 'new' as const, label: '最新' },
            { id: 'hot' as const, label: '熱門' },
            { id: 'top' as const, label: '最多讚' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === opt.id
                  ? 'bg-plant-primary text-white'
                  : 'text-gray-500 hover:text-plant-primary hover:bg-green-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400">
          共 {filteredPosts.length} 篇貼文
        </span>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/forum/${post.id}`}
            className="card p-5 flex items-start gap-4 hover:-translate-y-0.5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {post.isPinned && (
                  <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Pin size={10} />
                    置頂
                  </span>
                )}
                <span className="text-xs font-medium text-plant-primary bg-plant-light px-2.5 py-0.5 rounded-full">
                  {categories.find((c) => c.id === post.category)?.icon}{' '}
                  {categories.find((c) => c.id === post.category)?.name}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span>👤</span>
                  {post.author}
                </span>
                <span>{new Date(post.date).toLocaleDateString('zh-TW')}</span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={12} />
                  {post.replies} 回覆
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp size={12} />
                  {post.likes} 讚
                </span>
              </div>
            </div>
            {post.images?.length > 0 && (
              <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">暫無貼文</h3>
          <p className="text-gray-500 mb-4">這個分類還沒有貼文，成為第一個發文的人吧！</p>
          <button onClick={() => setShowNewPost(true)} className="btn-primary">
            發文
          </button>
        </div>
      )}

      {/* New post modal */}
      {showNewPost && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewPost(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-green-50">
              <h2 className="text-xl font-bold text-gray-800">新貼文</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  分類
                </label>
                <select className="input-field">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  標題
                </label>
                <input
                  type="text"
                  placeholder="輸入貼文標題..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  內容
                </label>
                <textarea
                  placeholder="分享你的心得、經驗或問題..."
                  className="input-field resize-none min-h-[120px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  圖片（選填）
                </label>
                <div className="border-2 border-dashed border-green-200 rounded-xl p-6 text-center hover:border-plant-primary transition-all cursor-pointer">
                  <span className="text-2xl">📷</span>
                  <p className="text-sm text-gray-500 mt-1">點擊上傳或拖放圖片</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-green-50 flex gap-3">
              <button
                onClick={() => setShowNewPost(false)}
                className="btn-secondary flex-1"
              >
                取消
              </button>
              <button
                onClick={() => setShowNewPost(false)}
                className="btn-primary flex-1"
              >
                發布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForumPage
