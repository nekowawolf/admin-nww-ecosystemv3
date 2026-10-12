import type { ReactNode } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function CreatorsDashboardLayout({ children }: { children: ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>
}