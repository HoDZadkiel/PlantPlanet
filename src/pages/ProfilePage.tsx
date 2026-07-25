import { useParams, Link } from 'react-router-dom'
import { Award, TrendingUp, Calendar, MessageCircle, ThumbsUp, Leaf, MapPin, ArrowLeft, Heart, Share2 } from 'lucide-react'
import { topUsers, posts } from '../data/mockData'

// Extended profile data for demonstration
const profileData: Record<string, { bio: string; location: string; followers: number; following: number; specializations: string[] }> = {
  '1': {
    bio: '園藝愛好者，擅長室內觀葉植物照護。願意分享所有我知道的植物知識！',
    location: '台北',
    followers: 1283,
    following: 342,
    specializations: ['室內植物', '龜背竹', '竹芋照護', '肥料知識'],
  },
  '2': {
    bio: '植物攝影師 & 綠化設計師。相信每一株植物都有它的美。',
    location: '新北',
    followers: 2156,
    following: 189,
    specializations: ['植物攝影', '室內綠化', '植物牆', '造景設計'],
  },
  '3': {
    bio: '小陽台大園丁，2 坪種出 20+ 盆植物的經驗分享！',
    location: '台中',
    followers: 876,
    following: 234,
    specializations: ['陽台種植', '多肉植物', '垂直園藝', '小型盆栽'],
  },
}

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>()
  const user = topUsers.find((u) => u.id === userId) || topUsers[0]

  const profile = profileData[userId as string] || profileData['1']
  const userPosts = posts.filter((p) => p.author === user.name)

  const stats = [
    { icon: Leaf, label: '植物', value: user.plantCount, color: 'text-green-600 bg-green-50 dark:text-green-300 dark:bg-green-900/30' },
    { icon: MessageCircle, label: '貼文', value: userPosts.length, color: 'text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30' },
    { icon: ThumbsUp, label: '獲得讚', value: userPosts.reduce((sum, p) => sum + p.likes, 0), color: 'text-amber-600 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30' },
    { icon: Heart, label: '追蹤者', value: profile.followers, color: 'text-rose-600 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/30' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Back button */}
      <Link
        to="/community"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-plant-primary dark:text-gray-400 dark:hover:text-green-300 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        返回社群
      </Link>

      {/* Profile Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar & basic info */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-plant-light border-4 border-white shadow-lg object-cover"
              />
              {user.badges[0] && (
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-plant-primary text-white flex items-center justify-center text-sm shadow-md">
                  {user.badges[0].charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Name, bio, actions */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    加入於 {user.joinedDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{profile.bio}</p>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2.5 py-1 bg-plant-light text-plant-primary rounded-full dark:bg-green-900/40 dark:text-green-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                <button className="btn-primary flex items-center gap-2">
                  <Heart size={16} />
                  追蹤
                </button>
                <button className="p-2.5 text-gray-400 hover:text-plant-primary hover:bg-green-50 dark:hover:bg-gray-700 dark:hover:text-green-300 rounded-xl transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-green-50 dark:border-gray-700">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Badges Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award size={20} className="text-plant-primary" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">獲得的徽章</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {user.badges.map((badge, i) => (
            <div
              key={i}
              className={`card px-4 py-3 flex items-center gap-2 ${i === 0 ? 'ring-2 ring-plant-primary' : ''}`}
            >
              <span className="text-lg">{badge.charAt(0)}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {badge.substring(2)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* User Posts Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-plant-primary" />
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">發表的貼文</h2>
          <span className="text-sm text-gray-400">({userPosts.length})</span>
        </div>

        {userPosts.length > 0 ? (
          <div className="space-y-3">
            {userPosts.map((post) => (
              <Link
                key={post.id}
                to={`/forum/${post.id}`}
                className="card p-5 flex items-start gap-4 hover:-translate-y-0.5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-plant-primary bg-plant-light px-2.5 py-0.5 rounded-full dark:bg-green-900/40 dark:text-green-300">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
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
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden">
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
        ) : (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-3">🌿</div>
            <p className="text-gray-500 dark:text-gray-400">這位使用者還沒有發表貼文</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
