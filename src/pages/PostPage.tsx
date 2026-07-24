import { useParams } from 'react-router-dom'
import { ThumbsUp, MessageCircle, Share2, Bookmark, Pin, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { posts, categories } from '../data/mockData'

const PostPage = () => {
  const { id } = useParams<{ id: string }>()
  const post = posts.find(p => p.id === id)
  const [commentText, setCommentText] = useState('')
  const [upvoted, setUpvoted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Post not found</h2>
        <p className="text-gray-500">This post may have been removed or doesn't exist.</p>
      </div>
    )
  }

  const category = categories.find(c => c.id === post.category)
  const mockComments = [
    {
      id: '1',
      author: 'PlantExpert101',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Expert',
      content: 'This is amazing progress! The key with Monsteras is consistent humidity and patience. Great job on those fenestrations!',
      timestamp: '1 hour ago',
      upvotes: 23,
    },
    {
      id: '2',
      author: 'MonsteraLover',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lover',
      content: 'Congrats! My Monstera took about the same time. Make sure you have a moss pole available for when it starts climbing!',
      timestamp: '45 min ago',
      upvotes: 12,
    },
    {
      id: '3',
      author: 'BeginnerGrower',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beginner',
      content: 'This gives me so much hope for my baby Monstera! Only 3 months old right now but seeing this makes me want to keep going 💚',
      timestamp: '30 min ago',
      upvotes: 8,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
      <button className="flex items-center gap-1.5 text-gray-500 hover:text-plant-primary mb-6 transition-all">
        <ArrowLeft size={16} />
        Back to Forum
      </button>

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${category?.color || 'bg-gray-100 text-gray-700'}`}>
          {category?.icon} {category?.name}
        </span>
      </div>

      {/* Post header */}
      <div className="flex items-center gap-3 mb-4">
        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full bg-plant-light" />
        <div>
          <div className="font-medium text-gray-800">{post.author}</div>
          <div className="text-xs text-gray-400">{post.timestamp}</div>
        </div>
        {post.isPinned && (
          <span className="ml-auto flex items-center gap-1 px-3 py-1 bg-plant-primary text-white text-xs rounded-full">
            <Pin size={12} />
            Pinned
          </span>
        )}
      </div>

      {/* Post title */}
      <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-4">
        {post.title}
      </h1>

      {/* Post content */}
      <div className="card p-6 mb-6">
        <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-4">
          {post.content}
        </div>

        {post.images && post.images.length > 0 && (
          <div className="grid gap-3 mb-4">
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full rounded-xl object-cover"
                style={{ maxHeight: '400px' }}
              />
            ))}
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-green-50">
          <button
            onClick={() => setUpvoted(!upvoted)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              upvoted
                ? 'bg-plant-primary text-white'
                : 'bg-plant-light text-plant-primary hover:bg-plant-primary hover:text-white'
            }`}
          >
            <ThumbsUp size={16} />
            {upvoted ? post.upvotes + 1 : post.upvotes}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-green-100 text-gray-600 hover:border-plant-primary hover:text-plant-primary transition-all">
            <MessageCircle size={16} />
            {post.comments} Comments
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              bookmarked
                ? 'bg-plant-primary text-white'
                : 'bg-white border border-green-100 text-gray-600 hover:border-plant-primary hover:text-plant-primary'
            }`}
          >
            <Bookmark size={16} />
            {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-green-100 text-gray-600 hover:border-plant-primary hover:text-plant-primary transition-all ml-auto">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Comments section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {mockComments.length} Comments
        </h2>

        {/* Comment form */}
        <div className="card p-4 mb-6">
          <div className="flex gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              alt="You"
              className="w-9 h-9 rounded-full bg-plant-light"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="input-field resize-none min-h-[80px]"
              />
              <div className="flex justify-end mt-2">
                <button
                  className="btn-primary text-sm px-4 py-2"
                  disabled={!commentText.trim()}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div key={comment.id} className="card p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <img src={comment.avatar} alt={comment.author} className="w-7 h-7 rounded-full bg-plant-light" />
                <span className="font-medium text-sm text-gray-800">{comment.author}</span>
                <span className="text-xs text-gray-400">• {comment.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-plant-primary transition-all">
                  <ThumbsUp size={14} />
                  {comment.upvotes}
                </button>
                <button className="text-xs text-gray-400 hover:text-plant-primary transition-all">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostPage
