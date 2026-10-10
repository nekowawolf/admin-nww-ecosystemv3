"use client"

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useCallback, useState } from 'react'
import { FiDollarSign, FiGift } from 'react-icons/fi'
import { useAddAirdrop } from '@/hooks/airdrop/useAddAirdrop'
import { AirdropFormData } from '@/types/airdrop'
import { CustomDropdown } from '@/components/ui/CustomDropdown'
import { validateUrl } from '@/utils/urlValidation'
import { toast } from 'sonner'
import { getAirdrops } from '@/services/airdrop/airdropService'
import { ValidatedUrlInput } from '@/components/ui/ValidatedUrlInput'


export default function AddAirdropForm() {
  useAuthGuard()
  const [activeTab, setActiveTab] = useState<'free' | 'paid'>('free')
  const [formData, setFormData] = useState<AirdropFormData>({
    name: '',
    task: '',
    website: '',
    level: '',
    status: 'active',
    backed: '',
    funds: '',
    supply: '',
    fdv: '',
    market_cap: '',
    price: 0,
    is_vesting: false,
    usd_income: 0,
    claim_url: '',
    discord: '',
    twitter: '',
    telegram: '',
    image_url: '',
    description: '',
    guide_url: '',
    is_paid: false,
  })

  const { isSubmitting, submitAirdrop } = useAddAirdrop()
  const [urlExists, setUrlExists] = useState<boolean | null>(null)
  const [addedByName, setAddedByName] = useState('')
  const [addedByUrl, setAddedByUrl] = useState('')

  const fetchAirdropUrls = useCallback(async () => {
    const airdrops = await getAirdrops()
    return airdrops.map((airdrop) => airdrop.website).filter(Boolean)
  }, [])

  const handleUrlValidationChange = useCallback((exists: boolean | null) => {
    setUrlExists(exists)
  }, [])

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
      [name]: name === 'is_vesting' ? value === 'true' : value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      task: '',
      website: '',
      level: '',
      status: 'active',
      backed: '',
      funds: '',
      supply: '',
      fdv: '',
      market_cap: '',
      price: 0,
      is_vesting: false,
      usd_income: 0,
      claim_url: '',
      discord: '',
      twitter: '',
      telegram: '',
      image_url: '',
      description: '',
      guide_url: '',
      is_paid: false,
    })
    setUrlExists(null)
    setAddedByName('')
    setAddedByUrl('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
    if (!formData.name) { toast.error('Please fill out Project Name'); return; }
    if (!formData.description) { toast.error('Please fill out Description'); return; }
    if (!formData.website) { toast.error('Please fill out Project Link'); return; }
    if (urlExists === true) { toast.error('This website is already listed.'); return; }
    if (!validateUrl(formData.website, 'website')) { toast.error('Invalid Project Link format'); return; }
    if (addedByUrl && !validateUrl(addedByUrl, 'website')) { toast.error('Invalid Added By Link format'); return; }
    if (formData.discord && !validateUrl(formData.discord, 'discord')) { toast.error('Invalid Discord URL format'); return; }
    if (formData.telegram && !validateUrl(formData.telegram, 'telegram')) { toast.error('Invalid Telegram URL format'); return; }
    if (formData.twitter && !validateUrl(formData.twitter, 'twitter')) { toast.error('Invalid Twitter URL format'); return; }


    const payload = {
      ...formData,
      price: Number(formData.price),
      usd_income: Number(formData.usd_income),
      is_vesting: formData.is_vesting,
      claim_url: formData.claim_url,
      discord: formData.discord,
      twitter: formData.twitter,
      telegram: formData.telegram,
      image_url: formData.image_url,
      description: formData.description,
      guide_url: formData.guide_url,
      added_by: {
        name: addedByName || 'nekowawolf',
        url: addedByUrl || (addedByName ? '' : 'https://nekowawolf.xyz')
      }
    }

    const success = await submitAirdrop(payload, activeTab)
    if (success) resetForm()
  }

  return (
    <div className="space-y-12 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Airdrop
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new list airdrop campaign
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <div className="grid grid-cols-2 card-color2 rounded-lg p-1 mb-6 border border-border-divider">
            <button
              className={`flex cursor-pointer items-center justify-center gap-2 py-2 px-4 font-medium text-sm rounded-md ${
                activeTab === 'free'
                  ? 'bg-blue-600 text-white'
                  : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('free')}
            >
              <FiGift className="w-4 h-4" />
              Free Airdrop
            </button>
            <button
              className={`flex cursor-pointer items-center justify-center gap-2 py-2 px-4 font-medium text-sm rounded-md ${
                activeTab === 'paid'
                  ? 'bg-blue-600 text-white'
                  : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('paid')}
            >
              <FiDollarSign className="w-4 h-4" />
              Paid Airdrop
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    options={activeTab === 'free' ? [
                      { value: 'daily', label: 'Daily' },
                      { value: 'testnet', label: 'Testnet' },
                      { value: 'game', label: 'Game' },
                      { value: 'social', label: 'Social' },
                      { value: 'depin', label: 'DePin' }
                    ] : [
                      { value: 'retro', label: 'Retro' },
                      { value: 'stake', label: 'Stake' },
                      { value: 'hold', label: 'Hold' },
                      { value: 'node', label: 'Node' }
                    ]}
                    placeholder="Select Task Type"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ValidatedUrlInput
                  label="Project Link *"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  fetchUrls={fetchAirdropUrls}
                  onValidationChange={handleUrlValidationChange}
                  errorMessage="This airdrop website is already listed."
                  successMessage="This airdrop website is not listed yet."
                />
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="discord">
                    Discord Link
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
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="twitter">
                    Twitter Link
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
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="telegram">
                    Telegram Link
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
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="guide_url">
                    Guide Link
                  </label>
                  <input
                    type="url"
                    id="guide_url"
                    name="guide_url"
                    value={formData.guide_url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="vesting">
                    Vesting *
                  </label>
                  <CustomDropdown
                    id="vesting"
                    name="is_vesting"
                    value={formData.is_vesting ? 'true' : 'false'}
                    onChange={(value) => handleDropdownChange('is_vesting', value)}
                    options={[
                      { value: 'true', label: 'Yes' },
                      { value: 'false', label: 'No' }
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
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="claim_url">
                  Claim *
                </label>
                <input
                  type="text"
                  id="claim_url"
                  name="claim_url"
                  value={formData.claim_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="addedByName">
                    Name (added by)
                  </label>
                  <input
                    type="text"
                    id="addedByName"
                    value={addedByName}
                    onChange={(event) => setAddedByName(event.target.value)}
                    placeholder="Your name or username"
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-secondary text-sm font-medium" htmlFor="addedByUrl">
                    Link (optional)
                  </label>
                  <input
                    type="url"
                    id="addedByUrl"
                    value={addedByUrl}
                    onChange={(event) => setAddedByUrl(event.target.value)}
                    placeholder="https://..."
                    className="card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-600/80 focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-border-divider">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 cursor-pointer rounded-lg text-secondary border border-border-divider hover:bg-button-hover text-sm font-medium"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Creating...
                    </>
                  ) : (
                    `Create ${activeTab === 'free' ? 'Free' : 'Paid'} Airdrop`
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