'use client'
import NoSSR from '@/modules/client/utils/noSSR'
import { MONTH_CALENDAR_DAYS_INTERVAL } from '@/modules/shared/constants/constants'
import moment from 'moment'
import React, { useRef } from 'react'
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa6'

export default function OwnPicker({
    date,
    setDate,
    showMonth,
    showTime,
}: {
    date: Date
    setDate: (date: Date) => void
    showMonth?: boolean
    showTime?: boolean
}) {
    const detailsRef = useRef<HTMLDetailsElement>(null)

    const handleGoToNextMonth = () => {
        setDate(moment(date).add(1, 'month').startOf('month').toDate())
    }

    const handleGoToPreviousMonth = () => {
        setDate(moment(date).subtract(1, 'month').startOf('month').toDate())
    }

    return (
        <details ref={detailsRef} className="dropdown">
            <NoSSR>
                <summary className="btn btn-sm">{date.toLocaleString()}</summary>
            </NoSSR>
            <div className="menu dropdown-content z-[1]">
                <div className=" flex flex-col gap-4 rounded-xl bg-base-100 p-4 shadow-custom">
                    {/* Month view */}
                    <div className={showMonth === false ? 'hidden' : 'flex'}>
                        <div className="flex items-center justify-between">
                            <p>{moment(date).format('MMMM YYYY')}</p>
                            <div className="flex gap-2">
                                <button
                                    className="btn join-item btn-sm"
                                    onClick={handleGoToPreviousMonth}
                                >
                                    <FaAngleLeft />
                                </button>
                                <button
                                    className="btn join-item btn-sm"
                                    onClick={handleGoToNextMonth}
                                >
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <div className="mb-2 mt-4 grid grid-cols-7 gap-1">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
                                <div key={i} className="text-center text-sm">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {generateMonthDays(date).map((day, i) => (
                                <button
                                    key={i}
                                    className={`btn btn-sm 
                            ${!day.currentMonth && 'btn-ghost opacity-30'}
                            ${day.today && !day.date.isSame(date, 'day') && 'btn-accent'}
                            ${day.date.isSame(date, 'day') && 'btn-primary'}

                            `}
                                    onClick={() => setDate(day.date.toDate())}
                                >
                                    {day.date.format('D')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* time picker */}
                    <div
                        className={`${showTime === false ? 'hidden' : 'flex'} w-fill flex flex-col`}
                    >
                        <span className="pl-2">Time</span>
                        <div className="flex gap-2">
                            <input
                                type="time"
                                className="input input-sm input-bordered w-full"
                                value={moment(date).format('HH:mm')}
                                onChange={(e) => {
                                    const time = e.target.value
                                    const [hours, minutes] = time.split(':')
                                    setDate(
                                        moment(date)
                                            .set('hours', +hours)
                                            .set('minutes', +minutes)
                                            .toDate(),
                                    )
                                }}
                            />
                            <button
                                className="btn btn-sm"
                                onClick={() =>
                                    detailsRef.current?.removeAttribute('open')
                                }
                            >
                                <FaCheck />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </details>
    )
}

interface Day {
    date: moment.Moment
    weekday: string
    currentMonth: boolean
    today: boolean
}

const generateMonthDays = (date: Date): Day[] => {
    const currentTime = moment()
    const startOfMonth = moment(date).startOf('month')

    const monthArray = []

    let startOfView = startOfMonth.clone()
    while (startOfView.weekday() !== 1) {
        startOfView = startOfView.subtract(1, 'days')
    }

    for (let i = 0; i < MONTH_CALENDAR_DAYS_INTERVAL; i++) {
        const currentDay = startOfView.clone().add(i, 'days')

        monthArray.push({
            date: currentDay,
            weekday: currentDay.format('dddd'),
            currentMonth: currentDay.month() === startOfMonth.month(),
            today: currentDay.isSame(currentTime, 'day'),
        })
    }

    return monthArray
}
