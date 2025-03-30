import publicConfig from "@/modules/shared/config/publicConfig"
import { Client } from "../../../shared/types/mainTypes"

const getClientById = async (id: string, token?: string): Promise<Client | null> => {
    const response = await fetch(`${publicConfig.next_public_origin}/api/clients/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    if (response.status !== 200) return null

    return response.json()
}
export default getClientById