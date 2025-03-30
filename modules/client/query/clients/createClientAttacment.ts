import { Client } from "@/modules/shared/types/mainTypes"

const createClientAttachment = async (clientId: string, data: FormData): Promise<Client | null> => {

    console.log('attachments count --', data.getAll('files').length)
    const response = await fetch(`/api/clients/${clientId}/attachments`, {
        method: 'POST',
        body: data,
    })

    if (response.status !== 200) return null
    return response.json()
}
export default createClientAttachment