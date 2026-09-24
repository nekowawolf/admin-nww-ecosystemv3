export interface AddedByInfo {
  name?: string
  url?: string
}

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
  added_by?: AddedByInfo
}

export interface CommunityRequest extends CommunityBase {}

export interface CommunityResponse extends CommunityBase {
  _id: string
  created_at?: string
}

export interface CommunitySubmission {
  _id: string
  community_link: string
  added_by?: AddedByInfo
  created_at?: string
}