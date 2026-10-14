export interface BlogSubsection {
  _id: string
  name: string
  paragraphs: string[]
}

export interface BlogSection extends BlogSubsection {
  subsections?: BlogSubsection[]
  screenshot?: { index: number; description: string }
  video?: { name: string; description: string }
}

export interface BlogRequest {
  slug: string
  name: string
  description: string
  image_url: string
  categories: string[]
  media: { screenshot_urls: string[]; video_url: string }
  added_by: { name: string; url: string; image_url: string }
  content: BlogSection[]
}

export interface BlogResponse extends BlogRequest {
  _id: string
  created_at: string
}