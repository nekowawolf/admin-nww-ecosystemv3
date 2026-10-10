"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState, useEffect } from 'react'
import { FiUsers, FiLink, FiImage } from 'react-icons/fi'
import { useEditWeb3Tool } from '@/hooks/web3-tools/useEditWeb3Tool'
import { Web3ToolsRequest } from '@/types/web3-tools'
import { useRouter } from 'next/navigation'
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { validateUrl } from '@/utils/urlValidation'
import { toast } from 'sonner'

const chains = [
  "Ethereum", "Bitcoin", "Solana", "BNB Chain", "Polygon", "Optimism", "Arbitrum",
  "Base", "Avalanche", "TON", "TRON", "Cosmos", "Near", "Aptos", "Sui", "Injective",
  "Sei", "Linea", "ZKsync", "Scroll", "Mantle", "Blast", "Taiko", "Mode", "Fraxtal",
  "Manta", "opBNB", "Unichain", "Soneium", "HyperEVM", "Berachain", "Monad", "MegaETH",
  "Plume", "Abstract", "Ink", "Morph", "Gravity", "Rootstock", "Core", "Corn", "BOB",
  "Botanix", "Cronos", "Gnosis", "Celo", "Kaia", "X Layer", "Plasma", "Robinhood",
  "Story", "WorldChain", "Other Chains"
];

export default function EditWeb3ToolsForm({ id }: { id: string }) {
  useAuthGuard()
  const router = useRouter()
  const { isSubmitting, initialData, submitEditWeb3Tool } = useEditWeb3Tool(id)
  const [formData, setFormData] = useState<Web3ToolsRequest>({
    name: '',
    description: '',
    category: '',
    chains: [],
    image_url: '',
    website: '',
    media: {
      video_url: '',
      screenshot_urls: []
    },
    twitter: '',
    instagram: '',
    discord: '',
    telegram: '',
    youtube: ''
  })
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  const [addedByName, setAddedByName] = useState('')
  const [addedByUrl, setAddedByUrl] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setSelectedChains(initialData.chains || [])
      setAddedByName(initialData.added_by?.name || '')
      setAddedByUrl(initialData.added_by?.url || '')
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'video_url') {
      setFormData(prev => ({ ...prev, media: { ...prev.media, video_url: value } }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
      const screenshotUrls = [...(prev.media?.screenshot_urls || [])]
      screenshotUrls[index] = value
      return { ...prev, media: { ...prev.media, screenshot_urls: screenshotUrls } }
    })
  }

  const handleRemoveScreenshotUrl = (index: number) => {
    setFormData(prev => {
      const screenshotUrls = [...(prev.media?.screenshot_urls || [])]
      screenshotUrls.splice(index, 1)
      return { ...prev, media: { ...prev.media, screenshot_urls: screenshotUrls } }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) { toast.error('Please fill out Project Name'); return; }
    if (!formData.description) { toast.error('Please fill out Description'); return; }
    if (!formData.image_url) { toast.error('Please fill out Image URL'); return; }
    if (!formData.website) { toast.error('Please fill out Website URL'); return; }
    if (selectedChains.length === 0) { toast.error('Please select at least one Chain'); return; }
    if (formData.website && !validateUrl(formData.website, 'website')) { toast.error('Invalid Website URL format'); return; }
    if (formData.twitter && !validateUrl(formData.twitter, 'twitter')) { toast.error('Invalid Twitter URL format'); return; }
    if (formData.instagram && !validateUrl(formData.instagram, 'instagram')) { toast.error('Invalid Instagram URL format'); return; }
    if (formData.discord && !validateUrl(formData.discord, 'discord')) { toast.error('Invalid Discord URL format'); return; }
    if (formData.telegram && !validateUrl(formData.telegram, 'telegram')) { toast.error('Invalid Telegram URL format'); return; }
    if (formData.youtube && !validateUrl(formData.youtube, 'youtube')) { toast.error('Invalid YouTube URL format'); return; }


    const dataToSubmit = {
      ...formData,
      chains: selectedChains,
      added_by: {
        name: addedByName || 'nekowawolf',
        url: addedByUrl || (addedByName ? '' : 'https://nekowawolf.xyz')
      }
    }
    const success = await submitEditWeb3Tool(dataToSubmit)
    if (success) {
      router.push('/web3-tools-menu/dashboard/web3-tools-list')
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
          Edit Web3 Tool
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Update an existing Web3 Tool listing
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
                  options={[
                    { value: 'DEX', label: 'DEX' },
                    { value: 'CEX', label: 'CEX' },
                    { value: 'DeFi', label: 'DeFi' },
                    { value: 'Analytics', label: 'Analytics' },
                    { value: 'Bridge', label: 'Bridge' },
                    { value: 'Explorers', label: 'Explorers' },
                    { value: 'Quests', label: 'Quests' },
                    { value: 'Faucets', label: 'Faucets' },
                    { value: 'Wallets', label: 'Wallets' },
                    { value: 'Security', label: 'Security' },
                    { value: 'Launchpad', label: 'Launchpad' },
                    { value: 'Airdrop Tracker', label: 'Airdrop Tracker' },
                    { value: 'NFT Marketplace', label: 'NFT Marketplace' },
                    { value: 'Research', label: 'Research' }
                  ]}
                  placeholder="Select Category"
                />
              </div>

              {/* Chains */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium">
                  Chains *
                </label>
                <MultiSelectDropdown
                  options={chains}
                  selected={selectedChains}
                  onChange={setSelectedChains}
                  placeholder="e.g., Ethereum, Solana, Polygon"
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
                <label className="text-secondary text-sm font-medium">Screenshot URLs</label>
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

              {/* Twitter */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="twitter">
                  Twitter URL
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
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
                  value={formData.instagram}
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
                  value={formData.discord}
                  onChange={handleInputChange}
                  placeholder="https://discord.gg/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              {/* Telegram */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="telegram">
                  Telegram URL
                </label>
                <input
                  type="url"
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder="https://t.me/..."
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
                  value={formData.youtube}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/..."
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
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
                  onClick={() => router.push('/web3-tools-menu/dashboard/web3-tools-list')}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                >
                  {isSubmitting ? 'Updating...' : 'Update Web3 Tool'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}