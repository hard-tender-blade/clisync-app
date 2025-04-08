import publicConfig from "@/modules/shared/config/publicConfig"
import { Client } from "../../../shared/types/mainTypes"
import { decryptString } from "../../e2ee"

const getClientById = async (id: string, token?: string): Promise<Client | null> => {
    const response = await fetch(`${publicConfig.next_public_origin}/api/clients/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    if (response.status !== 200) return null

    const client = await response.json() as Client;

    // Decrypt client session notes
    client.sessions = await Promise.all(
        client.sessions.map(async (item) => ({
            ...item,
            note: JSON.parse(await decryptString(JSON.parse(item.note)))
        }))
    );

    return client;
}
export default getClientById