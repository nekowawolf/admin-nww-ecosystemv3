'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useGithubReposData } from '@/hooks/github-repos/useGithubReposData'
import StatCard from '@/components/airdrops/chart/StatCard'
import GithubReposCategoryChart from '@/components/github-repos/GithubReposCategoryChart'
import { FaGithub, FaTags, FaCodeBranch } from 'react-icons/fa'
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useGithubReposData()

  const totalRepos = data.length
  
  const totalCategories = useMemo(() => {
    const catSet = new Set()
    data.forEach(item => {
      if (item.category) {
        catSet.add(item.category.trim())
      }
    })
    return catSet.size
  }, [data])

  const totalOwners = useMemo(() => {
    const ownerSet = new Set()
    data.forEach(item => {
      if (item.owner) {
        ownerSet.add(item.owner.trim())
      }
    })
    return ownerSet.size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          GitHub Repos Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your GitHub Repos stats
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Repos"
          value={totalRepos}
          icon={<FaGithub />}
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<FaTags />}
          loading={loading}
        />
        <StatCard
          title="Unique Owners"
          value={totalOwners}
          icon={<FaCodeBranch />}
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 gap-4">
        <GithubReposCategoryChart data={data} />
      </section>
    </div>
  )
}
