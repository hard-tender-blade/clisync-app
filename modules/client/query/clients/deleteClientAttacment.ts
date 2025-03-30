import { Client } from "@/modules/shared/types/mainTypes"

const deleteClientAttachment = async (id: string): Promise<Client | null> => {
    const response = await fetch(`/api/clients/attachments/${id}`, { method: 'DELETE' })
    if (response.status !== 200) return null
    return response.json()
}
export default deleteClientAttachment