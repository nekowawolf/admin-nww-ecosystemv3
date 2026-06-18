'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Web3ToolsChainChart({ data }: { data: any[] }) {
  const chainCount = data.reduce((acc: any, curr: any) => {
    if (curr.chains && Array.isArray(curr.chains)) {
      curr.chains.forEach((chain: string) => {
        const trimmed = chain.trim()
        if (trimmed) acc[trimmed] = (acc[trimmed] || 0) + 1
      })
    }
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(chainCount),
    datasets: [
      {
        data: Object.values(chainCount),
        backgroundColor: [
          '#14b8a6', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#f43f5e', '#10b981', '#6366f1'
        ],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          padding: 20
        }
      }
    }
  }

  if (!data || data.length === 0 || Object.keys(chainCount).length === 0) {
    return (
      <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider h-80 flex items-center justify-center">
        <p className="text-secondary">No data available</p>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider h-80">
      <h3 className="text-lg font-semibold text-primary mb-4">Web3 Tools by Chain</h3>
      <div className="relative h-56">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}
