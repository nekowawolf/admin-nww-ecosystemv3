'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAIToolsData } from '@/hooks/ai-tools/useAIToolsData'
import StatCard from '@/components/airdrops/chart/StatCard'
import AIToolsCategoryChart from '@/components/ai-tools/AIToolsCategoryChart'
import { FaRobot, FaTags } from 'react-icons/fa'
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useAIToolsData()

  const totalAITools = data.length
  
  const totalCategories = useMemo(() => {
    const catSet = new Set()
    data.forEach(item => {
      if (item.categories) {
        item.categories.forEach((cat: string) => catSet.add(cat.trim()))
      }
    })
    return catSet.size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          AI Tools Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your AI Tools stats
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total AI"
          value={totalAITools}
          icon={<FaRobot />}
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<FaTags />}
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 gap-4">
        <AIToolsCategoryChart data={data} />
      </section>
    </div>
  )
}
