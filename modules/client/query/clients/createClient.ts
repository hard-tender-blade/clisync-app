import publicConfig from '@/modules/shared/config/publicConfig';
import { Client } from '@/modules/shared/types/mainTypes'
import { CreateClientRequest } from '@/modules/shared/types/subTypes'

const createNewClient = async (
    client: CreateClientRequest,
    token: string
): Promise<{ client: Client | null; error: string | null }> => {
    const response = await fetch(`${publicConfig.next_public_origin}/api/clients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(client),
    })

    if (!response.ok)
        return { client: null, error: 'Failed to create client, contact support please.' }
    const data = await response.json()
    return {
        client: data,
        error: null,
    }
}
export default createNewClient
