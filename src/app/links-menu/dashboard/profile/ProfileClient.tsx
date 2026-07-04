'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { toast } from 'sonner'
import { useProfileData } from '@/hooks/links/useProfileData'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function ProfileClient() {
  useAuthGuard()
  const router = useRouter()
  const { profile, loading, saving, error, handleUpdate } = useProfileData()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    avatar_url: '',
    cover_url: '',
    links: {
      github: '',
      twitter: '',
      tiktok: '',
      website: '',
      instagram: ''
    }
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        cover_url: profile.cover_url || '',
        links: {
          github: profile.links?.github || '',
          twitter: profile.links?.twitter || '',
          tiktok: profile.links?.tiktok || '',
          website: profile.links?.website || '',
          instagram: profile.links?.instagram || ''
        }
      })
    }
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('links.')) {
      const linkField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        links: { ...prev.links, [linkField]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await handleUpdate(formData)
    } catch (err: any) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10 mt-36">
        <Spinner variant="circle" size={40} className="text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-primary mb-2">Error</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:text-base text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Link Profile
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Manage your Link Profile data
        </p>
      </div>

      <div className="bg-[var(--fill-color)] border border-border-divider rounded-xl p-6 pb-1 shadow-lg w-full sm:w-5/6 mx-auto mb-8">
        <div className="mb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Username */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="username">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. johndoe"
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-secondary text-sm font-medium" htmlFor="bio">
                  Bio *
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Your short bio"
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2 text-center mt-4">
                <p className="text-xs sm:text-sm text-secondary uppercase tracking-widest font-semibold border-b border-border-divider pb-2">
                  Images
                </p>
              </div>

              {/* Avatar URL */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-secondary text-sm font-medium" htmlFor="avatar_url">
                  Avatar URL *
                </label>
                <input
                  type="url"
                  id="avatar_url"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cover URL */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-secondary text-sm font-medium" htmlFor="cover_url">
                  Cover URL *
                </label>
                <input
                  type="url"
                  id="cover_url"
                  name="cover_url"
                  value={formData.cover_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 md:col-span-2 text-center mt-4">
                <p className="text-xs sm:text-sm text-secondary uppercase tracking-widest font-semibold border-b border-border-divider pb-2">
                  Social Links
                </p>
              </div>

              {/* GitHub */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="links.github">
                  GitHub
                </label>
                <input
                  type="url"
                  id="links.github"
                  name="links.github"
                  value={formData.links.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Twitter */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="links.twitter">
                  Twitter (X)
                </label>
                <input
                  type="url"
                  id="links.twitter"
                  name="links.twitter"
                  value={formData.links.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* TikTok */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="links.tiktok">
                  TikTok
                </label>
                <input
                  type="url"
                  id="links.tiktok"
                  name="links.tiktok"
                  value={formData.links.tiktok}
                  onChange={handleChange}
                  placeholder="https://tiktok.com/@..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Instagram */}
              <div className="flex flex-col gap-2">
                <label className="text-secondary text-sm font-medium" htmlFor="links.instagram">
                  Instagram
                </label>
                <input
                  type="url"
                  id="links.instagram"
                  name="links.instagram"
                  value={formData.links.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-secondary text-sm font-medium" htmlFor="links.website">
                  Website
                </label>
                <input
                  type="url"
                  id="links.website"
                  name="links.website"
                  value={formData.links.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-border-divider">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}