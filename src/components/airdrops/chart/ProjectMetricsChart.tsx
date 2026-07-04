import { useRef, useEffect, useState, useCallback } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend, Title)
Chart.defaults.color = '#9ca3af'

interface ProjectMetric {
  name: string
  funding: number
  backed: string
  income: number
  created_at?: string  
  ended_at?: string   
}

interface ProjectMetricsChartProps {
  data: ProjectMetric[]
  loading: boolean
  height?: number
}

export default function ProjectMetricsChart({ data, loading, height = 300 }: ProjectMetricsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)
  const projectDetailsRef = useRef<any[]>([])
  const itemsPerPage = 10

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getPaginationRange = useCallback(() => {
    const range: (number | string)[] = []
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) range.push(i)
    } else {
      range.push(1)
      if (currentPage > 3) range.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) range.push(i)
      if (currentPage < totalPages - 2) range.push('...')
      range.push(totalPages)
    }
    return range
  }, [currentPage, totalPages])

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }, [totalPages])

  useEffect(() => {
    projectDetailsRef.current = paginatedData.map(item => ({
      name: item.name,
      backers: item.backed,
      funding: item.funding,
      income: item.income,
      created_at: item.created_at,
      ended_at: item.ended_at,
      task: (item as any).task,
      supply: (item as any).supply,
      fdv: (item as any).fdv, 
      market_cap: (item as any).market_cap,
      vesting: (item as any).vesting,
      price: (item as any).price
    }))
  }, [paginatedData])

  const initializeChart = useCallback(() => {
    if (!chartRef.current || !paginatedData.length || isInitialized) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: paginatedData.map(item => item.name),
        datasets: [
          {
            label: 'Income (USD)',
            data: paginatedData.map(item => item.income),
            backgroundColor: 'rgba(79, 70, 229, 0.7)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                const project = projectDetailsRef.current[context[0].dataIndex]
                return project?.name || ''
              },
              label: function(context) {
                const project = projectDetailsRef.current[context.dataIndex]
                if (!project) return []
                
                const labels = [
                  `Income: $${project.income.toLocaleString()}`,
                  `Funding: $${project.funding.toLocaleString()}`,
                  `Backed: ${project.backers}`
                ]

                if (project.task) labels.push(`Task: ${project.task}`)
                if (project.supply) labels.push(`Supply: ${project.supply}`)
                if (project.fdv) labels.push(`FDV: ${project.fdv}`)
                if (project.market_cap) labels.push(`Market Cap: ${project.market_cap}`)
                if (project.vesting) labels.push(`Vesting: ${project.vesting}`)
                if (project.price) labels.push(`Listing Price: $${project.price}`)

                if (project.created_at) {
                  const createdDate = new Date(project.created_at)
                  const formattedCreated = `${createdDate.getDate().toString().padStart(2, '0')}/${(createdDate.getMonth() + 1).toString().padStart(2, '0')}/${createdDate.getFullYear()}`
                  labels.push(`Created: ${formattedCreated}`)
                }

                if (project.ended_at) {
                  const endedDate = new Date(project.ended_at)
                  const formattedEnded = `${endedDate.getDate().toString().padStart(2, '0')}/${(endedDate.getMonth() + 1).toString().padStart(2, '0')}/${endedDate.getFullYear()}`
                  labels.push(`Ended: ${formattedEnded}`)
                }

                return labels
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Income (USD)'
            },
            ticks: {
              callback: function(value) {
                const num = Number(value)
                if (num >= 1000000) {
                  return '$' + (num / 1000000).toFixed(1) + 'M'
                } else if (num >= 1000) {
                  return '$' + (num / 1000).toFixed(1) + 'K'
                }
                return '$' + num
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Projects'
            }
          }
        }
      }
    })

    setIsInitialized(true)
  }, [paginatedData, isInitialized])

  const updateChartData = useCallback(() => {
    if (!chartInstance.current || !paginatedData.length) return

    chartInstance.current.data.labels = paginatedData.map(item => item.name)
    chartInstance.current.data.datasets[0].data = paginatedData.map(item => item.income)
    chartInstance.current.update()
  }, [paginatedData])

  useEffect(() => {
    if (loading) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
        chartInstance.current = null
        setIsInitialized(false)
      }
      return
    }

    if (!isInitialized) {
      initializeChart()
    } else {
      updateChartData()
    }

    return () => {
    }
  }, [loading, paginatedData, isInitialized, initializeChart, updateChartData])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner variant="ellipsis" size={32} />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-full text-muted-foreground">
        No data available
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow" style={{ height: `${height}px` }}>
        <canvas ref={chartRef} />
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 pt-4 border-t border-border-divider">
          <Pagination className="w-full">
            <PaginationContent className="flex flex-wrap justify-center gap-1 w-full">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={cn("cursor-pointer", 
                    "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {getPaginationRange().map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis className="text-xs sm:text-base" />
                  ) : (
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(Number(page))}
                      className={cn("cursor-pointer", 
                        "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm transition-none",
                        currentPage === page
                         ? "text-primary hover-bg-accent border-[var(--border-divider)] shadow-sm"
                         : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-[var(--text-accent)]"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={cn("cursor-pointer", 
                    "px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm",
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="text-center text-xs text-muted-foreground mt-2 text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} projects
          </div>
        </div>
      )}
    </div>
  )
}