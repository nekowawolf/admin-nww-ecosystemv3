"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState, useEffect } from 'react'
import { FiUsers, FiLink, FiImage } from 'react-icons/fi'
import { useEditCreator } from '@/hooks/creators/useEditCreator'
import { CreatorsRequest } from '@/types/creators'
import { useRouter } from 'next/navigation'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { validateUrl } from '@/utils/urlValidation'
import { toast } from 'sonner'

const categories = [
  '3D', 'AI', 'Game Dev', 'Web3', 'Design', 'Artist', 
  'Editing', 'Audio', 'Gadget', 'Machine Learning', 
  'Fullstack', 'Cyber Security'
]

const languages = ['EN', 'ID', 'CN', 'JP']
const socialFields: Array<keyof CreatorsRequest['socials']> = ['twitter', 'instagram', 'discord', 'youtube', 'telegram', 'github', 'tiktok']
const platformFields: Array<keyof CreatorsRequest['platforms']> = ['fiverr', 'upwork', 'peopleperhour', 'freelancer']

const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default function EditCreatorForm({ id }: { id: string }) {
  useAuthGuard()
  const router = useRouter()
  const { isSubmitting, initialData, submitEditCreator } = useEditCreator(id)
  
  const [formData, setFormData] = useState<CreatorsRequest>({
    name: '',
    description: '',
    category: '',
    image_url: '',
    website: '',
    language: '',
    open_to_work: false,
    socials: {
      twitter: '',
      instagram: '',
      discord: '',
      youtube: '',
      telegram: '',
      github: '',
      tiktok: ''
    },
    platforms: {
      fiverr: '',
      upwork: '',
      peopleperhour: '',
      freelancer: ''
    }
  })

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [addedByName, setAddedByName] = useState('')
  const [addedByUrl, setAddedByUrl] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setSelectedLanguages(
        initialData.language
          ? initialData.language.split(',').map(language => language.trim()).filter(Boolean)
          : []
      )
      setAddedByName(initialData.added_by?.name || '')
      setAddedByUrl(initialData.added_by?.url || '')
    }
  }, [initialData])

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = (e.target as HTMLInputElement).checked

    if (['twitter', 'instagram', 'discord', 'youtube', 'telegram', 'github', 'tiktok'].includes(name)) {
      setFormData(prev => ({ ...prev, socials: { ...prev.socials, [name]: value } }))
    } else if (['fiverr', 'upwork', 'peopleperhour', 'freelancer'].includes(name)) {
      setFormData(prev => ({ ...prev, platforms: { ...prev.platforms, [name]: value } }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) { toast.error('Please fill out Name'); return; }
    if (!formData.description.trim()) { toast.error('Please fill out Description'); return; }
    if (!formData.category) { toast.error('Please select a Category'); return; }
    if (!formData.image_url.trim()) { toast.error('Please fill out Image URL'); return; }
    if (!formData.website.trim()) { toast.error('Please fill out Website URL'); return; }
    if (!isValidHttpUrl(formData.image_url)) { toast.error('Invalid Image URL format'); return; }
    if (!validateUrl(formData.website, 'website')) { toast.error('Invalid Website URL format'); return; }
    if (addedByUrl && !isValidHttpUrl(addedByUrl)) { toast.error('Invalid contributor Link format'); return; }
    if (formData.socials?.twitter && !validateUrl(formData.socials.twitter, 'twitter')) { toast.error('Invalid Twitter URL format'); return; }
    if (formData.socials?.instagram && !validateUrl(formData.socials.instagram, 'instagram')) { toast.error('Invalid Instagram URL format'); return; }
    if (formData.socials?.discord && !validateUrl(formData.socials.discord, 'discord')) { toast.error('Invalid Discord URL format'); return; }
    if (formData.socials?.youtube && !validateUrl(formData.socials.youtube, 'youtube')) { toast.error('Invalid YouTube URL format'); return; }
    if (formData.socials?.telegram && !validateUrl(formData.socials.telegram, 'telegram')) { toast.error('Invalid Telegram URL format'); return; }
    if (formData.socials?.github && !validateUrl(formData.socials.github, 'github_profile')) { toast.error('Invalid GitHub URL format'); return; }
    if (formData.socials?.tiktok && !validateUrl(formData.socials.tiktok, 'tiktok')) { toast.error('Invalid TikTok URL format'); return; }
    if (formData.platforms?.fiverr && !validateUrl(formData.platforms.fiverr, 'fiverr')) { toast.error('Invalid Fiverr URL format'); return; }
    if (formData.platforms?.upwork && !validateUrl(formData.platforms.upwork, 'upwork')) { toast.error('Invalid Upwork URL format'); return; }
    if (formData.platforms?.peopleperhour && !validateUrl(formData.platforms.peopleperhour, 'peopleperhour')) { toast.error('Invalid PeoplePerHour URL format'); return; }
    if (formData.platforms?.freelancer && !validateUrl(formData.platforms.freelancer, 'freelancer')) { toast.error('Invalid Freelancer URL format'); return; }

    const dataToSubmit = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      image_url: formData.image_url.trim(),
      website: formData.website.trim(),
      language: selectedLanguages.join(', '),
      added_by: {
        name: addedByName.trim() || 'nekowawolf',
        url: addedByUrl.trim() || (addedByName.trim() ? '' : 'https://nekowawolf.xyz')
      }
    }

    const success = await submitEditCreator(dataToSubmit)
    if (success) {
      router.push('/creators-menu/dashboard/creators-list')
    }
  }

  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner variant="circle" size={40} className="text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Edit Creator
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Update an existing Creator listing
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="category">
                    Category *
                  </label>
                  <CustomDropdown
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(value) => handleDropdownChange('category', value)}
                    options={categories.map(cat => ({ value: cat, label: cat }))}
                    placeholder="Select Category"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="description">
                  Description *
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* Website */}
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="website">
                    Website URL *
                  </label>
                  <div className="relative">
                    <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Language */}
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium">
                    Language
                  </label>
                  <MultiSelectDropdown
                    options={languages}
                    selected={selectedLanguages}
                    onChange={setSelectedLanguages}
                    placeholder="e.g. EN, ID"
                  />
                </div>

                {/* Open to Work */}
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium">
                    Status
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer py-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="open_to_work"
                        checked={formData.open_to_work}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-primary">Open to Work</span>
                  </label>
                </div>
              </div>

              {/* Socials Section */}
              <div className="pt-4 border-t border-border-divider">
                <h3 className="text-primary font-medium mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {socialFields.map((social) => (
                    <div key={social} className="flex flex-col gap-2">
                      <label className="text-secondary text-sm font-medium capitalize" htmlFor={social}>
                        {social} URL
                      </label>
                      <input
                        type="url"
                        id={social}
                        name={social}
                        value={formData.socials[social] || ''}
                        onChange={handleInputChange}
                        placeholder={`https://${social}.com/...`}
                        className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Platforms Section */}
              <div className="pt-4 border-t border-border-divider">
                <h3 className="text-primary font-medium mb-4">Freelance Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platformFields.map((platform) => (
                    <div key={platform} className="flex flex-col gap-2">
                      <label className="text-secondary text-sm font-medium capitalize" htmlFor={platform}>
                        {platform} URL
                      </label>
                      <input
                        type="url"
                        id={platform}
                        name={platform}
                        value={formData.platforms[platform] || ''}
                        onChange={handleInputChange}
                        placeholder={`https://${platform}.com/...`}
                        className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Added By Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="addedByName">
                  Name (added by)
                </label>
                <input
                  type="text"
                  id="addedByName"
                  value={addedByName}
                  onChange={(e) => setAddedByName(e.target.value)}
                  placeholder="Your name or username"
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Added By Link */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="addedByUrl">
                  Link (optional)
                </label>
                <input
                  type="url"
                  id="addedByUrl"
                  value={addedByUrl}
                  onChange={(e) => setAddedByUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
                <button
                  type="button"
                  onClick={() => router.push('/creators-menu/dashboard/creators-list')}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting ? 'Updating...' : 'Update Creator'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}