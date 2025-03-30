import React, { ReactNode, useState } from 'react'
import { ClientsListContext } from './clientsListContext'
import { DEFAULT_CLIENTS_LIST_LIMIT } from '@/modules/shared/constants/constants'
import { ClientsCursored } from '@/modules/shared/types/cursor'
import { useQuery } from '@tanstack/react-query'
import { getClients } from '@/modules/client/query/clients/useClients'
import { queryClient } from '@/modules/client/queryClient'

export const ClientsListProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false)
    const [searchString, setSearchString] = useState('')
    const [hasNextPage, setHasNextPage] = useState(true)

    const clients = useQuery<ClientsCursored>({
        queryKey: ['clients', searchString],
        queryFn: () =>
            getClients({ limit: DEFAULT_CLIENTS_LIST_LIMIT, offset: 0 }, searchString),
    })

    const fetchNextPage = async () => {
        if (!clients.data || loading || !hasNextPage) return

        setLoading(true)
        const nextPageData = await getClients(
            {
                limit: DEFAULT_CLIENTS_LIST_LIMIT,
                offset: clients.data.data.length,
            },
            searchString,
        )

        if (nextPageData.nextCursor === null) setHasNextPage(false)
        if (!nextPageData.data) return

        queryClient.setQueryData(['clients', searchString], (oldData: any) => {
            if (!oldData) return undefined
            return {
                ...oldData,
                data: [...oldData.data, ...nextPageData.data],
            }
        })
        setLoading(false)
    }

    return (
        <ClientsListContext.Provider
            value={{
                searchString,
                setSearchString,
                clients,
                fetchNextPage,
                loading,
            }}
        >
            {children}
        </ClientsListContext.Provider>
    )
}
