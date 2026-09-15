"use client"

import type { ReactNode } from 'react'
import { useState } from 'react'
import DashboardSidebar from '@/components/layouts/DashboardSidebar'
import DashboardHeader from '@/components/layouts/DashboardHeader'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen body-color text-primary flex">
            <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 md:ml-64">
                <DashboardHeader onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
                <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
            </div>
        </div>
    )
}