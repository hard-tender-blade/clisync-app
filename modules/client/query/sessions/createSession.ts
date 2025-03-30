import { SessionWithClient } from "@/modules/shared/types/mainTypes"
import { CreateSessionRequest } from "../../../shared/types/subTypes"
import { encryptString } from "@/modules/client/e2ee"

const createNewSession = async (session: CreateSessionRequest): Promise<SessionWithClient | null> => {
    session = {
        ...session,
        note: JSON.stringify(await encryptString(JSON.stringify(session.note)))
    }

    const response = await fetch(`/api/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
    })

    if (!response.ok || response.status !== 200) return null
    return response.json()
}
export default createNewSession
