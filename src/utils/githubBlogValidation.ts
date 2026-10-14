import { GithubBlogRequest } from '@/types/github-blog'

export function validateGithubBlog(data: GithubBlogRequest): string | null {
  if (data.slug.length > 200 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    return 'Slug must contain lowercase letters, numbers, and single hyphens (maximum 200 characters).'
  }
  if (!data.name.trim() || !data.description.trim() || !data.image_url.trim()) {
    return 'Title, description, and cover image URL are required.'
  }
  if (!data.added_by.name.trim()) return 'Author name is required.'
  if (!data.content.length) return 'Add at least one content section.'
  if (data.media.screenshot_urls.some(url => !url.trim())) return 'Every screenshot needs a URL, or remove the empty screenshot.'

  const ids = new Set<string>()
  for (const section of data.content) {
    for (const heading of [section, ...(section.subsections || [])]) {
      if (!heading._id.trim() || /\s/.test(heading._id) || !heading.name.trim()) {
        return 'Every section and subsection needs an ID without whitespace and a heading.'
      }
      if (ids.has(heading._id)) return `Duplicate section or subsection ID: ${heading._id}`
      ids.add(heading._id)
    }
    if (section.screenshot && (!Number.isInteger(section.screenshot.index) || section.screenshot.index < 0 || section.screenshot.index >= data.media.screenshot_urls.length)) {
      return `Choose an existing screenshot for section "${section.name}".`
    }
    if (section.video && (!data.media.video_url.trim() || !section.video.name.trim())) {
      return `Section "${section.name}" needs a video name and a media video URL.`
    }
  }

  const urls = [data.image_url, data.added_by.url, data.added_by.image_url, data.media.video_url, ...data.media.screenshot_urls]
  for (const url of urls) {
    if (!url) continue
    try {
      if (!['http:', 'https:'].includes(new URL(url).protocol)) throw new Error('Invalid protocol')
    } catch {
      return 'Image, author, screenshot, and video URLs must be valid HTTP(S) URLs.'
    }
  }
  return null
}