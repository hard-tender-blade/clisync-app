import React, { useEffect, useRef } from 'react'
import { useMonthCalendar } from '../context/monthCalendarContext'
import moment from 'moment'
import { Session } from '@/modules/shared/types/mainTypes'
import Separator from '@/app/components/separator'

export default function DayTimeLine() {
    const { selectedDay } = useMonthCalendar()

    // scroll to first session or now
    const el = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!el.current || !selectedDay) return
        let firstSession: Session | null = null

        // find first session for whole day
        for (let i = 0; i < selectedDay?.sessions.length; i++) {
            if (!firstSession) {
                firstSession = selectedDay?.sessions[i]
                continue
            }
            if (moment(selectedDay?.sessions[i].start).isBefore(firstSession.start))
                firstSession = selectedDay?.sessions[i]
        }

        // scroll to first session
        if (firstSession) {
            const offset =
                moment(firstSession.start).get('hours') * 60 +
                moment(firstSession.start).get('minutes') -
                12 // subtract 2px for better view
            el.current.scrollTop = offset
            return
        }

        // scroll to now middle of the screen
        const now = moment()
        const nowOffset = now.get('hours') * 60 + now.get('minutes') - 12

        el.current.scrollTop = nowOffset
    })

    return (
        <div
            ref={el}
            className="no-scrollbar relative flex h-full w-full overflow-scroll border-t border-solid border-base-200"
        >
            <TimeLine />
            <OtherEvents />
            <Sessions />
            <NowLine />
        </div>
    )
}

const Sessions = () => {
    const { selectedDay, handleCLickOnSession } = useMonthCalendar()

    return (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col pl-6 pr-2">
            {selectedDay?.sessions.map((session, i) => {
                const start = moment(session.start)
                const end = moment(session.end)

                const top = start.get('hours') * 60 + start.get('minutes') + 2 //2 is constant for better visualization

                const height = end.diff(start, 'minutes')

                return (
                    <button
                        key={session.id}
                        className="absolute w-64"
                        style={{
                            top: `${top}px`,
                        }}
                        onClick={() => handleCLickOnSession(session)}
                    >
                        <div
                            className="w-full rounded-md bg-primary p-1 px-2 text-white"
                            style={{
                                height: `${height}px`,
                            }}
                        >
                            <p>{session.client.name}</p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

const NowLine = () => {
    const { selectedDay } = useMonthCalendar()
    const now = moment()

    if (!selectedDay?.date.isSame(now, 'day')) return null

    const top = now.get('hours') * 60 + now.get('minutes')

    return (
        <div
            className="absolute left-0 top-0 flex w-full justify-end border-t-2 border-solid border-red pr-1 text-xs font-bold uppercase text-red"
            style={{ top: `${top}px` }}
        >
            Now
        </div>
    )
}

//todo
const OtherEvents = () => {
    const { selectedDay } = useMonthCalendar()

    return (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col pl-6">
            {selectedDay?.googleCalendarEvents.map((event, i) => {
                if (event.summary.split(" ")[0] == "Session") return <></>

                const start = moment(event.start.dateTime)
                const end = moment(event.end.dateTime)

                const top = start.get('hours') * 60 + end.get('minutes') + 2 //2 is constant for better visualization

                const height = end.diff(start, 'minutes')

                return (
                    <div
                        key={event.id}
                        className="absolute w-64"
                        style={{
                            top: `${top}px`,
                            height: `${height}px`,
                        }}
                    >
                        <div className="rounded-md h-full w-full bg-base-300 p-1 px-2">
                            {event.summary}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const TimeLine = () => {
    return (
        <div className="absolute left-0 top-0 flex w-full flex-col">
            {Array.from({ length: 24 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className="flex h-[60px] border-b border-solid border-base-200 p-1"
                    >
                        <span className="text-xs opacity-40">
                            {i.toString().padStart(2, '0')}
                        </span>
                    </div>
                )
            })}
            <Separator size="md" />
        </div>
    )
}
