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

  const careLevelColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'bg-green-100 text-green-700'
      case 'medium':
        return 'bg-amber-100 text-amber-700'
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-2">Plant Library</h1>
        <p className="text-gray-500">Browse care guides for popular houseplants and outdoor plants</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search plants by name, type, or tag..."
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
            className="input-field px-4 py-3 w-32"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Plant grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="card">
            <div className="relative">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${careLevelColor(plant.careLevel)}`}>
                  {plant.careLevel} care
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-0.5">{plant.name}</h3>
              <p className="text-xs text-gray-400 italic mb-3">{plant.scientificName}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{plant.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Droplets size={14} className="text-blue-400" />
                  {plant.waterNeeds}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Sun size={14} className="text-amber-400" />
                  {plant.lightNeeds}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Thermometer size={14} className="text-red-400" />
                  {plant.tempRange}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
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
                className="w-full flex items-center justify-center gap-2 text-plant-primary font-medium text-sm hover:bg-plant-light rounded-xl py-2.5 transition-all"
              >
                View Full Guide
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No plants found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Plant detail modal */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlant(null)}>
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
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
                  <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800">{selectedPlant.name}</h2>
                  <p className="text-sm text-gray-400 italic">{selectedPlant.scientificName}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${careLevelColor(selectedPlant.careLevel)}`}>
                  {selectedPlant.careLevel}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{selectedPlant.description}</p>

              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-gray-800">Care Requirements</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <Droplets size={20} className="text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-500">Water</div>
                      <div className="text-sm font-medium text-gray-800">{selectedPlant.waterNeeds}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <Sun size={20} className="text-amber-500" />
                    <div>
                      <div className="text-xs text-gray-500">Light</div>
                      <div className="text-sm font-medium text-gray-800">{selectedPlant.lightNeeds}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                    <Thermometer size={20} className="text-red-500" />
                    <div>
                      <div className="text-xs text-gray-500">Temperature</div>
                      <div className="text-sm font-medium text-gray-800">{selectedPlant.tempRange}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <Leaf size={20} className="text-green-500" />
                    <div>
                      <div className="text-xs text-gray-500">Humidity</div>
                      <div className="text-sm font-medium text-gray-800">{selectedPlant.humidity}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPlant.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>

              <button className="btn-primary w-full">Add to My Collection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlantLibraryPage
