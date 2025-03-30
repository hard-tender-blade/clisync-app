import React, { useState } from 'react'
import { useMonthCalendar } from '../context/monthCalendarContext'
import DayTimeLine from './dayTimeLine'
import { IoAdd } from 'react-icons/io5'
import CreateSessionModal from '../../components/modals/createSession'
import moment from 'moment'

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export default function DayView() {
    const { selectedDay } = useMonthCalendar()
    const [showCreateSessionModal, setShowCreateSessionModal] = useState(false)

    return (
        <div className="flex h-full w-full flex-col ">
            {showCreateSessionModal && (
                <CreateSessionModal
                    requestClose={() => setShowCreateSessionModal(false)}
                />
            )}
            <div className="flex h-14 items-center justify-between px-3">
                {selectedDay ? (
                    <>
                        <p className="flex h-full items-center justify-center font-bold opacity-70">
                            {weekdays[selectedDay.date.weekday()]},{' '}
                            {selectedDay.date.format('MM.DD')}{' '}
                            {selectedDay.date.isSame(moment(), 'day') && '| Today'}
                        </p>
                        <button
                            onClick={() => {
                                setShowCreateSessionModal(true)
                                console.log('clicked')
                            }}
                            className="btn btn-sm rounded-full"
                        >
                            <IoAdd className="h-4 w-4 scale-125" />
                        </button>
                    </>
                ) : (
                    <div className="skeleton mt-3 h-12 w-full rounded-md"></div>
                )}
            </div>

            {selectedDay ? (
                <DayTimeLine />
            ) : (
                <div className="flex flex-col gap-3 p-3">
                    <div className="skeleton h-20 w-full rounded-md"></div>
                    <div className="skeleton h-20 w-full rounded-md"></div>
                    <div className="skeleton h-20 w-full rounded-md"></div>
                </div>
            )}
        </div>
    )
}
