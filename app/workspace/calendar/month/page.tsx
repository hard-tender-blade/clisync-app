import Content from './content'

export default async function Page() {
    // const { userId, token, lang } = authMiddleware(request)
    // if (!userId || !lang || !token)
    //     return permanentRedirectSessionExpired(`/workspace/calendar/month`)

    // // get interval from search params or generate for current month
    // let { start, end } = searchParams
    // if (!start || !end) {
    //     const interval = generateMonthInterval()
    //     start = interval.start.toISOString()
    //     end = interval.end.toISOString()
    // }

    // const [user, sessions, userGCEvents] = await Promise.all([
    //     getCurrentUser(token),
    //     getSessionsOfTimeInterval({
    //         start,
    //         end,
    //         token,
    //     }),
    //     getUserCalendarEventsInTimeInterval({
    //         start,
    //         end,
    //         userId,
    //         token,
    //     }),
    // ])
    // if (!user) return permanentRedirectSessionExpired(`/workspace/calendar/month`)
    // if (!sessions) return notFound()
    // if (!userGCEvents) return notFound()

    return (
        <main>
            <Content />
        </main>
    )
}
