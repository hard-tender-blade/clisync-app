import { ClientsCursored } from '@/modules/shared/types/cursor'
import { UseQueryResult } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

interface ClientsListContextType {
    searchString: string
    setSearchString: (search: string) => void
    clients: UseQueryResult<ClientsCursored, Error>
    fetchNextPage: () => void
    loading: boolean
}

export const ClientsListContext = createContext<ClientsListContextType | undefined>(
    undefined,
)

export const useClientsList = () => {
    const context = useContext(ClientsListContext)
    if (!context) {
        throw new Error('No Context')
    }
    return context
}
