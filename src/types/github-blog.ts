export interface GithubBlogSubsection {
  _id: string
  name: string
  paragraphs: string[]
}

export interface GithubBlogSection extends GithubBlogSubsection {
  subsections?: GithubBlogSubsection[]
  screenshot?: { index: number; description: string }
  video?: { name: string; description: string }
}

export interface GithubBlogRequest {
  slug: string
  name: string
  description: string
  image_url: string
  categories: string[]
  media: { screenshot_urls: string[]; video_url: string }
  added_by: { name: string; url: string; image_url: string }
  content: GithubBlogSection[]
}

export interface GithubBlogResponse extends GithubBlogRequest {
  _id: string
  created_at: string
}