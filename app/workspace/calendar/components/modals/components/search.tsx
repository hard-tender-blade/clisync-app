'use client'
import { getClients } from '@/modules/client/query/clients/useClients'
import Avatar from '@/modules/client/utils/avatar'
import { Client } from '@/modules/shared/types/mainTypes'
import React, { useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

export default function Search({ setClient }: { setClient: (client: Client) => void }) {
    const inputEl = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState('')
    const [clients, setClients] = useState<Client[]>([])
    const [fetchTimeout, setFetchTimeout] = useState<NodeJS.Timeout | null>(null)
    const [fetching, setFetching] = useState(false)

    const handleChange = (e: any) => {
        const value = e.target.value
        setInput(value)
        setFetching(false)

        // Clear any existing timeout
        if (fetchTimeout) clearTimeout(fetchTimeout)

        // Dont fetch if input is empty
        if (value === '') {
            setClients([])
            return
        }

        setFetching(true)
        // Create a new timeout with a 300ms delay
        const newFetchTimeout = setTimeout(async () => {
            try {
                const emptyCursor = { limit: 10, offset: 0 }

                const clientsCursored = await getClients(emptyCursor, value)
                setFetching(false)
                if (!clientsCursored) return
                handleSetArtists(clientsCursored.data)
            } catch (error) {
                console.error('Failed to fetch clients', error)
            }
        }, 700)

        // Update timeoutId state
        setFetchTimeout(newFetchTimeout)
    }

    // Handle list animation when adding artists
    const handleSetArtists = (clients: Client[]) => {
        setClients(clients)
    }

    const handleDefocus = () => {
        setInput('')
        setClients([])
        clearTimeout(fetchTimeout as NodeJS.Timeout)
    }

    return (
        <div className="relative w-full max-w-xs">
            <label className="input input-bordered flex items-center gap-3 rounded-full">
                {fetching ? (
                    <div className="h-5 w-5 opacity-40">
                        <span className="loading loading-spinner loading-xs"></span>
                    </div>
                ) : (
                    <IoSearch className="h-5 w-5 opacity-40" />
                )}
                <input
                    ref={inputEl}
                    placeholder="Search for a client..."
                    value={input} // Bind the input's value to the state
                    onChange={handleChange}
                />
            </label>

            {clients.length > 0 && (
                <div className="join join-vertical absolute top-[110%] z-50 flex w-full flex-col shadow-custom">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="btn join-item flex justify-between bg-base-100 hover:cursor-default hover:bg-base-200"
                        >
                            <div className="flex w-full items-center justify-between gap-2">
                                <button
                                    className="h-hull flex w-full items-center gap-2 py-4"
                                    onClick={() => {
                                        setClient(client)
                                        handleDefocus()
                                    }}
                                >
                                    <Avatar id={client.id} size={16} />
                                    <span>{client.name}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {input.length > 0 && clients.length === 0 && !fetching && (
                <ul className="menu absolute top-[110%] z-50 flex w-full flex-col rounded-box bg-base-200">
                    <li className="">No results</li>
                </ul>
            )}
        </div>
    )
}
