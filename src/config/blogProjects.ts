export const blogProjects = {
  airdrop: { label: 'Airdrop', menu: 'airdrop-menu', endpoint: 'airdropblog' },
  'crypto-community': { label: 'Crypto Community', menu: 'community-menu', endpoint: 'cryptocommunityblog' },
  'web3-tools': { label: 'Web3 Tools', menu: 'web3-tools-menu', endpoint: 'web3toolsblog' },
  'ai-tools': { label: 'AI Tools', menu: 'ai-tools-menu', endpoint: 'aitoolsblog' },
  net: { label: 'NET', menu: 'net-menu', endpoint: 'netblog' },
  creators: { label: 'Creators', menu: 'creators-menu', endpoint: 'creatorsblog' },
  guild: { label: 'Guild', menu: 'guild-menu', endpoint: 'guildblog' },
  'github-repos': { label: 'GitHub', menu: 'github-repos-menu', endpoint: 'githubblog' },
} as const

export type BlogProject = keyof typeof blogProjects

export function getBlogDashboardRoute(project: BlogProject) {
  return `/${blogProjects[project].menu}/dashboard`
}