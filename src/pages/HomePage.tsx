import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { posts } from '../data/mockData'
import { categories } from '../data/mockData'

const HomePage = () => {
  const stats = [
    { icon: '👥', label: '成員', value: '12,847' },
    { icon: '💬', label: '今日留言', value: '3,456' },
    { icon: '🌱', label: '植物分享', value: '892' },
    { icon: '🤝', label: '活躍交換', value: '127' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-plant-dark via-plant-primary to-plant-secondary py-20 md:py-32">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 text-7xl animate-pulse delay-200">🌿</div>
          <div className="absolute top-10 right-10 text-5xl animate-pulse delay-100">🍃</div>
          <div className="absolute bottom-20 left-10 text-6xl animate-pulse">🌱</div>
          <div className="absolute bottom-10 right-20 text-4xl animate-pulse delay-300">🌻</div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm mb-6">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                已有 12,847 位植物愛好者加入
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                與植物愛好者一起<span className="text-green-200">分享成長</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                加入植物星球社群，分享你的植物照護心得、展示成長成果、學習專業知識，與來自各地的種植者一起交流。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/forum" className="btn-primary inline-flex items-center justify-center gap-2 text-lg py-3 px-8">
                  加入討論
                  <ArrowRight size={20} />
                </Link>
                <Link to="/plants" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg py-3 px-8">
                  瀏覽植物圖鑑
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=600&fit=crop"
                  alt="植物牆展示"
                  className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">🌱</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">新植物加入</div>
                    <div className="text-xs text-gray-500">30 位成員分享了新植物</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-pulse delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">💬</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">活躍討論</div>
                    <div className="text-xs text-gray-500">128 個新貼文</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-5 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-plant-primary mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Forum Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">論壇分類</h2>
            <p className="text-gray-500">選擇感興趣的話題，開始交流</p>
          </div>
          <Link to="/forum" className="flex items-center gap-2 text-plant-primary font-medium hover:text-plant-dark transition-colors">
            瀏覽全部
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/forum?category=${category.id}`}
              className="card p-6 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{category.postCount} 篇貼文</span>
                <ArrowRight size={16} className="text-plant-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-2">熱門貼文</h2>
            <p className="text-gray-500">看看大家都在討論什麼</p>
          </div>
          <Link to="/forum" className="flex items-center gap-2 text-plant-primary font-medium hover:text-plant-dark transition-colors">
            瀏覽論壇
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {posts.slice(0, 4).map((post) => (
            <Link
              key={post.id}
              to={`/forum/${post.id}`}
              className="card p-6 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{categories.find((c) => c.id === post.category)?.icon}</span>
                  <span className="text-xs font-medium text-plant-primary bg-plant-light px-2.5 py-1 rounded-full">
                    {categories.find((c) => c.id === post.category)?.name}
                  </span>
                </div>
                {post.isPinned && (
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">📌 置頂</span>
                )}
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span>👤</span>
                    {post.author}
                  </span>
                  <span>{new Date(post.date).toLocaleDateString('zh-TW')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>💬 {post.replies}</span>
                  <span>❤️ {post.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="card bg-gradient-to-br from-plant-primary to-plant-secondary border-0 text-white p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">準備好加入植物星球了嗎？</h2>
            <p className="text-white/80 mb-8 text-lg">
              與來自世界各地的植物愛好者一起分享知識、展示成果、學習成長
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/forum" className="bg-white text-plant-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-plant-light transition-all duration-200 shadow-lg inline-flex items-center justify-center gap-2">
                開始发帖
                <ArrowRight size={18} />
              </Link>
              <Link to="/plants" className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 inline-flex items-center justify-center gap-2">
                瀏覽植物圖鑑
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
