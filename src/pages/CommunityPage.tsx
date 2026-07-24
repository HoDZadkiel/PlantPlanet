import { Award, TrendingUp, MessageCircle } from 'lucide-react'
import { topUsers } from '../data/mockData'

const CommunityPage = () => {
  const stats = [
    { icon: '👥', label: 'Members', value: '12,847' },
    { icon: '💬', label: 'Messages Today', value: '3,456' },
    { icon: '🌱', label: 'Plants Shared', value: '892' },
    { icon: '🤝', label: 'Active Trades', value: '127' },
  ]

  const badges = [
    { emoji: '🌟', name: 'Expert', description: 'Given 100+ helpful answers' },
    { emoji: '📸', name: 'Showcase Star', description: 'Shared 50+ plant photos' },
    { emoji: '🤝', name: 'Helper', description: 'Answered 25+ questions' },
    { emoji: '🌵', name: 'Succulent Expert', description: 'Posted about 30+ succulents' },
    { emoji: '📚', name: 'Educator', description: 'Written 10+ care guides' },
    { emoji: '💧', name: 'Humidity Hero', description: 'Master of humidity-loving plants' },
    { emoji: '🌱', name: 'Seed Starter', description: 'Successfully grew 50+ plants from seed' },
    { emoji: '🌍', name: 'Global Grower', description: 'Grows plants from 5+ continents' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-2">Community</h1>
        <p className="text-gray-500">Meet fellow plant lovers and learn from the best</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-plant-primary mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Top Contributors */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={22} className="text-plant-primary" />
          <h2 className="text-2xl font-bold text-gray-800">Top Contributors</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {topUsers.map((user, index) => (
            <div key={user.id} className={`card p-6 ${index === 0 ? 'ring-2 ring-plant-primary' : ''}`}>
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
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-xs text-gray-400">Joined {user.joinedDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-green-50 rounded-xl">
                  <div className="text-lg font-bold text-plant-primary">{user.plantCount}</div>
                  <div className="text-xs text-gray-500">Plants</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-xl">
                  <div className="text-lg font-bold text-blue-600">{user.posts}</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {user.badges.map((badge) => (
                  <span key={badge} className="text-xs px-2 py-1 bg-plant-light text-plant-primary rounded-full">
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
          <h2 className="text-2xl font-bold text-gray-800">Community Badges</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.name} className="card p-5 text-center">
              <div className="text-4xl mb-3">{badge.emoji}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle size={22} className="text-plant-primary" />
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
        </div>
        <div className="space-y-3">
          {[
            { icon: '🎉', text: 'PlantWhisperer earned the Expert badge', time: '5 min ago' },
            { icon: '🌱', text: 'SucculentSue added a new plant to their collection', time: '12 min ago' },
            { icon: '💬', text: 'New discussion: "Best fertilizers for Monstera?"', time: '23 min ago' },
            { icon: '📸', text: 'FernEnthusiast shared 5 photos of their new fern room', time: '1 hour ago' },
            { icon: '🤝', text: 'Trade completed: Neon Pothos for Philodendron Birkin', time: '2 hours ago' },
            { icon: '⭐', text: 'GreenThumbSarah answered 100th question!', time: '3 hours ago' },
            { icon: '🌿', text: 'New plant guide added: "Care for Calathea Makoyana"', time: '4 hours ago' },
          ].map((activity, i) => (
            <div key={i} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-plant-light flex items-center justify-center text-xl flex-shrink-0">
                {activity.icon}
              </div>
              <p className="text-sm text-gray-700 flex-1">{activity.text}</p>
              <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CommunityPage
