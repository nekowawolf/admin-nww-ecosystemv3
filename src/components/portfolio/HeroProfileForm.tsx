'use client'

import { useState } from 'react'
import { HeroProfile } from '@/types/portfolio'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'
import { FiUser, FiFileText } from 'react-icons/fi'

interface HeroProfileFormProps {
  data: HeroProfile
  onSubmit: (data: HeroProfile) => Promise<void>
  isSubmitting: boolean
}

export default function HeroProfileForm({ data, onSubmit, isSubmitting }: HeroProfileFormProps) {
  const [formData, setFormData] = useState<HeroProfile>(data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <div className="bg-[var(--fill-color)] border border-border-color rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-primary mb-4">Hero Profile</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Name *</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-2 text-primary"
              placeholder="Your name"
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Summary *</label>
          <div className="relative">
            <FiFileText className="absolute left-3 top-3 text-muted w-4 h-4" />
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={3}
              className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-2 text-primary"
              placeholder="Professional summary"
            />
          </div>
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Avatar URL *</label>
          <input
            type="url"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            required
            className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
            placeholder="https://example.com/avatar.jpg"
          />
          {formData.avatar_url && (
            <div className="mt-2">
              <img 
                src={formData.avatar_url} 
                alt="Avatar Preview" 
                className="w-16 h-16 rounded-full object-cover border border-border-divider"
              />
            </div>
          )}
        </div>

        {/* CV URL */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">CV URL</label>
          <input
            type="url"
            name="cv_url"
            value={formData.cv_url}
            onChange={handleChange}
            className="w-full card-color2 border border-border-divider rounded-lg px-4 py-2 text-primary"
            placeholder="https://example.com/cv.pdf"
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">GitHub</label>
            <div className="relative">
              <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-2 text-primary"
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Twitter</label>
            <div className="relative">
              <FaXTwitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-2 text-primary"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">LinkedIn</label>
            <div className="relative">
              <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-2 text-primary"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Email *</label>
            <div className="relative">
              <SiGmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full card-color2 border border-border-divider rounded-lg pl-10 pr-4 py-2 text-primary"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border-divider">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Updating...
              </>
            ) : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}