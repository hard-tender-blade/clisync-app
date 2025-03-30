import React from 'react'
import { useMonthCalendar } from '../context/monthCalendarContext'
import { Day } from '@/modules/shared/types/calendar'
import moment from 'moment'
import MOB from '@/app/components/mob'
import PC from '@/app/components/pc'

export default function DayCell({ day, i, days }: { day: Day; i: number; days: any[] }) {
    const { selectedDay, setSelectedDay } = useMonthCalendar()

    return (
        <div
            onClick={() => setSelectedDay(day)}
            key={day.date.format('MM.DD')}
            className="h-20 cursor-pointer"
        >
            <div
                className={`flex h-full w-full flex-col items-center border border-solid bg-white p-2 hover:bg-base-200 md:items-end
                    ${selectedDay?.date.toISOString() === day.date.toISOString() ? 'border-primary' : 'border-b-white border-l-white border-r-white border-t-base-200 hover:border-b-base-200 hover:border-l-base-200 hover:border-r-base-200 hover:border-t-base-200'} 
                `}
            >
                <p
                    className={`
                        text-end
                        ${day.date.isSame(moment(), 'day') && 'flex h-6 w-6 items-center justify-center rounded-full bg-primary p-3 text-white'}
                    `}
                >
                    {day.date.format('D')}
                </p>

                {day.sessions.length > 0 && (
                    <>
                        <PC>
                            <p className="text-end text-sm opacity-60">
                                {day.sessions.length}{' '}
                                {day.sessions.length === 1 ? 'meeting' : 'meetings'}
                            </p>
                        </PC>
                        <MOB>
                            <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        </MOB>
                    </>
                )}
                {day.googleCalendarEvents.length > 0 && (
                    <p className="text-end text-sm opacity-60">
                        {day.googleCalendarEvents.filter((event) => event.summary.split(" ")[0] === "Session").length}{' '}
                        {day.googleCalendarEvents.length === 1
                            ? 'other event'
                            : 'other events'}
                    </p>
                )}
            </div>
        </div>
    )
}
