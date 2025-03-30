'use client'

import languageInterface from '@/modules/client/languageInterface/language'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/modules/client/queryClient'
import NavbarPublic from '../components/navbar/navbar'
import { User } from '@/modules/shared/types/mainTypes'
import { useEffect, useState } from 'react'
import Separator from '../components/separator'
import Link from 'next/link'

export default function Home() {
    const [query, setQuery] = useState<string>('')
    const [psychologists, setPsychologists] = useState<User[]>()

    const fetchData = async () => {
        const response = await fetch(`/api/users?query=${query}`)
        if (response.ok) {
            const data = await response.json()
            console.log('dataaaaa', data)
            setPsychologists(data)
            return
        }

        setPsychologists([])
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex w-full flex-col items-center justify-center px-10 md:px-20">
                <NavbarPublic lang={languageInterface.defaultLanguage} />
                <Separator size="lg" />

                <div className="flex w-full gap-2 pb-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="text"
                            className="w-full max-w-xs grow"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Prague"
                        />
                    </label>

                    <button className="btn btn-primary" onClick={fetchData}>
                        Search
                    </button>
                </div>

                {!psychologists && (
                    <div className="grid w-full grid-cols-2 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="skeleton h-52 rounded-box bg-base-200 p-4"
                            ></div>
                        ))}
                    </div>
                )}

                {psychologists && (
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                        {psychologists.map((psychologist) => (
                            <Psychologist key={psychologist.id} user={psychologist} />
                        ))}
                        <Separator size="lg" />
                    </div>
                )}

                {psychologists && psychologists.length === 0 && (
                    <div>No psychologists found</div>
                )}

                <Separator size="md" />
            </div>
        </QueryClientProvider>
    )
}

const Psychologist = ({ user }: { user: User }) => {
    return (
        <div className="flex w-full flex-col justify-between rounded-box bg-base-200 px-6 py-4">
            <div className="flex flex-col">
                <h4 className="text-2xl font-bold">{user.name}</h4>
                <p className="pb-3 text-sm opacity-50">
                    {user.jobTitle} | {user.city} |{' '}
                    {user.onlineService ? 'Online service' : 'In person service'}
                </p>
                <p className="opacity-50">{user.aboutMe}</p>
            </div>

            <div className="flex w-full justify-end pt-4">
                <Link
                    href={`mailto:${user.email}`}
                    className="btn btn-outline btn-primary btn-sm w-fit"
                >
                    Contact
                </Link>
            </div>
        </div>
    )
}
