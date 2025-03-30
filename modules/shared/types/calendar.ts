import { SessionWithClient } from "./mainTypes"

export interface Day {
    date: moment.Moment
    sessions: SessionWithClient[]
    googleCalendarEvents: GoogleCalendarEvent[]

}

export interface DayStringDate {
    date: string
    weekday: string
    currentMonth: boolean
    today: boolean
    sessions: SessionWithClient[]
}

export interface GoogleCalendarEvent {
    id: string
    summary: string
    htmlLink: string
    start: {
        dateTime: string
    }
    end: {
        dateTime: string
    }
}
