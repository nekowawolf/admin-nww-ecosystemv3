"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useState } from 'react'
import { FiUsers, FiLink, FiImage } from 'react-icons/fi'
import { useAddCommunity } from '@/hooks/community/useAddCommunity'
import { CommunityRequest } from '@/types/community'
import { CustomDropdown } from '@/components/ui/CustomDropdown'


export default function AddCommunityForm() {
  useAuthGuard()
  const [formData, setFormData] = useState<CommunityRequest>({
    name: '',
    platforms: '',
    category: '',
    img_url: '',
    link_url: ''
  })

  const { isSubmitting, submitCommunity } = useAddCommunity()

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
      platforms: '',
      category: '',
      img_url: '',
      link_url: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await submitCommunity(formData)
    resetForm()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Community
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new crypto community listing
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Community Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Community Name *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter community name"
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Platform */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="platforms">
                  Platform *
                </label>
                <CustomDropdown
                  id="platforms"
                  name="platforms"
                  value={formData.platforms}
                  onChange={(value) => handleDropdownChange('platforms', value)}
                  options={[
                    { value: 'telegram', label: 'Telegram' },
                    { value: 'discord', label: 'Discord' },
                    { value: 'facebook', label: 'Facebook' },
                    { value: 'reddit', label: 'Reddit' }
                  ]}
                  placeholder="Select Platform"
                  required
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
                    { value: 'Airdrop', label: 'Airdrop' },
                    { value: 'Trading', label: 'Trading' },
                    { value: 'NFT', label: 'NFT' },
                    { value: 'Developers', label: 'Developers' },
                    { value: 'Forum', label: 'Forum' },
                    { value: 'Web3 Jobs', label: 'Web3 Jobs' },
                    { value: 'Meme Coin', label: 'Meme Coin' }
                  ]}
                  placeholder="Select Category"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="img_url">
                  Image URL *
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="img_url"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {formData.img_url && (
                  <div className="mt-2">
                    <p className="text-xs text-secondary mb-2">Image Preview:</p>
                    <img 
                      src={formData.img_url} 
                      alt="Preview" 
                      className="w-20 h-20 object-cover rounded-lg border border-border-divider"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Link URL */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="link_url">
                  Community Link *
                </label>
                <div className="relative">
                  <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    type="url"
                    id="link_url"
                    name="link_url"
                    value={formData.link_url}
                    onChange={handleInputChange}
                    placeholder="https://t.me/communityname or https://discord.gg/community"
                    required
                    className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Community'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}