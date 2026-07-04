'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAirdropData } from '@/hooks/airdrop/useAirdropData'
import { useAirdropEndedData } from '@/hooks/airdrop/useAirdropEndedData'
import StatCard from '@/components/airdrops/chart/StatCard'
import BackerChart from '@/components/airdrops/chart/BackerChart'
import MonthlyAirdropChart from '@/components/airdrops/chart/MonthlyAirdropChart'
import ProjectMetricsChart from '@/components/airdrops/chart/ProjectMetricsChart'
import { Gift, TimerOff, DollarSign, Rocket, Users, BarChart3, TrendingUp, Filter, Calendar } from 'lucide-react'
import { useBackerData, useMonthlyAirdropData, useProjectMetrics } from '@/hooks/airdrop/useChartData'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { useState, useMemo, useRef, useEffect } from 'react'
import { IoIosArrowUp } from "react-icons/io"

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  required?: boolean
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full text-left bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between"
      >
        <span className={value ? "text-primary" : "text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoIosArrowUp 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-0' : 'transform rotate-180'
          }`}
        />
      </button>

      <div 
        id={id}
        className={`z-10 absolute top-full left-0 right-0 mt-1 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="py-2 text-sm text-primary" aria-labelledby={`${id}-button`}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`cursor-pointer block w-full text-left px-4 py-2 hover:hover-bg ${
                  value === option.value ? 'hover-bg-accent text-accent' : ''
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <input type="hidden" name={name} value={value} required={required} />
    </div>
  )
}

function LoadingText() {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Spinner variant="ellipsis" size={20} />
    </div>
  )
}

export default function ClientDashboardPage() {
  useAuthGuard()

  const { data: freeData, loading: loadingFree } = useAirdropData('free')
  const { data: paidData, loading: loadingPaid } = useAirdropData('paid')
  const { data: endedData, loading: loadingEnded } = useAirdropEndedData()
  const { data: backerData, loading: loadingBacker } = useBackerData()
  const { data: projectMetrics, loading: loadingMetrics } = useProjectMetrics()
  

  const [tempYear, setTempYear] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [showFilter, setShowFilter] = useState(false)
  const { data: monthlyData, loading: loadingMonthly } = useMonthlyAirdropData(selectedYear)

  const totalAllTime = useMemo(() => 
    (freeData?.length || 0) +
    (paidData?.length || 0) +
    (endedData?.length || 0),
    [freeData, paidData, endedData]
  )

  const totalEnded = useMemo(() => endedData?.length || 0, [endedData])
  const totalActive = useMemo(() => totalAllTime - totalEnded, [totalAllTime, totalEnded])

  const totalUsdIncome = useMemo(() => 
    [
      ...(freeData || []),
      ...(paidData || []),
      ...(endedData || []),
    ].reduce((sum, item) => sum + (item.usd_income || 0), 0),
    [freeData, paidData, endedData]
  )

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const currentYear = new Date().getFullYear()
  const yearOptions: DropdownOption[] = [
    { value: "", label: "All" },
    ...Array.from({ length: currentYear - 2022 }, (_, i) => {
      const year = currentYear - i
      return { value: year.toString(), label: year.toString() }
    })
  ]

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Dashboard Analytics
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your project stats
        </p>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Airdrops"
          value={loadingFree || loadingPaid || loadingEnded ? <LoadingText /> : totalAllTime}
          icon={<Gift />}
        />
        <StatCard
          title="Active Airdrops"
          value={loadingFree || loadingPaid || loadingEnded ? <LoadingText /> : totalActive}
          icon={<Rocket />}
        />
        <StatCard
          title="Ended Airdrops"
          value={loadingEnded ? <LoadingText /> : totalEnded}
          icon={<TimerOff />}
        />
        <StatCard
          title="Total USD Income"
          value={loadingFree || loadingPaid || loadingEnded ? <LoadingText /> : `$${totalUsdIncome.toLocaleString()}`}
          icon={<DollarSign />}
        />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Backer Chart */}
        <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-primary">Backer Statistics</h3>
          </div>
          <div className="h-64 md:h-72">
            <BackerChart 
              data={backerData} 
              loading={loadingBacker} 
              height={256}
              title=""
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Shows the most active investors based on number of projects backed
          </p>
        </div>

        {/* Monthly Airdrop Chart */}
        <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-green-500" />
              <h3 className="text-lg font-semibold text-primary">Monthly Airdrop Activity</h3>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="cursor-pointer p-2 rounded-lg bg-[var(--hover-bg)] border border-border-divider hover:bg-[var(--button-hover)] flex items-center gap-1"
                title="Filter by year"
              >
                <Filter size={16} />
                <IoIosArrowUp 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showFilter ? 'transform rotate-0' : 'transform rotate-180'
                  }`}
                />
              </button>

              {showFilter && (
                <div className="absolute top-10 right-0 z-20 bg-[var(--dropdown-bg)] border border-border-divider rounded-lg p-4 shadow-lg w-64">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} />
                    <h4 className="font-medium">Filter by Year</h4>
                  </div>

                  {/* Gunakan tempYear untuk dropdown */}
                  <CustomDropdown
                    id="year-filter"
                    name="year"
                    value={tempYear}
                    onChange={(val) => setTempYear(val)}
                    options={yearOptions}
                    placeholder="Select year"
                  />

                  <div className="flex gap-2 pt-4 border-t border-border-divider mt-4">
                    <button
                      onClick={() => {
                        const year = tempYear ? parseInt(tempYear) : null
                        setSelectedYear(year)
                        handleYearChange(year)
                        setShowFilter(false)
                      }}
                      className="cursor-pointer flex-1 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => {
                        setTempYear("")
                        setSelectedYear(null)
                        handleYearChange(null)
                        setShowFilter(false)
                      }}
                      className="cursor-pointer flex-1 py-2 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-64 md:h-72">
            <MonthlyAirdropChart 
              data={monthlyData} 
              loading={loadingMonthly} 
              height={256}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {selectedYear 
              ? `Showing data for year ${selectedYear}` 
              : 'Showing all data (use filter to select specific year)'}
          </p>
        </div>
      </section>

      {/* Funding & Income Chart */}
      <section className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-purple-500" />
          <h3 className="text-lg font-semibold text-primary">List Projects by Funding & Income</h3>
        </div>
        <div className="h-[30rem]"> 
          <ProjectMetricsChart 
            data={projectMetrics} 
            loading={loadingMetrics} 
            height={400}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Shows top projects by income with funding details and backer count
        </p>
      </section>

      {/* Completed Airdrops */}
      <section className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
        <h3 className="text-lg font-semibold text-primary mb-4">Completed Airdrops</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {endedData && endedData.slice(0, 5).map((item, index) => (
            <div key={index} className="p-3 rounded-lg border border-border-divider">
              <div className="flex justify-between items-center">
                <span className="font-bold">{item.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Backed by: {item.backed}</p>
              <p className="text-sm text-muted-foreground mt-1">Funding: {item.funds}</p>
              <p className="text-sm text-muted-foreground mt-1">Ended: {item.ended_at ? formatDate(item.ended_at) : 'N/A'}</p>
            </div>
          ))}
          {(!endedData || endedData.length === 0) && (
            <div className="text-center text-muted-foreground py-4">
              No Completed Airdrops
            </div>
          )}
        </div>
      </section>
    </div>
  )
}