import { GithubBlogRequest } from '@/types/github-blog'

function safeURL(value: string) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}

export default function BlogPreview({ blog }: { blog: GithubBlogRequest }) {
  const cover = safeURL(blog.image_url)
  const authorURL = safeURL(blog.added_by.url)
  const videoURL = safeURL(blog.media.video_url)

  return (
    <article className="bg-[var(--fill-color)] rounded-xl border border-border-divider p-6 shadow-lg w-full sm:w-5/6 mx-auto mb-8 space-y-6 text-primary break-words">
      <div>
        <p className="text-sm text-muted mb-2">Article preview</p>
        <h2 className="text-2xl font-bold">{blog.name || 'Untitled article'}</h2>
        <p className="text-secondary mt-2 whitespace-pre-wrap">{blog.description}</p>
        <p className="text-sm text-muted mt-2">{blog.categories.join(' · ')}</p>
        <p className="text-sm mt-2">By {authorURL ? <a href={authorURL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{blog.added_by.name}</a> : blog.added_by.name}</p>
      </div>
      {cover && <img src={cover} alt={blog.name} className="max-h-80 w-full rounded-lg object-contain" />}
      {blog.content.map((section, index) => {
        const screenshot = section.screenshot && safeURL(blog.media.screenshot_urls[section.screenshot.index] || '')
        return (
          <section key={index} className="space-y-3">
            <h3 className="text-xl font-semibold">{section.name || 'Untitled section'}</h3>
            {(section.paragraphs || []).map((paragraph, i) => <p key={i} className="whitespace-pre-wrap text-secondary">{paragraph}</p>)}
            {(section.subsections || []).map((subsection, i) => (
              <div key={i} className="space-y-3 pl-4">
                <h4 className="text-lg font-medium">{subsection.name}</h4>
                {(subsection.paragraphs || []).map((paragraph, j) => <p key={j} className="whitespace-pre-wrap text-secondary">{paragraph}</p>)}
              </div>
            ))}
            {screenshot && <figure><img src={screenshot} alt={section.screenshot!.description} loading="lazy" className="max-h-80 rounded-lg object-contain" /><figcaption className="text-sm text-muted mt-2">{section.screenshot!.description}</figcaption></figure>}
            {section.video && <div className="space-y-2"><p className="font-medium">{section.video.name}</p><p className="text-secondary whitespace-pre-wrap">{section.video.description}</p>{videoURL && <a href={videoURL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Open video</a>}</div>}
          </section>
        )
      })}
    </article>
  )
}