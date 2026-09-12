"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState } from 'react'
import { FiUsers, FiLink, FiImage } from 'react-icons/fi'
import { useAddNet } from '@/hooks/net/useAddNet'
import { NetRequest } from '@/types/net'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { validateUrl } from '@/utils/urlValidation'
import { toast } from 'sonner'
import { getNets } from '@/services/net/netService'
import { ValidatedUrlInput } from '@/components/ui/ValidatedUrlInput'

const categories = [
    "Design",
    "Inspiration",
    "Image",
    "Video",
    "Audio",
    "3D",
    "Resources",
    "Document",
    "Utilities",
    "Learning",
    "Miscellaneous",
];

export default function AddNetForm() {
  useAuthGuard()
  const [formData, setFormData] = useState<NetRequest>({
    name: '',
    description: '',
    categories: [],
    image_url: '',
    website: '',
    media: {
      video_url: '',
      screenshot_urls: []
    },
    socials: {
      twitter: '',
      instagram: '',
      discord: '',
      github: '',
      youtube: ''
    }
  })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const { isSubmitting, submitNet } = useAddNet()

  const [urlExists, setUrlExists] = useState<boolean | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'video_url') {
      setFormData(prev => ({ ...prev, media: { ...prev.media, video_url: value } }))
    } else if (['twitter', 'instagram', 'discord', 'youtube', 'github'].includes(name)) {
      setFormData(prev => ({ ...prev, socials: { ...prev.socials, [name]: value } }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddScreenshotUrl = () => {
    setFormData(prev => ({
      ...prev,
      media: {
        ...prev.media,
        screenshot_urls: [...(prev.media?.screenshot_urls || []), '']
      }
    }))
  }

  const handleScreenshotUrlChange = (index: number, value: string) => {
    setFormData(prev => {
      const newUrls = [...(prev.media?.screenshot_urls || [])]
      newUrls[index] = value
      return {
        ...prev,
        media: { ...prev.media, screenshot_urls: newUrls }
      }
    })
  }

  const handleRemoveScreenshotUrl = (index: number) => {
    setFormData(prev => {
      const newUrls = [...(prev.media?.screenshot_urls || [])]
      newUrls.splice(index, 1)
      return {
        ...prev,
        media: { ...prev.media, screenshot_urls: newUrls }
      }
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      categories: [],
      image_url: '',
      website: '',
      media: {
        video_url: '',
        screenshot_urls: []
      },
      socials: {
        twitter: '',
        instagram: '',
        discord: '',
        github: '',
        youtube: ''
      }
    })
    setSelectedCategories([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) { toast.error('Please fill out Project Name'); return; }
    if (!formData.description) { toast.error('Please fill out Description'); return; }
    if (!formData.image_url) { toast.error('Please fill out Image URL'); return; }
    if (!formData.website) { toast.error('Please fill out Website URL'); return; }
    if (urlExists === true) { toast.error('This website is already listed.'); return; }
    if (selectedCategories.length === 0) { toast.error('Please select at least one Category'); return; }
    if (formData.website && !validateUrl(formData.website, 'website')) { toast.error('Invalid Website URL format'); return; }
    if (formData.socials?.twitter && !validateUrl(formData.socials.twitter, 'twitter')) { toast.error('Invalid Twitter URL format'); return; }
    if (formData.socials?.instagram && !validateUrl(formData.socials.instagram, 'instagram')) { toast.error('Invalid Instagram URL format'); return; }
    if (formData.socials?.discord && !validateUrl(formData.socials.discord, 'discord')) { toast.error('Invalid Discord URL format'); return; }
    if (formData.socials?.github && !validateUrl(formData.socials.github, 'github')) { toast.error('Invalid Github URL format'); return; }
    if (formData.socials?.youtube && !validateUrl(formData.socials.youtube, 'youtube')) { toast.error('Invalid YouTube URL format'); return; }


    const dataToSubmit = {
      ...formData,
      categories: selectedCategories
    }
    await submitNet(dataToSubmit)
    resetForm()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Net
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new Net listing
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Name *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600 min-h-[100px]"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium">
                  Categories *
                </label>
                <MultiSelectDropdown
                  options={categories}
                  selected={selectedCategories}
                  onChange={setSelectedCategories}
                  placeholder="Select Category"
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="image_url">
                  Image URL *
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Video URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="video_url">
                  Video URL
                </label>
                <div className="relative">
                  <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="video_url"
                    name="video_url"
                    value={formData.media?.video_url || ''}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Screenshot URLs */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium">
                  Screenshot URLs
                </label>
                {(formData.media?.screenshot_urls || []).map((url, index) => (
                  <div key={index} className="flex gap-2 relative items-center">
                    <div className="relative flex-1">
                      <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleScreenshotUrlChange(index, e.target.value)}
                        placeholder="https://example.com/screenshot.jpg"
                        className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveScreenshotUrl(index)}
                      className="px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddScreenshotUrl}
                  className="mt-2 w-fit px-4 py-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  + Add Screenshot URL
                </button>
              </div>

              {/* Website */}
              <ValidatedUrlInput
                label="Website URL *"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                icon={<FiLink />}
                fetchUrls={async () => {
                  const nets = await getNets()
                  return nets.map(n => n.website || '')
                }}
                onValidationChange={setUrlExists}
                errorMessage="This website is already listed."
              />

              {/* Twitter */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="twitter">
                  Twitter URL
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.socials?.twitter || ''}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="instagram">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.socials?.instagram || ''}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Discord */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="discord">
                  Discord URL
                </label>
                <input
                  type="url"
                  id="discord"
                  name="discord"
                  value={formData.socials?.discord || ''}
                  onChange={handleInputChange}
                  placeholder="https://discord.gg/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Github */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="github">
                  Github URL
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.socials?.github || ''}
                  onChange={handleInputChange}
                  placeholder="https://github.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Youtube */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="youtube">
                  Youtube URL
                </label>
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={formData.socials?.youtube || ''}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting ? 'Creating...' : 'Create Net'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
