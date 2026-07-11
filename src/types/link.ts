export interface SocialLinks {
  github: string
  twitter: string
  tiktok: string
  website: string
  instagram: string
}

export interface Profile {
  _id?: string
  name: string
  username: string
  bio: string
  avatar_url: string
  cover_url: string
  links: SocialLinks
}

export interface LinkPost {
  _id: string
  name: string
  username: string
  is_verified: boolean
  caption: string
  url?: string
  category: string
  views: number
  created_at: string
  updated_at: string
}

export interface LinkPostRequest {
  caption: string
  url?: string
  category: string
}