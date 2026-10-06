export interface CreatorsSocials {
  twitter?: string
  instagram?: string
  discord?: string
  youtube?: string
  telegram?: string
  github?: string
  tiktok?: string
}

export interface CreatorsPlatforms {
  fiverr?: string
  upwork?: string
  peopleperhour?: string
  freelancer?: string
}

export interface CreatorAddedByInfo {
  name?: string
  url?: string
}

export interface CreatorsBase {
  name: string
  description: string
  image_url: string
  website: string
  category: string
  language: string
  open_to_work: boolean
  socials: CreatorsSocials
  platforms: CreatorsPlatforms
  added_by?: CreatorAddedByInfo
}

export interface CreatorsRequest extends CreatorsBase {}

export interface CreatorsResponse extends CreatorsBase {
  _id: string
  created_at?: string
}

export interface CreatorSubmission {
  _id: string
  website: string
  added_by?: CreatorAddedByInfo
  created_at?: string
}
