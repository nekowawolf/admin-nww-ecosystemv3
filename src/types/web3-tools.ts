export interface Web3ToolsBase {
  name: string
  description: string
  category: string
  chains: string[]
  imageUrl: string
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
}
