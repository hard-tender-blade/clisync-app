import React, { ReactNode, useEffect, useState } from 'react'
import { MonthCalendarContext } from './monthCalendarContext'
import { Day } from '@/modules/shared/types/calendar'
import moment from 'moment'
import { Client, SessionWithClient } from '@/modules/shared/types/mainTypes'
import { hideLoading, showLoading } from '@/modules/client/utils/loading/loadingModule'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import createNewSession from '@/modules/client/query/sessions/createSession'
import { useUser } from '@/modules/client/query/user/useUser'
import { useQuery } from '@tanstack/react-query'
import getSessionsOfTimeInterval from '@/modules/client/query/sessions/getSessionsOfTimeInterval'
import getUserCalendarEventsInTimeInterval from '@/modules/client/query/sessions/getUserCalendarEventsInTimeInterval'
import buildMonthDays from '../../utils/buildMonthDays'
import { queryClient } from '@/modules/client/queryClient'

export const MonthCalendarProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<'editor' | 'month'>('month')
    const [firstLoad, setFirstLoad] = useState(true)
    const [scrollToCurrentMonth, setScrollToCurrentMonth] = useState(true) // this is used only to select today day on first load or when go to today
    const [selectedDay, setSelectedDay] = useState<Day>()
    const [selectedSession, setSelectedSession] = useState<SessionWithClient>()

    const user = useUser()

    const [loadingPrevMonth, setLoadingPrevMonth] = useState(false)
    const [loadingNextMonth, setLoadingNextMonth] = useState(false)

    const months = useQuery({
        queryKey: ['months'],
        queryFn: async () => {
            const prevMonthStart = moment().subtract(1, 'month').startOf('month')
            const prevMonthEnd = moment().subtract(1, 'month').endOf('month')

            const currentMonthStart = moment().startOf('month')
            const currentMonthEnd = moment().endOf('month')

            const nextMonthStart = moment().add(1, 'month').startOf('month')
            const nextMonthEnd = moment().add(1, 'month').endOf('month')

            const [
                prevMonthSessions,
                currentMonthSessions,
                nextMonthSessions,
                prevUserGCEvents,
                currentUserGCEvents,
                nextUserGCEvents,
            ] = await Promise.all([
                getSessionsOfTimeInterval({
                    start: prevMonthStart.toISOString(),
                    end: prevMonthEnd.toISOString(),
                }),
                getSessionsOfTimeInterval({
                    start: currentMonthStart.toISOString(),
                    end: currentMonthEnd.toISOString(),
                }),
                getSessionsOfTimeInterval({
                    start: nextMonthStart.toISOString(),
                    end: nextMonthEnd.toISOString(),
                }),
                getUserCalendarEventsInTimeInterval({
                    start: prevMonthStart.toISOString(),
                    end: prevMonthEnd.toISOString(),
                }),
                getUserCalendarEventsInTimeInterval({
                    start: currentMonthStart.toISOString(),
                    end: currentMonthEnd.toISOString(),
                }),
                getUserCalendarEventsInTimeInterval({
                    start: nextMonthStart.toISOString(),
                    end: nextMonthEnd.toISOString(),
                }),
            ])

            return [
                {
                    monthId: prevMonthStart.format('MM.YYYY'),
                    days: buildMonthDays({
                        start: prevMonthStart,
                        end: prevMonthEnd,
                        sessions: prevMonthSessions,
                        userGoogleCalendarEvents: prevUserGCEvents,
                    }),
                },
                {
                    monthId: currentMonthStart.format('MM.YYYY'),
                    days: buildMonthDays({
                        start: currentMonthStart,
                        end: currentMonthEnd,
                        sessions: currentMonthSessions,
                        userGoogleCalendarEvents: currentUserGCEvents,
                    }),
                },
                {
                    monthId: nextMonthStart.format('MM.YYYY'),
                    days: buildMonthDays({
                        start: nextMonthStart,
                        end: nextMonthEnd,
                        sessions: nextMonthSessions,
                        userGoogleCalendarEvents: nextUserGCEvents,
                    }),
                },
            ]
        },
    })

    useEffect(() => {
        if (scrollToCurrentMonth && months.data) {
            setSelectedDay(
                months.data
                    .find((month) =>
                        month.days.some((day) => day.date.isSame(moment(), 'day')),
                    )
                    ?.days.find((day) => day.date.isSame(moment(), 'day')),
            )
            setScrollToCurrentMonth(false)
        }
    }, [months.data])

    const loadNextMonth = async () => {
        //get last month in months
        if (!months.data) return
        if (loadingNextMonth) return

        const lastMonth = months.data[months.data.length - 1]

        //get next month
        const nextMonth = moment(lastMonth.monthId, 'MM.YYYY').add(1, 'month')

        //check if next month is already in months
        const isNextMonthInMonths = months.data.some(
            (month) => month.monthId === nextMonth.format('MM.YYYY'),
        )
        if (isNextMonthInMonths) return

        setLoadingNextMonth(true)

        //fetch next month
        const nextMonthStart = nextMonth.clone().startOf('month')
        const nextMonthEnd = nextMonth.clone().endOf('month')

        const [nextMonthSessions, nextUserGCEvents] = await Promise.all([
            getSessionsOfTimeInterval({
                start: nextMonthStart.toISOString(),
                end: nextMonthEnd.toISOString(),
            }),
            getUserCalendarEventsInTimeInterval({
                start: nextMonthStart.toISOString(),
                end: nextMonthEnd.toISOString(),
            }),
        ])

        //add next month to months
        await queryClient.setQueryData(['months'], (oldData: any) => {
            if (!oldData) return undefined

            return [
                ...oldData,
                {
                    monthId: nextMonthStart.format('MM.YYYY'),
                    days: buildMonthDays({
                        start: nextMonthStart,
                        end: nextMonthEnd,
                        sessions: nextMonthSessions,
                        userGoogleCalendarEvents: nextUserGCEvents,
                    }),
                },
            ]
        })

        setLoadingNextMonth(false)
    }

    const loadPrevMonth = async () => {
        //get first month in months
        if (!months.data) return
        if (loadingPrevMonth) return

        console.log('loadingPrevMonth', loadingPrevMonth)
        const firstMonth = months.data[0]

        //get prev month
        const prevMonth = moment(firstMonth.monthId, 'MM.YYYY').subtract(1, 'month')

        //check if prev month is already in months
        const isPrevMonthInMonths = months.data.some(
            (month) => month.monthId === prevMonth.format('MM.YYYY'),
        )
        if (isPrevMonthInMonths) return

        setLoadingPrevMonth(true)

        //fetch prev month
        const prevMonthStart = prevMonth.clone().startOf('month')
        const prevMonthEnd = prevMonth.clone().endOf('month')

        const [prevMonthSessions, prevUserGCEvents] = await Promise.all([
            getSessionsOfTimeInterval({
                start: prevMonthStart.toISOString(),
                end: prevMonthEnd.toISOString(),
            }),
            getUserCalendarEventsInTimeInterval({
                start: prevMonthStart.toISOString(),
                end: prevMonthEnd.toISOString(),
            }),
        ])

        //add prev month to months
        await queryClient.setQueryData(['months'], (oldData: any) => {
            if (!oldData) return undefined
            return [
                {
                    monthId: prevMonthStart.format('MM.YYYY'),
                    days: buildMonthDays({
                        start: prevMonthStart,
                        end: prevMonthEnd,
                        sessions: prevMonthSessions,
                        userGoogleCalendarEvents: prevUserGCEvents,
                    }),
                },
                ...oldData,
            ]
        })

        setLoadingPrevMonth(false)
    }

    const goToToday = async () => {
        if (!months.data) return

        setSelectedDay(
            months.data
                .find((month) =>
                    month.days.some((day) => day.date.isSame(moment(), 'day')),
                )
                ?.days.find((day) => day.date.isSame(moment(), 'day')),
        )
        setScrollToCurrentMonth(true)
    }

    const createSession = async ({
        client,
        start: sessionStart,
        end: sessionEnd,
        addToUserGoogleCalendar,
        inviteClientOnGoogleCalendarEvent,
        note,
    }: {
        client: Client | null
        start: Date
        end: Date
        addToUserGoogleCalendar: boolean
        inviteClientOnGoogleCalendarEvent: boolean
        note: string
    }) => {
        if (!months.data) return
        if (!client) {
            showAlert('warning', 'short', 'Please select a client')
            return
        }
        if (!sessionStart || !sessionEnd) {
            showAlert('warning', 'short', 'Please select a time')
            return
        }

        showLoading()
        const newSessionWithClient = await createNewSession({
            clientId: client.id,
            start: sessionStart.toISOString(),
            end: sessionEnd.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            addToUserGoogleCalendar,
            inviteClientOnGoogleCalendarEvent,
            note,
        })
        if (!newSessionWithClient) {
            showAlert(
                'error',
                'short',
                'Failed to create session, contact support please',
            )
            hideLoading()
            return
        }

        let newDay = null

        await queryClient.setQueryData(['months'], (oldData: any) => {
            if (!oldData) return undefined

            console.log('oldData', oldData)

            const newMonths = oldData.map((month: { monthId: string; days: Day[] }) => {
                if (moment(sessionStart).format('MM.YYYY') === month.monthId) {
                    return {
                        ...month,
                        days: month.days.map((day: Day) => {
                            if (moment(sessionStart).isSame(day.date, 'day')) {
                                const updatedDay = {
                                    ...day,
                                    sessions: [...day.sessions, newSessionWithClient],
                                }

                                newDay = updatedDay
                                return updatedDay
                            }
                            return day
                        }),
                    }
                }
                return month
            })

            console.log('new Months', newMonths)

            return newMonths
        })

        // update selected day
        if (newDay) setSelectedDay(newDay)

        hideLoading()
        showAlert('success', 'short', 'Session created successfully')
    }

    const handleClickMonthView = () => {
        setMode('month')
        setScrollToCurrentMonth(true)
        setFirstLoad(true)
    }

    const handleCLickOnSession = (session: SessionWithClient) => {
        setSelectedSession(session)
        setMode('editor')
    }

    return (
        <MonthCalendarContext.Provider
            value={{
                selectedDay,
                setSelectedDay,
                goToToday,
                user: user.user,
                createSession,
                loadNextMonth,
                loadPrevMonth,
                months,
                scrollToCurrentMonth,
                setScrollToCurrentMonth,
                firstLoad,
                setFirstLoad,
                mode,
                setMode,
                handleClickMonthView,
                handleCLickOnSession,
                selectedSession,
                setSelectedSession,
            }}
        >
            {children}
        </MonthCalendarContext.Provider>
    )
}
