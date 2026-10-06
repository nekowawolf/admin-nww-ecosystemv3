export interface GuildSocials {
  twitter?: string
  instagram?: string
  discord?: string
  github?: string
  youtube?: string
}

export interface AddedByInfo {
  name?: string
  url?: string
}

export interface GuildBase {
  name: string
  description: string
  image_url: string
  website: string
  platform: string
  category: string
  link: string
  socials: GuildSocials
  added_by?: AddedByInfo
}

export interface GuildRequest extends GuildBase {}

export interface GuildResponse extends GuildBase {
  _id: string
  created_at?: string
}

export interface GuildSubmission {
  _id: string
  guild_link: string
  added_by?: AddedByInfo
  created_at?: string
}