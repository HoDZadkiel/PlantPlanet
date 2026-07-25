import { Award, TrendingUp, MessageCircle } from 'lucide-react'
import { topUsers } from '../data/mockData'

const CommunityPage = () => {
  const stats = [
    { icon: '👥', label: '成員', value: '12,847' },
    { icon: '💬', label: '今日留言', value: '3,456' },
    { icon: '🌱', label: '分享植物', value: '892' },
    { icon: '🤝', label: '活躍交換', value: '127' },
  ]

  const badges = [
    { emoji: '🌟', name: '植物專家', description: '獲得 100+ 個有用回覆' },
    { emoji: '📸', name: '攝影達人', description: '分享了 50+ 張植物照片' },
    { emoji: '🤝', name: '熱心助人', description: '回答了 25+ 個問題' },
    { emoji: '🌵', name: '多肉達人', description: '分享了 30+ 種多肉植物' },
    { emoji: '📚', name: '園藝導師', description: '撰寫了 10+ 篇照護指南' },
    { emoji: '💧', name: '濕度達人', description: '精通高濕度植物的照護' },
    { emoji: '🌱', name: '種子大師', description: '成功從種子種出 50+ 株植物' },
    { emoji: '🌍', name: '全球種植者', description: '種植來自 5+ 個大洲的植物' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">社群</h1>
        <p className="text-gray-500 dark:text-gray-400">認識同樣熱愛植物的朋友，向達人學習經驗</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-plant-primary dark:text-green-300 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Top Contributors */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={22} className="text-plant-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">熱門貢獻者</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className={`card p-6 ${index === 0 ? 'ring-2 ring-plant-primary' : ''}`}
            >
              <div className="flex items-center gap-4 mb-4">
                {index === 0 && (
                  <div className="w-10 h-10 rounded-full bg-plant-primary flex items-center justify-center text-white font-bold text-lg">
                    🏆
                  </div>
                )}
                {index === 1 && (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg">
                    🥈
                  </div>
                )}
                {index === 2 && (
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-lg">
                    🥉
                  </div>
                )}
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full bg-plant-light border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">加入於 {user.joinedDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-green-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-lg font-bold text-plant-primary dark:text-green-300">{user.plantCount}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">植物</div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-lg font-bold text-blue-600">{user.posts}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">貼文</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {user.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs px-2 py-1 bg-plant-light text-plant-primary rounded-full dark:bg-green-900/40 dark:text-green-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Badges System */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Award size={22} className="text-plant-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">社群徽章</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="card p-5 text-center">
              <div className="text-4xl mb-3">{badge.emoji}</div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle size={22} className="text-plant-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">最近動態</h2>
        </div>
        <div className="space-y-3">
          {[
            {
              icon: '🎉',
              text: '園藝老師 Lin 獲得了植物專家徽章',
              time: '5 分鐘前',
            },
            {
              icon: '🌱',
              text: '多肉達人阿杰將新植物加入了收藏',
              time: '12 分鐘前',
            },
            {
              icon: '💬',
              text: '新討論：「最適合龜背竹的肥料推薦？」',
              time: '23 分鐘前',
            },
            {
              icon: '📸',
              text: '蕨類愛好者分享了 5 張新蕨類房間的照片',
              time: '1 小時前',
            },
            {
              icon: '🤝',
              text: '交換完成：霓虹綠蘿換白錦蔓綠絨',
              time: '2 小時前',
            },
            {
              icon: '⭐',
              text: '陽台園丁回答了第 100 個問題！',
              time: '3 小時前',
            },
            {
              icon: '🌿',
              text: '新增植物指南：「竹芋照護全攻略」',
              time: '4 小時前',
            },
          ].map((activity, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-plant-light dark:bg-green-900/40 flex items-center justify-center text-xl flex-shrink-0">
                {activity.icon}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{activity.text}</p>
              <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CommunityPage
