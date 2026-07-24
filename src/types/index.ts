export interface Plant {
  id: string
  name: string
  scientificName: string
  image: string
  careLevel: 'easy' | 'medium' | 'hard'
  waterNeeds: string
  lightNeeds: string
  tempRange: string
  humidity: string
  description: string
  tags: string[]
}

export interface Post {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  category: string
  tags: string[]
  images?: string[]
  upvotes: number
  comments: number
  timestamp: string
  isPinned?: boolean
}

export interface JournalEntry {
  id: string
  plantName: string
  plantImage: string
  date: string
  note: string
  images: string[]
  growthStage: string
}

export interface User {
  id: string
  name: string
  avatar: string
  joinedDate: string
  plantCount: number
  posts: number
  badges: string[]
}

export interface ForumCategory {
  id: string
  name: string
  icon: string
  description: string
  postCount: number
  color: string
}
