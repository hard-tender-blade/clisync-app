import publicConfig from '@/modules/shared/config/publicConfig'
import { GoogleCalendarEvent } from '@/modules/shared/types/calendar'

//todo use axios
const getUserCalendarEventsInTimeInterval = async (
    {
        start,
        end,
    }: {
        start: string,
        end: string,
    }
): Promise<GoogleCalendarEvent[]> => {
    const searchParams = new URLSearchParams()
    searchParams.append('start', start)
    searchParams.append('end', end)

    const response = await fetch(
        `${publicConfig.next_public_origin}/api/user/googleCalendarEvents?${searchParams.toString()}`,
        {
            method: 'GET',
        },
    )
    return response.json()
}
export default getUserCalendarEventsInTimeInterval
