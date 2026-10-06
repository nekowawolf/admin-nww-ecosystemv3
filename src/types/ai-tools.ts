export interface AIToolsMedia {
  video_url?: string
  screenshot_urls?: string[]
}

export interface AIToolsSocials {
  twitter?: string
  instagram?: string
  discord?: string
  youtube?: string
}

export interface AIToolsAddedByInfo {
  name?: string
  url?: string
}

export interface AIToolsBase {
  name: string
  description: string
  image_url: string
  website: string
  categories: string[]
  media: AIToolsMedia
  socials: AIToolsSocials
  added_by?: AIToolsAddedByInfo
}

export interface AIToolsRequest extends AIToolsBase {}

export interface AIToolsResponse extends AIToolsBase {
  _id: string
  created_at?: string
}

export interface AIToolSubmission {
  _id: string
  website: string
  added_by?: AIToolsAddedByInfo
  created_at?: string
}