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
      plantName: '龜背竹',
      plantImage: 'https://images.unsplash.com/photo-1614594975525-e45890e74145?w=200&h=200&fit=crop',
      date: '2026-07-23',
      note: '第一片葉子出現孔洞了！這片葉子已經長了幾個禮拜，終於裂開了。最近用加濕器，濕度大約保持在 65% 左右。',
      images: [
        'https://images.unsplash.com/photo-1614594975525-e45890e74145?w=600&h=400&fit=crop',
      ],
      growthStage: '生長中',
    },
    {
      id: '2',
      plantName: '綠蘿',
      plantImage: 'https://images.unsplash.com/photo-1596726886612-3c4e7a98e30a?w=200&h=200&fit=crop',
      date: '2026-07-20',
      note: '修剪了一些徒長的藤蔓，剪了 8 段來扦插。放在窗台的水杯裡，預計 2-3 週就會長出根系。',
      images: [
        'https://images.unsplash.com/photo-1596726886612-3c4e7a98e30a?w=600&h=400&fit=crop',
      ],
      growthStage: '維護中',
    },
    {
      id: '3',
      plantName: '虎尾蘭',
      plantImage: 'https://images.unsplash.com/photo-1599598425947-33542758b6a5?w=200&h=200&fit=crop',
      date: '2026-07-15',
      note: '換了比較大一點的花盆。土壤經過三週才完全乾透。這株植物真的是懶人的最佳選擇！',
      images: [],
      growthStage: '穩定期',
    },
    {
      id: '4',
      plantName: '白掌',
      plantImage: 'https://images.unsplash.com/photo-1597534154246-1d3ba1b4fb15?w=200&h=200&fit=crop',
      date: '2026-07-12',
      note: '又有新的花苞要開了！昨天還垂頭喪氣的，我知道是缺水了。澆完水馬上精神抖擻。',
      images: [
        'https://images.unsplash.com/photo-1597534154246-1d3ba1b4fb15?w=600&h=400&fit=crop',
      ],
      growthStage: '開花期',
    },
  ]

  const growthStageColor = (stage: string) => {
    switch (stage) {
      case '生長中':
        return 'bg-green-100 text-green-700'
      case '開花期':
        return 'bg-purple-100 text-purple-700'
      case '維護中':
        return 'bg-blue-100 text-blue-700'
      case '穩定期':
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
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">成長日誌</h1>
          <p className="text-gray-500">記錄植物的成長軌跡與照護歷史</p>
        </div>
        <button
          onClick={() => setShowNewEntry(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">新增紀錄</span>
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-plant-primary mb-1">12</div>
          <div className="text-xs text-gray-500">追蹤植物</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-plant-primary mb-1">47</div>
          <div className="text-xs text-gray-500">日誌紀錄</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-plant-primary mb-1">156</div>
          <div className="text-xs text-gray-500">拍攝照片</div>
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
                      {new Date(entry.date).toLocaleDateString('zh-TW', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${growthStageColor(
                      entry.growthStage
                    )}`}
                  >
                    {entry.growthStage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{entry.note}</p>
                {entry.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {entry.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Camera size={12} />
                    {entry.images.length} 張照片
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} />
                    查看成長趨勢
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
          <h3 className="text-xl font-semibold text-gray-800 mb-2">開始你的植物日誌</h3>
          <p className="text-gray-500 mb-6">用照片和筆記記錄植物的成長旅程。</p>
          <button onClick={() => setShowNewEntry(true)} className="btn-primary">
            建立第一筆紀錄
          </button>
        </div>
      )}

      {/* New entry modal */}
      {showNewEntry && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewEntry(false)}
        >
          <div className="bg-white rounded-3xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-green-50">
              <h2 className="text-xl font-bold text-gray-800">新增日誌</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">植物</label>
                <select
                  value={selectedPlant.id}
                  onChange={(e) =>
                    setSelectedPlant(plants.find((p) => p.id === e.target.value) || plants[0])
                  }
                  className="input-field"
                >
                  {plants.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">生長階段</label>
                <select className="input-field">
                  <option>生長中</option>
                  <option>開花期</option>
                  <option>維護中</option>
                  <option>穩定期</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">筆記</label>
                <textarea
                  placeholder="今天這株植物有什麼狀況？"
                  className="input-field resize-none min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">照片</label>
                <div className="border-2 border-dashed border-green-200 rounded-xl p-6 text-center hover:border-plant-primary transition-all cursor-pointer">
                  <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">點擊上傳或拖放照片</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-green-50 flex gap-3">
              <button onClick={() => setShowNewEntry(false)} className="btn-secondary flex-1">
                取消
              </button>
              <button onClick={() => setShowNewEntry(false)} className="btn-primary flex-1">
                儲存紀錄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JournalPage
