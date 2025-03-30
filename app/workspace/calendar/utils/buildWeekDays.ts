import { Day, GoogleCalendarEvent } from "@/modules/shared/types/calendar";
import { SessionWithClient } from "@/modules/shared/types/mainTypes";
import moment from "moment";

const buildWeekDays = (startS: string, sessions: SessionWithClient[], userGoogleCalendarEvents: GoogleCalendarEvent[]): Day[] => {
    const currentTime = moment()
    const start = moment(startS)

    const days: Day[] = []

    // delete from googleCalendar actual sessions, we dont want to show them twice
    const googleEventsToRemove = sessions.map((session) => {
        return session.googleEventId
    })
    userGoogleCalendarEvents = userGoogleCalendarEvents.filter((event) => {
        return !googleEventsToRemove.includes(event.id)
    })

    for (let i = 0; i < 7; i++) {
        const processDay = start.clone().add(i, 'days')
        const currentDaySessions: SessionWithClient[] = sessions.filter((session) => {
            return moment(session.start).isSame(processDay, 'day')
        })
        sessions = sessions.filter((session) => {
            return !currentDaySessions.includes(session)
        })

        const processDayGoogleCalendarEvents: GoogleCalendarEvent[] = userGoogleCalendarEvents.filter((event) => {
            return moment(event.start.dateTime).isSame(processDay, 'day')
        }
        )
        userGoogleCalendarEvents = userGoogleCalendarEvents.filter((event) => {
            return !processDayGoogleCalendarEvents.includes(event)
        })

        days.push({
            date: processDay,
            sessions: currentDaySessions,
            googleCalendarEvents: processDayGoogleCalendarEvents,
        })
    }

    return days
}
export default buildWeekDays