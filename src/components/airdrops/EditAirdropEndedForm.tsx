'use client'

import { useState } from 'react'
import { FaFreeCodeCamp } from "react-icons/fa";
import { useEditAirdrop } from '@/hooks/airdrop/useEditAirdropEnded'
import { useRouter } from 'next/navigation'
import { CustomDropdown } from '@/components/ui/CustomDropdown'


interface EditAirdropEndedFormProps {
  airdropData: any
  onSuccess?: () => void
  isEndedAirdrop?: boolean
}

export default function EditAirdropEndedForm({ airdropData, onSuccess }: EditAirdropEndedFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: airdropData?.name || '',
    task: airdropData?.task || '',
    link: airdropData?.link || '',
    level: airdropData?.level || '',
    status: 'ended',
    backed: airdropData?.backed || '',
    funds: airdropData?.funds || '',
    supply: airdropData?.supply || '',
    fdv: airdropData?.fdv || '',
    market_cap: airdropData?.market_cap || '',
    price: airdropData?.price?.toString() || '',
    vesting: airdropData?.vesting || '',
    usd_income: airdropData?.usd_income?.toString() || '',
    claim: airdropData?.link_claim || '',
    link_discord: airdropData?.link_discord || '',
    link_twitter: airdropData?.link_twitter || '',
    link_telegram: airdropData?.link_telegram || '',
    image_url: airdropData?.image_url || '',
    description: airdropData?.description || '',
    link_guide: airdropData?.link_guide || '',
  })

  const { isSubmitting, editAirdrop } = useEditAirdrop()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      price: Number(formData.price),
      usd_income: Number(formData.usd_income),
      link_claim: formData.claim,
      status: 'ended',
      link_discord: formData.link_discord,
      link_twitter: formData.link_twitter,
      link_telegram: formData.link_telegram,
      image_url: formData.image_url,
      description: formData.description,
      link_guide: formData.link_guide
    }

  const success = await editAirdrop(airdropData.id, payload)
    if (onSuccess) {
    onSuccess()
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Edit Ended Airdrop
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Update ended airdrop campaign information
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 card-color2 rounded-lg p-3 border border-border-divider">
              <FaFreeCodeCamp className="w-6 h-6 text-red-600" />
              <span className="text-sm font-medium text-primary">
                Ended Airdrop
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  required
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="task">
                  Task Type *
                </label>
                <CustomDropdown
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={(value) => handleDropdownChange('task', value)}
                  options={[
                    { value: 'daily', label: 'Daily' },
                    { value: 'testnet', label: 'Testnet' },
                    { value: 'game', label: 'Game' },
                    { value: 'social', label: 'Social' },
                    { value: 'depin', label: 'DePin' },
                    { value: 'retro', label: 'Retro' },
                    { value: 'stake', label: 'Stake' },
                    { value: 'hold', label: 'Hold' },
                    { value: 'node', label: 'Node' }
                  ]}
                  placeholder="Select Task Type"
                  required
                />
              </div>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="link">
                    Project Link *
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    required
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="image_url">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.png"
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter project description"
                  rows={4}
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="link_discord">
                    Discord Link
                  </label>
                  <input
                    type="url"
                    id="link_discord"
                    name="link_discord"
                    value={formData.link_discord}
                    onChange={handleInputChange}
                    placeholder="https://discord.gg/..."
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="link_twitter">
                    Twitter Link
                  </label>
                  <input
                    type="url"
                    id="link_twitter"
                    name="link_twitter"
                    value={formData.link_twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/..."
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="link_telegram">
                    Telegram Link
                  </label>
                  <input
                    type="url"
                    id="link_telegram"
                    name="link_telegram"
                    value={formData.link_telegram}
                    onChange={handleInputChange}
                    placeholder="https://t.me/..."
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="link_guide">
                    Guide Link
                  </label>
                  <input
                    type="url"
                    id="link_guide"
                    name="link_guide"
                    value={formData.link_guide}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="level">
                    Funding Level *
                  </label>
                  <CustomDropdown
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={(value) => handleDropdownChange('level', value)}
                    options={[
                      { value: 'easy', label: 'Low (N/A-5M>)' },
                      { value: 'medium', label: 'Mid (5M-20M>)' },
                      { value: 'hard', label: 'High (20M-50M>)' }
                    ]}
                    placeholder="Select Funding Level"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="status">
                    Status *
                  </label>
                  <CustomDropdown
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(value) => handleDropdownChange('status', value)}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'ended', label: 'Ended' }
                    ]}
                    required
                  />
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="backed">
                    Backed By *
                  </label>
                  <input
                    type="text"
                    id="backed"
                    name="backed"
                    value={formData.backed}
                    onChange={handleInputChange}
                    placeholder="e.g., HashKey Capital, ConsenSys"
                    required
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="funds">
                    Funds Raised *
                  </label>
                  <input
                    type="text"
                    id="funds"
                    name="funds"
                    value={formData.funds}
                    onChange={handleInputChange}
                    placeholder="e.g., 53.37M"
                    required
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="supply">
                    Total Supply *
                  </label>
                  <input
                    type="text"
                    id="supply"
                    name="supply"
                    value={formData.supply}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.00B"
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="fdv">
                    FDV *
                  </label>
                  <input
                    type="text"
                    id="fdv"
                    name="fdv"
                    value={formData.fdv}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.00B"
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="market_cap">
                    Market Cap *
                  </label>
                  <input
                    type="text"
                    id="market_cap"
                    name="market_cap"
                    value={formData.market_cap}
                    onChange={handleInputChange}
                    placeholder="e.g., 270M"
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="price">
                    Price *
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.01"
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="vesting">
                  Vesting *
                </label>
                <CustomDropdown
                  id="vesting"
                  name="vesting"
                  value={formData.vesting}
                  onChange={(value) => handleDropdownChange('vesting', value)}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ]}
                  placeholder="Select vesting option"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="usd_income">
                  USD income *
                </label>
                <input
                  type="text"
                  id="usd_income"
                  name="usd_income"
                  value={formData.usd_income}
                  onChange={handleInputChange}
                  placeholder="e.g., $100 usd"
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="claim">
                  Claim *
                </label>
                <input
                  type="text"
                  id="claim"
                  name="claim"
                  value={formData.claim}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Updating...
                  </>
                ) : (
                  'Update Airdrop'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}