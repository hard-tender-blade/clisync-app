import { decryptString } from '@/modules/client/e2ee'
import publicConfig from '@/modules/shared/config/publicConfig'
import { SessionWithClient } from '@/modules/shared/types/mainTypes'

//todo use axios
const getSessionsOfTimeInterval = async (
    {
        start,
        end,
    }: {
        start: string,
        end: string,
    }
): Promise<SessionWithClient[]> => {
    console.log("start", start)

    const searchParams = new URLSearchParams()
    searchParams.append('start', start)
    searchParams.append('end', end)
    searchParams.append('clients', "true")


    const response = await fetch(
        `${publicConfig.next_public_origin}/api/sessions?${searchParams.toString()}`,
        {
            method: 'GET',
        },
    )
    const sessions = await response.json() as SessionWithClient[]
    if (!sessions) return []


    const dSessions: SessionWithClient[] = []
    for (let i = 0; i < sessions.length; i++) {
        dSessions.push(
            {
                ...sessions[i],
                note: JSON.parse(await decryptString(JSON.parse(sessions[i].note)))
            }
        )
    }

    return dSessions
}
export default getSessionsOfTimeInterval
