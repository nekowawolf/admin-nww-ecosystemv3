'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useCommunityData } from '@/hooks/community/useCommunityData'
import StatCard from '@/components/airdrops/chart/StatCard'
import CommunityCategoryChart from '@/components/community/CommunityCategoryChart'
import CommunityPlatformChart from '@/components/community/CommunityPlatformChart'
import { FaLayerGroup } from 'react-icons/fa'
import { TbCategoryFilled } from "react-icons/tb"
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useCommunityData()

  const totalCommunities = data.length
  
  const totalCategories = useMemo(() => {
    return new Set(data.map(item => item.category).filter(Boolean)).size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Dashboard Analytics
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your community stats
        </p>
      </div>

      {/* Community Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Communities"
          value={totalCommunities}
          icon={<FaLayerGroup />}
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<TbCategoryFilled />}
          loading={loading}
        />
      </section>

      {/* Community Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CommunityCategoryChart data={data} />
        <CommunityPlatformChart data={data} />
      </section>
    </div>
  )
}