import { Client } from "../../../shared/types/mainTypes"
import { UpdateClientRequest } from "../../../shared/types/subTypes"

const updateClientById = async (id: string, client: UpdateClientRequest): Promise<Client | null> => {
    const response = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
    })

    if (response.status !== 200) return null

    return response.json()
}
export default updateClientById