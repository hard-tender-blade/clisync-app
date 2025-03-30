import React, { useEffect } from 'react'
import { useMonthCalendar } from '../context/monthCalendarContext'
import moment from 'moment'
import DayCell from './dayCell'
import { Day } from '@/modules/shared/types/calendar'
import Weekdays from './weekdays'
import Separator from '@/app/components/separator'

const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export default function MonthsGrids() {
    const scrollView = React.createRef<HTMLDivElement>()
    const {
        months,
        loadPrevMonth,
        loadNextMonth,
        scrollToCurrentMonth,
        setScrollToCurrentMonth,
        firstLoad,
        setFirstLoad,
    } = useMonthCalendar()

    useEffect(() => {
        if (months.data && scrollView.current && scrollToCurrentMonth) {
            // Select the element corresponding to the current month
            const elementToScrollTo = scrollView.current.querySelector(
                `#id${moment().format('MMYYYY')}`,
            )

            if (elementToScrollTo) {
                // Use scrollTop with smooth behavior manually
                const scrollOffset =
                    (elementToScrollTo as HTMLElement).offsetTop -
                    scrollView.current.offsetTop -
                    10

                scrollView.current.scrollTo({
                    top: scrollOffset,
                    behavior: firstLoad ? 'instant' : 'smooth',
                })
            }

            // Reset the flag
            setScrollToCurrentMonth(false)
            setFirstLoad(false)
        }
    }, [months, scrollToCurrentMonth])

    return (
        <div
            ref={scrollView}
            className="flex h-full flex-col gap-12 overflow-scroll"
            onScroll={async (e) => {
                const target = e.target as HTMLDivElement

                if (target.scrollHeight - target.scrollTop <= target.clientHeight + 300) {
                    loadNextMonth()
                }

                // Detect top scroll to load previous month
                if (target.scrollTop <= 300) {
                    console.log('top')

                    // Save the current scroll height and the height of the first child before inserting the new month
                    const prevScrollHeight = target.scrollHeight
                    const firstChildHeight = target.children[0].clientHeight

                    // Load the previous month (await if it's async)
                    await loadPrevMonth()

                    // Calculate the difference in height and adjust the scrollTop
                    const newScrollHeight = target.scrollHeight
                    const heightDifference = newScrollHeight - prevScrollHeight

                    // Set the scroll position to maintain the same visual content in view
                    target.scrollTop = target.scrollTop + heightDifference
                }
            }}
        >
            {months.data ? (
                <div>
                    {months.data.map((month, i) => {
                        return (
                            <div
                                key={month.monthId}
                                id={`id${month.monthId.replaceAll('.', '')}`}
                                className="flex flex-col"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="tooltip tooltip-top cursor-default"
                                        data-tip={`${
                                            monthsNames[
                                                moment(month.monthId, 'MM.YYYY').month()
                                            ]
                                        } ${moment(month.monthId, 'MM.YYYY').year()}`}
                                    >
                                        <h3 className="pb-2 pl-4">
                                            {
                                                monthsNames[
                                                    moment(
                                                        month.monthId,
                                                        'MM.YYYY',
                                                    ).month()
                                                ]
                                            }
                                        </h3>
                                    </div>
                                    {month.monthId === moment().format('MM.YYYY') && (
                                        <div className="badge badge-primary">
                                            Current month
                                        </div>
                                    )}
                                </div>
                                <Weekdays />

                                <div className={'grid grid-cols-7 grid-rows-6'}>
                                    <EmptyDays {...month.days} />
                                    {month.days.map((day, i) => {
                                        return (
                                            <DayCell
                                                key={day.date.format('MM.DD')}
                                                day={day}
                                                i={i}
                                                days={month.days}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col gap-3 p-3">
                    <div className="skeleton h-16 w-44 rounded-md"></div>
                    <div className="skeleton h-96 w-full rounded-md"></div>
                    <Separator size="md" />
                    <div className="skeleton h-16 w-44 rounded-md"></div>
                    <div className="skeleton h-96 w-full rounded-md"></div>
                </div>
            )}
        </div>
    )
}

const EmptyDays = (days: Day[]) => {
    if (!days[0]) return

    return Array.from(
        {
            length: days[0].date.weekday() === 0 ? 6 : days[0].date.weekday() - 1,
        },
        (_, i) => <div key={i} />,
    )
}
