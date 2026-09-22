export interface CommunitySocials {
  twitter?: string
  instagram?: string
  discord?: string
  github?: string
  youtube?: string
}

export interface CommunityBase {
  name: string
  description: string
  platforms: string
  category: string
  image_url: string
  website: string
  link: string
  socials: CommunitySocials
}

export interface CommunityRequest extends CommunityBase {}

export interface CommunityResponse extends CommunityBase {
  _id: string
  created_at?: string
}
