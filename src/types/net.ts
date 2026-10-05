export interface NetMedia {
  video_url?: string
  screenshot_urls?: string[]
}

export interface AddedByInfo {
  name?: string
  url?: string
}

export interface NetSocials {
  twitter?: string
  instagram?: string
  discord?: string
  github?: string
  youtube?: string
}

export interface NetBase {
  name: string
  description: string
  image_url: string
  website: string
  categories: string[]
  media: NetMedia
  socials: NetSocials
  added_by?: AddedByInfo
}

export interface NetRequest extends NetBase {}

export interface NetResponse extends NetBase {
  _id: string
  created_at?: string
}

export interface NetSubmission {
  _id: string
  website: string
  added_by?: AddedByInfo
  created_at?: string
}
