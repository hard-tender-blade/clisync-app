import { encryptString } from "@/modules/client/e2ee"
import { Client, Session } from "../../../shared/types/mainTypes"


const updateSessionById = async (id: string, session: Session): Promise<Client | null> => {
    session = {
        ...session,
        note: JSON.stringify(await encryptString(JSON.stringify(session.note)))
    }

    const response = await fetch(`/api/sessions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
    })
    if (response.status !== 200) return null

    return response.json()
}
export default updateSessionById
