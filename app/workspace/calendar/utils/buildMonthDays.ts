import { Day, GoogleCalendarEvent } from "@/modules/shared/types/calendar";
import { SessionWithClient } from "@/modules/shared/types/mainTypes";
import moment from "moment";

const buildMonthDays = ({ start, end, sessions, userGoogleCalendarEvents }: {
    start: moment.Moment,
    end: moment.Moment,
    sessions: SessionWithClient[],
    userGoogleCalendarEvents: GoogleCalendarEvent[]
}): Day[] => {
    const days = []

    // delete from googleCalendar actual sessions, we dont want to show them twice
    const googleEventsToRemove = sessions.map((session) => {
        return session.googleEventId
    })
    userGoogleCalendarEvents = userGoogleCalendarEvents.filter((event) => {
        return !googleEventsToRemove.includes(event.id)
    })

    // map data into days
    while (start.isBefore(end)) {
        const processDaySessions: SessionWithClient[] = sessions.filter((session) => {
            return moment(session.start).isSame(start, 'day')
        })
        sessions = sessions.filter((session) => {
            return !processDaySessions.includes(session)
        })

        const processDayGoogleCalendarEvents: GoogleCalendarEvent[] = userGoogleCalendarEvents.filter((event) => {
            return moment(event.start.dateTime).isSame(start, 'day')
        }
        )
        userGoogleCalendarEvents = userGoogleCalendarEvents.filter((event) => {
            return !processDayGoogleCalendarEvents.includes(event)
        })

        days.push({
            date: start.clone(),
            sessions: processDaySessions,
            googleCalendarEvents: processDayGoogleCalendarEvents,
        })

        start.add(1, 'days')
    }

    return days
}
export default buildMonthDays