'use client'

import { FiArrowDown, FiArrowUp, FiPlus, FiTrash2 } from 'react-icons/fi'
import { GithubBlogSection, GithubBlogSubsection } from '@/types/github-blog'
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import BlogField, { blogButtonClass, blogDangerButtonClass } from './BlogField'

interface Props {
  content: GithubBlogSection[]
  screenshotURLs: string[]
  onChange: (content: GithubBlogSection[]) => void
}

function newHeading(): GithubBlogSubsection {
  return { _id: `heading-${crypto.randomUUID()}`, name: '', paragraphs: [] }
}

function ParagraphsEditor({ paragraphs, onChange }: { paragraphs: string[]; onChange: (paragraphs: string[]) => void }) {
  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <BlogField label={`Paragraph ${index + 1}`} multiline value={paragraph} onChange={value => onChange(paragraphs.map((item, i) => i === index ? value : item))} />
          </div>
          <button type="button" className={`${blogDangerButtonClass} mt-7`} aria-label={`Remove paragraph ${index + 1}`} onClick={() => onChange(paragraphs.filter((_, i) => i !== index))}><FiTrash2 /></button>
        </div>
      ))}
      <button type="button" className={blogButtonClass} onClick={() => onChange([...paragraphs, ''])}><FiPlus /> Add paragraph</button>
    </div>
  )
}

export default function BlogContentEditor({ content, screenshotURLs, onChange }: Props) {
  const updateSection = (index: number, patch: Partial<GithubBlogSection>) => {
    onChange(content.map((section, i) => i === index ? { ...section, ...patch } : section))
  }
  const moveSection = (index: number, offset: number) => {
    const next = [...content]
    const target = index + offset
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <section className="space-y-6 border-t border-border-divider pt-6">
      <div>
        <h3 className="text-sm font-semibold text-primary">Article content</h3>
        <p className="text-xs text-secondary mt-2">Heading IDs must be unique across all sections and subsections. Each paragraph is saved separately.</p>
      </div>
      {content.map((section, index) => (
        <div key={index} className="rounded-lg border border-border-divider p-4 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-primary">Section {index + 1}</h4>
            <div className="flex gap-2">
              <button type="button" className={blogButtonClass} disabled={index === 0} aria-label={`Move section ${index + 1} up`} onClick={() => moveSection(index, -1)}><FiArrowUp /></button>
              <button type="button" className={blogButtonClass} disabled={index === content.length - 1} aria-label={`Move section ${index + 1} down`} onClick={() => moveSection(index, 1)}><FiArrowDown /></button>
              <button type="button" className={blogDangerButtonClass} aria-label={`Remove section ${index + 1}`} onClick={() => onChange(content.filter((_, i) => i !== index))}><FiTrash2 /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <BlogField label="Heading *" required value={section.name} onChange={name => updateSection(index, { name })} />
            <BlogField label="Heading ID *" required value={section._id} onChange={_id => updateSection(index, { _id })} />
          </div>
          <ParagraphsEditor paragraphs={section.paragraphs || []} onChange={paragraphs => updateSection(index, { paragraphs })} />

          <div className="flex flex-col gap-2">
            <label htmlFor={`section-${index}-screenshot-button`} className="text-secondary text-sm font-medium">Screenshot (optional)</label>
            <CustomDropdown
              id={`section-${index}-screenshot`}
              name={`section-${index}-screenshot`}
              value={section.screenshot ? String(section.screenshot.index) : ''}
              placeholder="No screenshot"
              options={[{ value: '', label: 'No screenshot' }, ...screenshotURLs.map((url, i) => ({ value: String(i), label: `${i + 1}: ${url || '(empty URL)'}` }))]}
              onChange={value => updateSection(index, { screenshot: value === '' ? undefined : { index: Number(value), description: section.screenshot?.description || '' } })}
            />
          </div>
          {section.screenshot && <BlogField label="Screenshot description" multiline value={section.screenshot.description} onChange={description => updateSection(index, { screenshot: { index: section.screenshot!.index, description } })} />}

          <label className="flex items-center gap-2 text-sm text-secondary">
            <input type="checkbox" className="accent-blue-600 cursor-pointer" checked={!!section.video} onChange={event => updateSection(index, { video: event.target.checked ? { name: '', description: '' } : undefined })} /> Include article video in this section
          </label>
          {section.video && (
            <div className="grid grid-cols-1 gap-6">
              <BlogField label="Video name *" required value={section.video.name} onChange={name => updateSection(index, { video: { ...section.video!, name } })} />
              <BlogField label="Video description" multiline value={section.video.description} onChange={description => updateSection(index, { video: { ...section.video!, description } })} />
            </div>
          )}

          {(section.subsections || []).map((subsection, subIndex) => {
            const updateSubsection = (patch: Partial<GithubBlogSubsection>) => updateSection(index, { subsections: section.subsections!.map((item, i) => i === subIndex ? { ...item, ...patch } : item) })
            return (
              <div key={subIndex} className="border-t border-border-divider pt-6 space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-sm font-medium text-primary">Subsection {subIndex + 1}</h5>
                  <button type="button" className={blogDangerButtonClass} aria-label={`Remove subsection ${subIndex + 1} in section ${index + 1}`} onClick={() => updateSection(index, { subsections: section.subsections!.filter((_, i) => i !== subIndex) })}><FiTrash2 /></button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <BlogField label="Subheading *" required value={subsection.name} onChange={name => updateSubsection({ name })} />
                  <BlogField label="Subheading ID *" required value={subsection._id} onChange={_id => updateSubsection({ _id })} />
                </div>
                <ParagraphsEditor paragraphs={subsection.paragraphs || []} onChange={paragraphs => updateSubsection({ paragraphs })} />
              </div>
            )
          })}
          <button type="button" className={blogButtonClass} onClick={() => updateSection(index, { subsections: [...(section.subsections || []), newHeading()] })}><FiPlus /> Add subsection</button>
        </div>
      ))}
      <button type="button" className={blogButtonClass} onClick={() => onChange([...content, { ...newHeading(), subsections: [] }])}><FiPlus /> Add section</button>
    </section>
  )
}