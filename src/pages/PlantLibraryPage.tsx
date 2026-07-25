import { useState } from 'react'
import { Search, Filter, Droplets, Sun, Thermometer, Leaf, ArrowRight } from 'lucide-react'
import { plants } from '../data/mockData'

const PlantLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  const [selectedPlant, setSelectedPlant] = useState<typeof plants[0] | null>(null)

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLevel = filterLevel === 'all' || plant.careLevel === filterLevel
    return matchesSearch && matchesLevel
  })

  const careLevelLabel = (level: string) => {
    switch (level) {
      case 'easy':
        return '新手友好'
      case 'medium':
        return '進階照護'
      case 'hard':
        return '挑戰模式'
      default:
        return '未知'
    }
  }

  const careLevelColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
      case 'hard':
        return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">植物圖鑑</h1>
        <p className="text-gray-500 dark:text-gray-400">瀏覽常見室內與戶外植物的照護指南</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜尋植物名稱、學名或標籤..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
            className="input-field px-4 py-3 w-36"
          >
            <option value="all">全部難度</option>
            <option value="easy">新手友好</option>
            <option value="medium">進階照護</option>
            <option value="hard">挑戰模式</option>
          </select>
        </div>
      </div>

      {/* Plant grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="card">
            <div className="relative">
              <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover" />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${careLevelColor(plant.careLevel)}`}
                >
                  {careLevelLabel(plant.careLevel)}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-0.5">{plant.name}</h3>
              <p className="text-xs text-gray-400 italic mb-3">{plant.scientificName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{plant.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Droplets size={14} className="text-blue-400" />
                  {plant.waterNeeds}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Sun size={14} className="text-amber-400" />
                  {plant.lightNeeds}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Thermometer size={14} className="text-red-400" />
                  {plant.tempRange}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Leaf size={14} className="text-green-400" />
                  {plant.humidity}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {plant.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <button
                onClick={() => setSelectedPlant(plant)}
                className="w-full flex items-center justify-center gap-2 text-plant-primary font-medium text-sm hover:bg-plant-light dark:hover:bg-gray-700 rounded-xl py-2.5 transition-all"
              >
                查看詳細指南
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">找不到植物</h3>
          <p className="text-gray-500 dark:text-gray-400">試試調整搜尋條件或篩選器。</p>
        </div>
      )}

      {/* Plant detail modal */}
      {selectedPlant && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlant(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPlant.image}
              alt={selectedPlant.name}
              className="w-full h-56 object-cover rounded-t-3xl"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 dark:text-white">
                    {selectedPlant.name}
                  </h2>
                  <p className="text-sm text-gray-400 italic dark:text-gray-500">
                    {selectedPlant.scientificName}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${careLevelColor(
                    selectedPlant.careLevel
                  )}`}
                >
                  {careLevelLabel(selectedPlant.careLevel)}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedPlant.description}</p>

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-white">照護需求</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-gray-700 rounded-xl">
                    <Droplets size={20} className="text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">澆水</div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        {selectedPlant.waterNeeds}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-gray-700 rounded-xl">
                    <Sun size={20} className="text-amber-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">光照</div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        {selectedPlant.lightNeeds}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-gray-700 rounded-xl">
                    <Thermometer size={20} className="text-red-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">溫度</div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        {selectedPlant.tempRange}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-gray-700 rounded-xl">
                    <Leaf size={20} className="text-green-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">濕度</div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        {selectedPlant.humidity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPlant.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>

              <button className="btn-primary w-full">加入我的收藏</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlantLibraryPage
