import { useParams } from 'react-router-dom'
import { ThumbsUp, MessageCircle, Share2, Bookmark, Pin, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { posts, categories } from '../data/mockData'

const PostPage = () => {
  const { id } = useParams()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(true)

  const post = posts.find((p) => p.id === id)

  const mockComments = [
    {
      id: '1',
      author: '園藝老師 Lin',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: '葉子邊緣發黃通常是濕度不足或澆水過多導致的。建議先檢查土壤濕度，如果太乾就增加環境濕度，可以在旁邊放盆水或噴霧。',
      date: '2026-07-24',
      likes: 5,
      isOP: false,
    },
    {
      id: '2',
      author: '綠化達人阿杰',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: '也有可能是光照太強，龜背竹適合明亮間接光，避免陽光直射。建議移到室內光線明亮但沒有陽光直射的地方。',
      date: '2026-07-24',
      likes: 3,
      isOP: false,
    },
    {
      id: '3',
      author: '植物新手小美',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: '謝謝大家的建議！我調整了位置並控制澆水，葉子情況有改善。我會繼續觀察，再回報結果～',
      date: '2026-07-25',
      likes: 8,
      isOP: true,
    },
  ]

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">貼文不存在</h2>
        <p className="text-gray-500">該貼文可能已被刪除或不存在。</p>
      </div>
    )
  }

  const category = categories.find((c) => c.id === post.category)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-plant-primary mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        返回論壇
      </button>

      {/* Post content */}
      <div className="card p-6 mb-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-12 h-12 rounded-full bg-plant-light border-2 border-white shadow-sm"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-semibold text-gray-800">{post.author}</h1>
              {post.isPinned && (
                <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Pin size={10} />
                  置頂
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{category?.icon} {category?.name}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">
          {post.title}
        </h2>

        {/* Content */}
        <div className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
          {post.content}
        </div>

        {/* Images */}
        {post.images?.length > 0 && (
          <div className="grid gap-3 mb-6">
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full rounded-xl object-cover"
                style={{ maxHeight: i === 0 ? '400px' : '300px' }}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-green-50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                liked
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <ThumbsUp size={16} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <MessageCircle size={16} />
              {post.replies}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all">
              <Share2 size={16} />
              分享
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                saved
                  ? 'bg-plant-primary text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-plant-light hover:text-plant-primary'
              }`}
            >
              <Bookmark size={16} />
              {saved ? '已收藏' : '收藏'}
            </button>
          </div>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle size={18} className="text-plant-primary" />
            回覆 ({mockComments.length})
          </h3>

          {/* Comment input */}
          <div className="card p-4 mb-6 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-plant-light flex items-center justify-center flex-shrink-0 text-lg">
              🌱
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="寫下你的回覆..."
                className="input-field resize-none min-h-[60px] mb-2"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setCommentText('')}
                  className="btn-primary text-sm py-2 px-6"
                >
                  發送回覆
                </button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {mockComments.map((comment) => (
              <div key={comment.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full bg-plant-light border-2 border-white shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{comment.author}</span>
                      {comment.isOP && (
                        <span className="text-xs font-medium text-plant-primary bg-plant-light px-2 py-0.5 rounded-full">
                          發文者
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(comment.date).toLocaleDateString('zh-TW')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                        <ThumbsUp size={12} />
                        {comment.likes}
                      </button>
                      <button className="text-xs text-gray-400 hover:text-plant-primary transition-colors">
                        回覆
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostPage
