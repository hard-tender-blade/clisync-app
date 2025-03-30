import { Day, GoogleCalendarEvent } from "@/modules/shared/types/calendar";
import { SessionWithClient } from "@/modules/shared/types/mainTypes";
import moment from "moment";

const buildDay = (startS: string, sessions: SessionWithClient[], userGoogleCalendarEvents: GoogleCalendarEvent[]): Day => {
    const currentTime = moment()
    const start = moment(startS)
    const processDay = start.clone()

    // delete from googleCalendar actual sessions, we dont want to show them twice
    const googleEventsToRemove = sessions.map((session) => {
        return session.googleEventId
    })
    userGoogleCalendarEvents = userGoogleCalendarEvents.filter((event) => {
        return !googleEventsToRemove.includes(event.id)
    })

    const processDaySessions: SessionWithClient[] = sessions.filter((session) => {
        return moment(session.start).isSame(processDay, 'day')
    })

    const processDayGoogleCalendarEvents: GoogleCalendarEvent[] = userGoogleCalendarEvents.filter((event) => {
        return moment(event.start.dateTime).isSame(processDay, 'day')
    }
    )
    userGoogleCalendarEvents = userGoogleCalendarEvents.filter((event) => {
        return !processDayGoogleCalendarEvents.includes(event)
    })

    return {
        date: processDay,
        sessions: processDaySessions,
        googleCalendarEvents: processDayGoogleCalendarEvents
    }
}
export default buildDay