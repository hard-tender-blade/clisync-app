import { Client } from "@/modules/shared/types/mainTypes"

const deleteSessionById = async (id: string): Promise<Client | null> => {
    const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE',
    })

    if (response.status !== 200) return null
    return response.json()
}
export default deleteSessionById