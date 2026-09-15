export interface GuildSocials {
  twitter?: string
  instagram?: string
  discord?: string
  github?: string
  youtube?: string
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
}

export interface GuildRequest extends GuildBase {}

export interface GuildResponse extends GuildBase {
  _id: string
  created_at?: string
}