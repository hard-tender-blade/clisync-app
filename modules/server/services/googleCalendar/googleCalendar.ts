const createEvent = async (
    {
        title,
        description,
        start,
        end,
        accessToken,
        timeZone,
        inviteClientEmail
    }: {
        title: string
        description: string
        start: string
        end: string
        accessToken: string
        timeZone: string
        inviteClientEmail?: string
    }
) => {
    const event = {
        summary: title,
        description,
        start: {
            dateTime: start,
            timeZone,
        },
        end: {
            dateTime: end,
            timeZone,
        },
        attendees: inviteClientEmail ? [{ email: inviteClientEmail }] : undefined,
        sendUpdates: inviteClientEmail ? 'all' : undefined,
    }

    const res = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        },
    )
    console.log(res)

    if (!res.ok) return null;
    const data = await res.json();
    console.log("data is here", data)
    return data;
}

const getEvents = async (
    {
        start,
        end,
        accessToken,
    }: {
        start: string
        end: string
        accessToken: string
    }
) => {
    const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start}&timeMax=${end}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    )

    if (!res.ok) return null;
    const data = await res.json();
    return data.items;
}

const googleCalendarService = {
    createEvent,
    getEvents
}
export default googleCalendarService
