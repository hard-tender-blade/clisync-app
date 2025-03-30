'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import WorkspaceSidebar from './components/sidebar/WorkspaceSidebar'
import { queryClient } from '@/modules/client/queryClient'

export default function WorkspaceThemeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div id="theme" data-theme={'light'}>
            <QueryClientProvider client={queryClient}>
                <WorkspaceSidebar>{children}</WorkspaceSidebar>
            </QueryClientProvider>
        </div>
    )
}
