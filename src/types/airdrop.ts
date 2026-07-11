export interface AirdropBase {
  name: string
  task: string
  link: string
  level: string
  status: string
  backed: string
  funds: string
  supply: string
  fdv: string
  market_cap: string
  vesting: string
  claim: string
  price: number
  usd_income: number
  link_discord: string
  link_twitter: string
  link_telegram: string
  image_url: string
  description: string
  link_guide: string
}

export interface AirdropFormData extends AirdropBase {}

export interface AirdropRequest extends AirdropBase {}

export interface AirdropFreeRequest extends AirdropBase {}

export interface AirdropPaidRequest extends AirdropBase {}