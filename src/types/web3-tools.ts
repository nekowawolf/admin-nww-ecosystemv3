export interface Web3ToolsBase {
  name: string
  description: string
  category: string
  chains: string[]
  image_url: string
  website: string
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
