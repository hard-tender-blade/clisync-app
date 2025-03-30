import React from 'react'
import { useMonthCalendar } from '../context/monthCalendarContext'
import moment from 'moment'

export default function ToolBar() {
    const { mode, setMode, goToToday, selectedDay, handleClickMonthView } =
        useMonthCalendar()

    return (
        <div className="flex items-center gap-3 border-b border-solid border-base-200 p-2">
            <div className="join">
                <button
                    onClick={handleClickMonthView}
                    className={`btn join-item ${mode === 'month' ? 'disabled btn-primary' : ''}`}
                >
                    Month
                </button>
                <button
                    onClick={() => setMode('editor')}
                    className={`btn join-item ${mode === 'editor' ? 'disabled btn-primary' : ''}`}
                >
                    Day
                </button>
            </div>
            <button
                onClick={goToToday}
                className={`btn join-item ${selectedDay?.date.isSame(moment(), 'day') && 'btn-primary'}`}
            >
                Today
            </button>
        </div>
    )
}
