'use client'
import PC from '@/app/components/pc'
import React, { useState, useEffect } from 'react'
import { IoPersonAddSharp, IoSearch } from 'react-icons/io5'
import { useClientsList } from '../context/clientsListContext'
import { queryClient } from '@/modules/client/queryClient'

export default function ToolBar() {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
    const [value, setValue] = useState('') // State to store the input value

    const { setSearchString, clients, loading } = useClientsList()

    // this is bouncing search input, it will wait for 0.3s after user stops typing
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setValue(newValue) // Update the value state with the input text

        if (timer) clearTimeout(timer)
        const newTimer = setTimeout(async () => {
            setSearchString(newValue)
        }, 300)
        setTimer(newTimer)
    }

    const handleAddClient = () => {
        // purge clients query cache
        queryClient.invalidateQueries({ queryKey: ['clients'] })

        // add new client
        window.location.href = '/workspace/clients/new'
    }

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [timer])

    return (
        <div className=" z-30 flex items-center gap-3 border-b border-solid border-base-200 bg-white p-2">
            <div className="flex gap-3">
                <label className="input input-bordered flex w-full items-center gap-2">
                    {clients.status === 'pending' || loading ? (
                        <span className="loading loading-dots h-5 w-5 opacity-40"></span>
                    ) : (
                        <IoSearch className="h-5 w-5 opacity-40" />
                    )}
                    <input
                        className="w-full md:w-auto"
                        placeholder="Search for a client..."
                        value={value} // Bind the input's value to the state
                        onChange={handleInputChange}
                    />
                </label>
                <button onClick={handleAddClient} className="btn">
                    <IoPersonAddSharp />
                    <PC>Add client</PC>
                </button>
            </div>
        </div>
    )
}
