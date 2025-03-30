import { Session } from "@/modules/shared/types/mainTypes"

const createSessionsAttachments = async (id: string, data: FormData): Promise<Session | null> => {
    const response = await fetch(`/api/sessions/${id}/attachments`, {
        method: 'POST',
        body: data,
    })

    if (response.status !== 200) return null
    return response.json()
}
export default createSessionsAttachments