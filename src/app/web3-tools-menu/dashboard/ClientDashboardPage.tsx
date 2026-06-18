'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useWeb3ToolsData } from '@/hooks/web3-tools/useWeb3ToolsData'
import StatCard from '@/components/airdrops/chart/StatCard'
import Web3ToolsCategoryChart from '@/components/web3-tools/Web3ToolsCategoryChart'
import Web3ToolsChainChart from '@/components/web3-tools/Web3ToolsChainChart'
import { FaBitcoin, FaLink } from 'react-icons/fa'
import { TbCategoryFilled } from "react-icons/tb"
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useWeb3ToolsData()

  const totalWeb3Tools = data.length
  
  const totalCategories = useMemo(() => {
    const catSet = new Set()
    data.forEach(item => {
      if (item.category) {
        catSet.add(item.category.trim())
      }
    })
    return catSet.size
  }, [data])

  const totalChains = useMemo(() => {
    const chainSet = new Set()
    data.forEach(item => {
      if (item.chains) {
        item.chains.forEach((chain: string) => chainSet.add(chain.trim()))
      }
    })
    return chainSet.size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Web3 Tools Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your Web3 Tools stats
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Web3 Tools"
          value={totalWeb3Tools}
          icon={<FaBitcoin />}
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<TbCategoryFilled />}
          loading={loading}
        />
        <StatCard
          title="Total Chain"
          value={totalChains}
          icon={<FaLink />}
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Web3ToolsCategoryChart data={data} />
        <Web3ToolsChainChart data={data} />
      </section>
    </div>
  )
}
