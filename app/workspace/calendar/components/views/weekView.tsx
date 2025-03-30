import React, { useEffect, useRef } from 'react'
import DayView from './dayView'
import moment from 'moment'
import { Session, User } from '@/modules/shared/types/mainTypes'
import { Day } from '@/modules/shared/types/calendar'

export default function WeekView({ days, user }: { days: Day[]; user: User }) {
    // scroll to first session
    const el = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!el.current) return
        let firstSession: Session | null = null

        // find first session for whole week
        for (let i = 0; i < days.length; i++) {
            if (days[i].sessions.length < 1) continue
            if (!firstSession) {
                firstSession = days[i].sessions[0]
                continue
            }
            if (moment(days[i].sessions[0].start).isBefore(firstSession.start))
                firstSession = days[i].sessions[0]
        }

        // scroll to first session
        if (!firstSession) return
        const offset =
            moment(firstSession.start).get('hours') * 60 +
            moment(firstSession.start).get('minutes') -
            12 // subtract 2px for better view
        el.current.scrollTop = offset
    })

    return (
        <div className="">
            <div className="left-0 top-0 grid w-full grid-cols-7">
                {days.map((day) => {
                    return (
                        <div
                            key={day.date.format('MM.DD')}
                            className="border-[1px] border-t-0 border-solid border-base-200 pb-1 text-center last:border-r-0"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <p>{day.date.format('D')}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div ref={el} className="no-scrollbar flex h-[70vh] overflow-y-scroll">
                <div className="grid w-full grid-cols-7">
                    {days.map((day, i) => {
                        return (
                            <div
                                key={day.date.format('MM.DD')}
                                //   onClick={() => handleSelectDay(day)}
                                className={'flex h-full flex-col '}
                            >
                                <DayView
                                    day={day}
                                    user={user}
                                    showTime={i === 0}
                                    cellLeftBorder={i != 0}
                                    cellRightBorder={i != 6}
                                    noScroll
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
