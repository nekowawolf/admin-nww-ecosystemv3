export interface Web3ToolsMedia {
  video_url?: string
  screenshot_urls?: string[]
}

export interface Web3ToolsAddedBy {
  name?: string
  url?: string
}

export interface Web3ToolsBase {
  name: string
  description: string
  category: string
  chains: string[]
  image_url: string
  website: string
  media: Web3ToolsMedia
  added_by?: Web3ToolsAddedBy
  twitter: string
  instagram: string
  discord: string
  telegram: string
  youtube: string
}

export interface Web3ToolsRequest extends Web3ToolsBase {}

export interface Web3ToolsResponse extends Web3ToolsBase {
  _id: string
  created_at?: string
}

export interface Web3ToolsSubmission {
  _id: string
  website: string
  added_by?: Web3ToolsAddedBy
  created_at?: string
}