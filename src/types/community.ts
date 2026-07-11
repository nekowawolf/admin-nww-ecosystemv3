export interface CommunityBase {
  name: string
  platforms: string
  category: string
  img_url: string
  link_url: string
}

export interface CommunityRequest extends CommunityBase {}
