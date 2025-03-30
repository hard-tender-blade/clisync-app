import { useMutation } from '@tanstack/react-query'

export const useDeleteClient = () => {
    return useMutation({
        mutationFn: (clientId: string) => {
            return fetch(`/api/clients/${clientId}`, {
                method: 'DELETE',
            })
        },
    })
}

const deleteClientById = async (id: string): Promise<boolean> => {
    const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
    })

    if (response.status !== 200) return false

    return true
}
export default deleteClientById
