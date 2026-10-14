'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiEye, FiImage, FiLink, FiUsers } from 'react-icons/fi'
import { toast } from 'sonner'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { createGithubBlog, getGithubBlogById, updateGithubBlog } from '@/services/github-repos/githubBlogService'
import { GithubBlogRequest } from '@/types/github-blog'
import { validateGithubBlog } from '@/utils/githubBlogValidation'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import BlogField, { blogButtonClass, blogInputClass } from './BlogField'
import BlogContentEditor from './BlogContentEditor'
import BlogPreview from './BlogPreview'

const listRoute = '/github-repos-menu/dashboard/blog-list'

function emptyBlog(): GithubBlogRequest {
  return {
    slug: '', name: '', description: '', image_url: '', categories: [],
    media: { screenshot_urls: [], video_url: '' },
    added_by: { name: '', url: '', image_url: '' },
    content: [{ _id: 'introduction', name: '', paragraphs: [''], subsections: [] }],
  }
}

export default function GithubBlogForm({ id }: { id?: string }) {
  useAuthGuard()
  const router = useRouter()
  const [form, setForm] = useState<GithubBlogRequest>(emptyBlog)
  const [categories, setCategories] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!id) return
    let active = true
    setLoading(true)
    setError(null)
    getGithubBlogById(id).then(blog => {
      if (!active) return
      setForm({
        slug: blog.slug, name: blog.name, description: blog.description, image_url: blog.image_url,
        categories: blog.categories || [],
        media: { screenshot_urls: blog.media?.screenshot_urls || [], video_url: blog.media?.video_url || '' },
        added_by: { name: blog.added_by?.name || '', url: blog.added_by?.url || '', image_url: blog.added_by?.image_url || '' },
        content: (blog.content || []).map(section => ({ ...section, paragraphs: section.paragraphs || [], subsections: (section.subsections || []).map(subsection => ({ ...subsection, paragraphs: subsection.paragraphs || [] })) })),
      })
      setCategories((blog.categories || []).join(', '))
      setCreatedAt(blog.created_at)
    }).catch(err => {
      if (active) setError(err instanceof Error ? err.message : 'Failed to load blog')
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => { active = false }
  }, [id, retry])

  const update = (patch: Partial<GithubBlogRequest>) => setForm(previous => ({ ...previous, ...patch }))
  const article: GithubBlogRequest = { ...form, categories: [...new Set(categories.split(',').map(value => value.trim()).filter(Boolean))] }

  const removeScreenshot = (index: number) => {
    setForm(previous => ({
      ...previous,
      media: { ...previous.media, screenshot_urls: previous.media.screenshot_urls.filter((_, i) => i !== index) },
      content: previous.content.map(section => ({
        ...section,
        screenshot: !section.screenshot || section.screenshot.index === index ? undefined : { ...section.screenshot, index: section.screenshot.index > index ? section.screenshot.index - 1 : section.screenshot.index },
      })),
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (saving) return
    const payload = { ...article, slug: article.slug.trim(), name: article.name.trim() }
    const validationError = validateGithubBlog(payload)
    if (validationError) {
      toast.error(validationError)
      return
    }
    setSaving(true)
    try {
      if (id) await updateGithubBlog(id, payload)
      else await createGithubBlog(payload)
      toast.success(id ? 'Blog updated successfully!' : 'Blog created successfully!')
      router.push(listRoute)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save blog')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-10" role="status" aria-label="Loading blog"><Spinner variant="circle" size={40} className="text-blue-500" /></div>
  if (error) return <div className="flex flex-col items-center gap-4 py-10 px-6"><p role="alert" className="text-red-500 text-center py-4 px-6 bg-red-500/10 rounded-lg border border-red-500/20 w-full max-w-md">{error}</p><div className="flex gap-4"><button type="button" className={blogButtonClass} onClick={() => setRetry(value => value + 1)}>Retry</button><Link href={listRoute} className={blogButtonClass}>Back to blogs</Link></div></div>

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left sm:w-5/6 sm:mx-auto">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">{id ? 'Edit GitHub Blog' : 'Add New GitHub Blog'}</h2>
        <p className="text-xs sm:text-sm text-secondary">{id ? 'Update your GitHub Blog article' : 'Create a new GitHub Blog article'}</p>
        {createdAt && <p className="text-xs sm:text-sm text-secondary mt-2">Created: {new Date(createdAt).toLocaleString()}</p>}
      </div>
      <form onSubmit={handleSubmit} className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="space-y-6 mb-8">
        <fieldset disabled={saving} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <BlogField label="Title *" icon={FiUsers} placeholder="Enter article title" required value={form.name} onChange={name => update({ name })} />
            <BlogField label="Slug *" icon={FiLink} required maxLength={200} pattern="[a-z0-9]+(-[a-z0-9]+)*" placeholder="welcome-to-nww" value={form.slug} onChange={slug => update({ slug })} />
            <BlogField label="Description *" placeholder="Enter description" required multiline value={form.description} onChange={description => update({ description })} />
            <BlogField label="Cover image URL *" icon={FiImage} required type="url" placeholder="https://..." value={form.image_url} onChange={image_url => update({ image_url })} />
            <BlogField label="Categories (comma-separated)" placeholder="Updates, Guides" value={categories} onChange={setCategories} />
          </div>
          <section className="space-y-6 border-t border-border-divider pt-6">
            <h3 className="text-sm font-semibold text-primary">Author</h3>
            <div className="grid grid-cols-1 gap-6">
              <BlogField label="Author name *" required value={form.added_by.name} onChange={name => update({ added_by: { ...form.added_by, name } })} />
              <BlogField label="Author URL" type="url" value={form.added_by.url} onChange={url => update({ added_by: { ...form.added_by, url } })} />
              <BlogField label="Author image URL" type="url" value={form.added_by.image_url} onChange={image_url => update({ added_by: { ...form.added_by, image_url } })} />
            </div>
          </section>
          <section className="space-y-6 border-t border-border-divider pt-6">
            <h3 className="text-sm font-semibold text-primary">Media</h3>
            <BlogField label="Video URL" icon={FiLink} type="url" placeholder="https://youtube.com/..." value={form.media.video_url} onChange={video_url => update({ media: { ...form.media, video_url } })} />
            <div className="flex flex-col gap-2" role="group" aria-labelledby="blog-screenshot-urls-label">
              <span id="blog-screenshot-urls-label" className="text-secondary text-sm font-medium">Screenshot URLs</span>
              {form.media.screenshot_urls.map((url, index) => (
                <div key={index} className="flex gap-2 relative items-center">
                  <div className="relative flex-1 min-w-0">
                    <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                    <input
                      type="url"
                      required
                      aria-label={`Screenshot ${index + 1} URL`}
                      value={url}
                      onChange={event => update({ media: { ...form.media, screenshot_urls: form.media.screenshot_urls.map((item, i) => i === index ? event.target.value : item) } })}
                      placeholder="https://example.com/screenshot.jpg"
                      className={blogInputClass.replace('px-4', 'pl-10 pr-4')}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeScreenshot(index)}
                    aria-label={`Remove screenshot ${index + 1}`}
                    className="shrink-0 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update({ media: { ...form.media, screenshot_urls: [...form.media.screenshot_urls, ''] } })}
                className="mt-2 w-fit px-4 py-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                + Add Screenshot URL
              </button>
            </div>
          </section>
          <BlogContentEditor content={form.content} screenshotURLs={form.media.screenshot_urls} onChange={content => update({ content })} />
        </fieldset>
        <div className="flex flex-wrap justify-end gap-4 pt-6 border-t border-border-divider">
          <button type="button" className={blogButtonClass} onClick={() => setPreview(value => !value)} aria-expanded={preview}><FiEye /> {preview ? 'Hide preview' : 'Preview article'}</button>
          <button type="button" disabled={saving} className={`${blogButtonClass} px-6`} onClick={() => {
            if (id) router.push(listRoute)
            else { setForm(emptyBlog()); setCategories(''); setPreview(false) }
          }}>{id ? 'Cancel' : 'Reset Form'}</button>
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200">{saving ? id ? 'Updating...' : 'Creating...' : id ? 'Update Blog' : 'Create Blog'}</button>
        </div>
        </div>
      </form>
      {preview && <BlogPreview blog={article} />}
    </div>
  )
}