import publicConfig from "@/modules/shared/config/publicConfig"

const getClientsCount = async (token?: string): Promise<number | null> => {
    const response = await fetch(`${publicConfig.next_public_origin}/api/clients/count`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status !== 200) return null

    const result = await response.json()
    return result
}
export default getClientsCount