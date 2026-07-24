import { useState } from 'react'
import { Plus, Camera, Calendar, TrendingUp } from 'lucide-react'
import type { JournalEntry } from '../types'
import { plants } from '../data/mockData'

const JournalPage = () => {
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(plants[0])

  const mockEntries: JournalEntry[] = [
    {
      id: '1',
      plantName: 'Monstera Deliciosa',
      plantImage: 'https://images.unsplash.com/photo-1614594975525-e45890e74145?w=200&h=200&fit=crop',
      date: '2026-07-23',
      note: 'First fenestration appeared! The leaf has been developing for weeks and finally split. Humidity has been around 65% thanks to my new humidifier.',
      images: [
        'https://images.unsplash.com/photo-1614594975525-e45890e74145?w=600&h=400&fit=crop',
      ],
      growthStage: 'Growing',
    },
    {
      id: '2',
      plantName: 'Pothos',
      plantImage: 'https://images.unsplash.com/photo-1596726886612-3c4e7a98e30a?w=200&h=200&fit=crop',
      date: '2026-07-20',
      note: 'Trimmed back some leggy vines and took 8 cuttings for propagation. Put them in water glasses on the windowsill. Expect roots in 2-3 weeks.',
      images: [
        'https://images.unsplash.com/photo-1596726886612-3c4e7a98e30a?w=600&h=400&fit=crop',
      ],
      growthStage: 'Maintenance',
    },
    {
      id: '3',
      plantName: 'Snake Plant',
      plantImage: 'https://images.unsplash.com/photo-1599598425947-33542758b6a5?w=200&h=200&fit=crop',
      date: '2026-07-15',
      note: 'Re-potted into a slightly larger container. Soil was completely dry after 3 weeks. This plant really thrives on neglect!',
      images: [],
      growthStage: 'Stable',
    },
    {
      id: '4',
      plantName: 'Peace Lily',
      plantImage: 'https://images.unsplash.com/photo-1597534154246-1d3ba1b4fb15?w=200&h=200&fit=crop',
      date: '2026-07-12',
      note: 'Beautiful new bloom coming in! It was drooping yesterday which I knew meant it was thirsty. Gave it a good watering and it perked right up.',
      images: [
        'https://images.unsplash.com/photo-1597534154246-1d3ba1b4fb15?w=600&h=400&fit=crop',
      ],
      growthStage: 'Flowering',
    },
  ]

  const growthStageColor = (stage: string) => {
    switch (stage) {
      case 'Growing':
        return 'bg-green-100 text-green-700'
      case 'Flowering':
        return 'bg-purple-100 text-purple-700'
      case 'Maintenance':
        return 'bg-blue-100 text-blue-700'
      case 'Stable':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-2">Plant Journal</h1>
          <p className="text-gray-500">Track your plants' growth and care history</p>
        </div>
        <button
          onClick={() => setShowNewEntry(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Entry</span>
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-plant-primary mb-1">12</div>
          <div className="text-xs text-gray-500">Plants Tracked</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-plant-primary mb-1">47</div>
          <div className="text-xs text-gray-500">Journal Entries</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-plant-primary mb-1">156</div>
          <div className="text-xs text-gray-500">Photos Logged</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {mockEntries.map((entry) => (
          <div key={entry.id} className="card p-5">
            <div className="flex items-start gap-4">
              <img
                src={entry.plantImage}
                alt={entry.plantName}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{entry.plantName}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar size={12} />
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${growthStageColor(entry.growthStage)}`}>
                    {entry.growthStage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{entry.note}</p>
                {entry.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {entry.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Camera size={12} />
                    {entry.images.length} photo{entry.images.length !== 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    View growth chart
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {mockEntries.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📓</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Start your plant journal</h3>
          <p className="text-gray-500 mb-6">Document your plants' growth journey with photos and notes.</p>
          <button onClick={() => setShowNewEntry(true)} className="btn-primary">Create First Entry</button>
        </div>
      )}

      {/* New entry modal */}
      {showNewEntry && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowNewEntry(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-green-50">
              <h2 className="text-xl font-bold text-gray-800">New Journal Entry</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plant</label>
                <select
                  value={selectedPlant.id}
                  onChange={(e) => setSelectedPlant(plants.find(p => p.id === e.target.value) || plants[0])}
                  className="input-field"
                >
                  {plants.map((plant) => (
                    <option key={plant.id} value={plant.id}>{plant.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Growth Stage</label>
                <select className="input-field">
                  <option>Growing</option>
                  <option>Flowering</option>
                  <option>Maintenance</option>
                  <option>Stable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  placeholder="What's happening with this plant today?"
                  className="input-field resize-none min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                <div className="border-2 border-dashed border-green-200 rounded-xl p-6 text-center hover:border-plant-primary transition-all cursor-pointer">
                  <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-green-50 flex gap-3">
              <button onClick={() => setShowNewEntry(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={() => setShowNewEntry(false)} className="btn-primary flex-1">
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JournalPage
