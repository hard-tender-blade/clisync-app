'use client'
import React from 'react'
import ToolBar from './components/toolBar'
import MonthViewPC from './components/monthViewPC'
import { MonthCalendarProvider } from './context/monthCalenderProvider'
import PC from '@/app/components/pc'
import MOB from '@/app/components/mob'
import MonthViewMOB from './components/monthViewMOB'

export default function Content() {
    return (
        <MonthCalendarProvider>
            <PC>
                <div className="flex h-screen w-full flex-col">
                    <ToolBar />
                    <MonthViewPC />
                </div>
            </PC>
            <MOB>
                <div
                    className=" w-screen"
                    style={{
                        height: 'calc(100vh - 4rem)',
                    }}
                >
                    <MonthViewMOB />
                </div>
            </MOB>
        </MonthCalendarProvider>
    )
}
