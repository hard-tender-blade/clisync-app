import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { SessionWithClient, User } from '@/modules/shared/types/mainTypes'
import { Day } from '@/modules/shared/types/calendar'
import Link from 'next/link'
import generateDayInterval from '../../utils/generateDayInterval'
import { IoAdd } from 'react-icons/io5'
import CreateSessionModal from '../modals/createSession'

export default function DayView({
    day,
    children,
    user,
    openSessionId,
    noScroll,
    showTime,
    cellRightBorder,
    cellLeftBorder,
    onSessionClick,
}: {
    day: Day // day data
    user: User // user data
    onSessionClick?: (session: SessionWithClient) => void // callback when session is clicked
    openSessionId?: string // id of session to open, will open first session if not provided
    children?: React.ReactNode // optional title
    noScroll?: boolean // display whole component without scroll
    showTime?: boolean // show time on the left side (also padding for events)
    cellRightBorder?: boolean // show right border on cells
    cellLeftBorder?: boolean // show left border on cells
}) {
    // scroll to first session
    const el = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (noScroll) return
        if (!el.current) return
        if (day.sessions.length === 0) return
        const sessionToOpen =
            day.sessions.find((s) => s.id === openSessionId) || day.sessions[0]
        const offset =
            moment(sessionToOpen.start).get('hours') * 60 +
            moment(sessionToOpen.start).get('minutes')
        el.current.scrollTop = offset
        console.log('scrolling to', offset)
    })

    const [createSessionModal, setCreateSessionModal] = useState({
        open: false,
        hours: 7,
        date: day.date,
        user,
    })

    return (
        <div className="flex flex-col">
            {children}
            <CreateSessionModal
                requestClose={() =>
                    setCreateSessionModal({ ...createSessionModal, open: false })
                }
            />
            <div
                ref={el}
                className={`
                    relative border-2 border-l-0 border-r-0 border-solid border-base-200 
                    ${!noScroll && 'no-scrollbar h-[65vh] overflow-y-scroll'}
                `}
            >
                {/* hours on the left side and dividers */}
                <div
                    className={`
                        absolute left-0 z-10 flex w-full flex-col 
                        ${cellLeftBorder && 'border-l-[1px] border-solid border-base-200'}
                        ${cellRightBorder && 'border-r-[1px] border-solid border-base-200'}
                    `}
                >
                    {hours.map((hour, i) => {
                        return (
                            <div className="h-[60px]" key={i}>
                                <TimeDivider
                                    time={hour.toString()}
                                    showTime={showTime || false}
                                />
                                <div className="group flex h-full items-center justify-center">
                                    <div
                                        onClick={() => {
                                            setCreateSessionModal({
                                                open: true,
                                                date: day.date,
                                                hours: hour,
                                                user,
                                            })
                                        }}
                                        className="btn btn-sm hidden rounded-full group-hover:inline-flex"
                                    >
                                        <IoAdd />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {
                    // other google calendar events
                    day.googleCalendarEvents.map((event, i) => {
                        const offset =
                            moment(event.start.dateTime).get('hours') * 60 +
                            moment(event.start.dateTime).get('minutes') +
                            2 //2 is constant for better visualization

                        return (
                            <div
                                key={i}
                                className={`absolute left-0 z-10 w-full ${showTime ? 'pl-5' : 'px-[1px]'}`}
                                style={{
                                    top: `${offset}px`,
                                }}
                            >
                                <Link
                                    href={event.htmlLink}
                                    target="_blank"
                                    className="flex w-full flex-col text-ellipsis rounded-lg bg-base-300 p-2 px-3 text-sm"
                                    style={{
                                        height: `${moment(event.end.dateTime).diff(moment(event.start.dateTime), 'minutes')}px`,
                                    }}
                                >
                                    <p>
                                        {moment(event.start.dateTime).format('HH:mm')} -{' '}
                                        {moment(event.end.dateTime).format('HH:mm')}
                                    </p>
                                    <p className="truncate whitespace-nowrap">
                                        {event.summary}
                                    </p>
                                </Link>
                            </div>
                        )
                    })
                }

                {
                    // sessions on the day, each session is a div with calculated offset and absolute position
                    day.sessions.map((session, i) => {
                        const offset =
                            moment(session.start).get('hours') * 60 +
                            moment(session.start).get('minutes') +
                            2 //2 is constant for better visualization

                        const { start, end } = generateDayInterval(day.date)
                        const dayQueryParams = new URLSearchParams()
                        dayQueryParams.set('start', start.toISOString())
                        dayQueryParams.set('end', end.toISOString())
                        dayQueryParams.set('sessionId', session.id)

                        const dayWithSessionUrl = `/workspace/calendar/day/?${dayQueryParams.toString()}`

                        return (
                            <div
                                key={i}
                                className={`absolute left-0 z-20 w-full ${showTime ? 'pl-5' : 'px-[1px]'}`}
                                style={{
                                    top: `${offset}px`,
                                }}
                            >
                                {/* <SessionDetail
                                    session={session}
                                    dayWithSessionUrl={dayWithSessionUrl}
                                > */}
                                {onSessionClick ? (
                                    <button
                                        onClick={() => onSessionClick(session)}
                                        className="flex w-full flex-col text-ellipsis rounded-lg bg-primary p-2 px-3 text-sm text-base-100"
                                        style={{
                                            height: `${moment(session.end).diff(moment(session.start), 'minutes')}px`,
                                        }}
                                    >
                                        <p>
                                            {moment(session.start).format('HH:mm')} -{' '}
                                            {moment(session.end).format('HH:mm')}
                                        </p>
                                        <p className="truncate whitespace-nowrap">
                                            {session.client.name}
                                        </p>
                                    </button>
                                ) : (
                                    <Link
                                        href={dayWithSessionUrl}
                                        className="flex w-full flex-col text-ellipsis rounded-lg bg-primary p-2 px-3 text-sm text-base-100"
                                        style={{
                                            height: `${moment(session.end).diff(moment(session.start), 'minutes')}px`,
                                        }}
                                    >
                                        <p>
                                            {moment(session.start).format('HH:mm')} -{' '}
                                            {moment(session.end).format('HH:mm')}
                                        </p>
                                        <p className="truncate whitespace-nowrap">
                                            {session.client.name}
                                        </p>
                                    </Link>
                                )}
                                {/* </SessionDetail> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
]

const TimeDivider = ({ time, showTime }: { time: string; showTime: boolean }) => (
    <div className="divider divider-start relative m-0 h-1">
        {showTime && (
            <div className="absolute top-[1px] z-10 pr-1 text-xs">
                <span className="whitespace-nowrap opacity-30">
                    {time.padStart(2, '0')}
                </span>
            </div>
        )}
    </div>
)
