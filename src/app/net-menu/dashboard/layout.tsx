import type { ReactNode } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function NetDashboardLayout({ children }: { children: ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>
}