import { DEFAULT_CLIENTS_LIST_LIMIT } from '@/modules/shared/constants/constants'
import { ClientsCursored, Cursor } from '@/modules/shared/types/cursor'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

//hook
export const useClients = ({ search = '' }: { search: string }) => {
    return useQuery<ClientsCursored>({
        queryKey: ['clients', search],
        queryFn: () =>
            getClients({ limit: DEFAULT_CLIENTS_LIST_LIMIT, offset: 0 }, search),
        staleTime: 1000 * 60 * 5,
    })
}

//request
export const getClients = async (
    cursor: Cursor,
    search?: string,
): Promise<ClientsCursored> => {
    const result = await axios({
        method: 'get',
        url: '/api/clients',
        params: {
            search,
            limit: cursor.limit,
            offset: cursor.offset,
        },
    })

    return result.data as ClientsCursored
}
