'use client '
import React from 'react'
import Avatar from '@/modules/client/utils/avatar'
import DropDown from './dropDown'
import { Language } from '@/modules/client/languageInterface/language'
import Link from 'next/link'
import { DEFAULT_CLIENTS_LIST_LIMIT } from '@/modules/shared/constants/constants'
import { useClientsList } from '../context/clientsListContext'

export default function List() {
    const { clients, fetchNextPage, loading } = useClientsList()

    return (
        <div
            className="h-full overflow-scroll"
            onScroll={(e) => {
                // fetch next page when scroll almost reaches the bottom
                if (
                    e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
                    e.currentTarget.clientHeight + 10
                ) {
                    fetchNextPage()
                }
            }}
        >
            {!clients.data && (
                <div className="flex flex-col gap-[1px]">
                    {Array.from({ length: DEFAULT_CLIENTS_LIST_LIMIT }).map((_, i) => (
                        <div key={i} className="skeleton h-16 w-full rounded-md"></div>
                    ))}
                </div>
            )}

            {clients.data &&
                clients.data.data.map((client) => (
                    <div
                        key={client.id}
                        className="flex h-16 w-full items-center border-b border-solid border-base-200 hover:bg-base-200"
                    >
                        <Link
                            href={`/workspace/clients/${client.id}`}
                            className="flex w-11/12 items-center gap-3 pl-3 pr-4 hover:underline md:w-4/12"
                        >
                            <div className="h-8 w-8">
                                <Avatar id={client.id} size={32} />
                            </div>
                            <p className="overflow-hidden text-ellipsis  whitespace-nowrap text-xl font-bold">
                                {client.name}
                            </p>
                        </Link>
                        <div className="hidden w-2/12 md:block">-</div>
                        <div className="hidden w-3/12 md:block">{client.email}</div>
                        <div className="hidden w-2/12 md:block">{client.phoneNumber}</div>
                        <div className="hidden w-2/12 items-center justify-end pr-6 md:flex">
                            <DropDown client={client} lang={Language.en} />
                        </div>
                    </div>
                ))}

            {(clients.status === 'pending' || loading) && (
                <div className="flex h-24 w-full items-center justify-center opacity-70">
                    <span className="loading loading-dots loading-md"></span>
                </div>
            )}

            {/* gap from the bottom to make last items appear, calculated based on the 
            height of the tabbar and table name for pc and bottom navigation for mobile */}
            <div className="sup h-[10.5rem] md:h-[6.5rem]" />
        </div>
    )
}
