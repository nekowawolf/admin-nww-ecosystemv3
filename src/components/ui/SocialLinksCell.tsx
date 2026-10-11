'use client'

import { useState } from 'react'
import { FaDiscord, FaGithub, FaInstagram, FaTelegram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaSquareUpwork, FaXTwitter } from 'react-icons/fa6'
import { TbBrandFiverr } from 'react-icons/tb'
import { CgSmileNoMouth } from 'react-icons/cg'
import { SiFreelancer } from 'react-icons/si'

const socialIcons = {
  youtube: FaYoutube,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  discord: FaDiscord,
  telegram: FaTelegram,
  github: FaGithub,
  tiktok: FaTiktok,
  fiverr: TbBrandFiverr,
  upwork: FaSquareUpwork,
  peopleperhour: CgSmileNoMouth,
  freelancer: SiFreelancer
}

type SocialKey = keyof typeof socialIcons
type SocialLinks = Partial<Record<SocialKey, string>>

const socialOrder = Object.keys(socialIcons) as SocialKey[]

export function SocialLinksCell({ socials, platforms }: { socials?: SocialLinks; platforms?: SocialLinks }) {
  const [expanded, setExpanded] = useState(false)
  const links = socialOrder.flatMap(key => {
    const url = socials?.[key] || platforms?.[key]
    return typeof url === 'string' && url.trim() ? [{ key, url }] : []
  })

  return (
    <td className="px-6 py-2">
      <div className={`flex items-center gap-2 ${expanded ? 'flex-wrap' : 'flex-nowrap'}`}>
        {links.length ? (
          <>
            {links.slice(0, expanded ? links.length : 4).map(({ key, url }) => {
              const Icon = socialIcons[key]
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key === 'twitter' ? 'X (Twitter)' : key === 'peopleperhour' ? 'PeoplePerHour' : key}
                  title={key === 'twitter' ? 'X (Twitter)' : key === 'peopleperhour' ? 'PeoplePerHour' : key}
                  className="cursor-pointer text-blue-400 hover:text-blue-500 flex-shrink-0"
                >
                  <Icon size={16} />
                </a>
              )
            })}
            {links.length > 4 && (
              <button
                type="button"
                onClick={() => setExpanded(prev => !prev)}
                aria-expanded={expanded}
                className="text-xs text-blue-500 hover:underline flex-shrink-0 cursor-pointer px-1 py-1"
              >
                {expanded ? 'Less' : 'More'}
              </button>
            )}
          </>
        ) : (
          <span className="text-muted text-xs">N/A</span>
        )}
      </div>
    </td>
  )
}