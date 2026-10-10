export interface AddedByInfo {
  name?: string
  url?: string
}

export interface AirdropBase {
  _id?: string
  name: string
  task: string
  website: string
  level: string
  status: string
  backed: string
  funds: string
  supply: string
  fdv: string
  market_cap: string
  is_vesting: boolean
  is_paid: boolean
  claim_url: string
  price: number
  usd_income: number
  discord: string
  twitter: string
  telegram: string
  image_url: string
  description: string
  guide_url: string
  added_by?: AddedByInfo
  created_at?: string
  ended_at?: string
}

export interface AirdropFormData extends AirdropBase {}

export interface AirdropRequest extends AirdropBase {}

export interface AirdropSubmission {
  _id: string
  website: string
  added_by?: AddedByInfo
  created_at?: string
}
