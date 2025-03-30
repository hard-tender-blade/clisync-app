import React from 'react'
import DayView from './dayView'
import MonthsGrids from './monthsGrid'
import { useMonthCalendar } from '../context/monthCalendarContext'
import EditorWrapper from './editor'

export default function MonthViewPC() {
    const { mode } = useMonthCalendar()

    return (
        <div className="flex h-full w-full">
            <div className={'w-3/12 border-r border-solid border-base-200'}>
                <DayView />
            </div>

            <div
                className={'flex w-9/12 flex-col overflow-hidden'}
                style={{
                    height: 'calc(100vh - 4rem - 1px)',
                }}
            >
                {/* <div className={mode === 'month' ? 'h-full w-full' : 'hidden'}>
                    <MonthsGrids />
                </div>

                <div className={mode === 'editor' ? 'h-full w-full' : 'hidden'}>
                    aa
                    <Editor />
                </div> */}

                {mode === 'month' && <MonthsGrids />}
                {mode === 'editor' && <EditorWrapper />}
                {/* <div className={mode === 'editor' ? '' : 'hidden'}>
                    <Editor3 />
                </div> */}
            </div>
        </div>
    )
}
