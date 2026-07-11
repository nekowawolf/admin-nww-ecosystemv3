"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState } from 'react'
import { FiUsers, FiLink, FiImage } from 'react-icons/fi'
import { useAddWeb3Tool } from '@/hooks/web3-tools/useAddWeb3Tool'
import { Web3ToolsRequest } from '@/types/web3-tools'
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import { MultiSelectDropdown } from '@/components/ui/MultiSelectDropdown'

const chains = [
  "Ethereum", "Bitcoin", "Solana", "BNB Chain", "Polygon", "Optimism", "Arbitrum",
  "Base", "Avalanche", "TON", "TRON", "Cosmos", "Near", "Aptos", "Sui", "Injective",
  "Sei", "Linea", "ZKsync", "Scroll", "Mantle", "Blast", "Taiko", "Mode", "Fraxtal",
  "Manta", "opBNB", "Unichain", "Soneium", "HyperEVM", "Bera", "Sonic", "Monad", "MegaETH",
  "Plume", "Abstract", "Ink", "Morph", "Gravity", "Rootstock", "Core", "Corn", "BOB",
  "Botanix", "Cronos", "Gnosis", "Celo", "Kaia", "X Layer", "Plasma", "Robinhood",
  "Story", "WorldChain", "Other Chains"
];

export default function AddWeb3ToolsForm() {
  useAuthGuard()
  const [formData, setFormData] = useState<Web3ToolsRequest>({
    name: '',
    description: '',
    category: '',
    chains: [],
    imageUrl: '',
    website: '',
    twitter: '',
    instagram: '',
    discord: '',
    telegram: '',
    youtube: ''
  })
  const [selectedChains, setSelectedChains] = useState<string[]>([])

  const { isSubmitting, submitWeb3Tool } = useAddWeb3Tool()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      chains: [],
      imageUrl: '',
      website: '',
      twitter: '',
      instagram: '',
      discord: '',
      telegram: '',
      youtube: ''
    })
    setSelectedChains([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSubmit = {
      ...formData,
      chains: selectedChains
    }
    await submitWeb3Tool(dataToSubmit)
    resetForm()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Web3 Tool
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new Web3 Tool listing
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
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
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
                  required
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
                <label className="text-secondary text-sm font-medium" htmlFor="imageUrl">
                  Image URL *
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {isSubmitting ? 'Creating...' : 'Create Web3 Tool'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}