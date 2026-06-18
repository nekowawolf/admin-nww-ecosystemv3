export interface Web3ToolsBase {
  name: string
  description: string
  category: string
  chains: string[]
  imageUrl: string
  website: string
  twitter: string
  discord: string
  telegram: string
}

export interface Web3ToolsRequest extends Web3ToolsBase {}

export interface Web3ToolsResponse extends Web3ToolsBase {
  _id: string
}
