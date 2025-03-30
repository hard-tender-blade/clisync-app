'use client'

import Link from 'next/link'
import { FaRegCalendarAlt, FaAddressBook } from 'react-icons/fa'
import { IoPersonAdd } from 'react-icons/io5'
import PX from '../components/px'
import Separator from '../components/separator'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const usePosts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data)
                setIsLoading(false)
            })
            .catch((err) => console.error(err))
    }, [])

    return { posts, isLoading }
}

export default function Content() {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios('https://jsonplaceholder.typicode.com/posts')
            return res.data
        },
    })

    return (
        <>
            <Separator size="lg" />

            <PX className="flex flex-col">
                <h1>Quick Actions</h1>
                <div className="mt-5 flex flex-wrap gap-3 md:w-1/2">
                    <Link href="/workspace/calendar/month" className="btn">
                        <FaRegCalendarAlt />
                        <span>Calendar</span>
                    </Link>

                    <Link href="/workspace/clients" className="btn">
                        <FaAddressBook />
                        <span>My clients</span>
                    </Link>

                    <Link href="/workspace/clients/new" className="btn">
                        <IoPersonAdd />
                        <span>New client</span>
                    </Link>

                    <button className="btn btn-disabled">Edit tags</button>
                    <button className="btn btn-disabled">Profile settings</button>
                    <button className="btn btn-disabled">Schedule session?</button>
                </div>

                <Separator size="md" />

                <h3>Clisync updates</h3>
                <div className="mt-5 flex w-full flex-col gap-3 md:w-2/3">
                    {isLoading ? (
                        <>
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-32 w-full"></div>
                        </>
                    ) : (
                        posts &&
                        posts.slice(0, 3).map((post: any) => (
                            <div
                                key={post.id}
                                className=" flex flex-col overflow-hidden rounded-2xl bg-base-100 shadow-xl md:flex-row"
                            >
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes"
                                    className="w-full md:w-44"
                                />

                                <div className="flex flex-col justify-center gap-2 overflow-hidden p-4">
                                    <p className="text-xl font-bold">{post.title}</p>
                                    <p className="truncate text-ellipsis text-sm">
                                        {post.body}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Separator size="md" />

                <h3>Featured articles</h3>
                <div className="mt-5 flex w-full flex-col gap-3 md:flex-row">
                    {isLoading ? (
                        <div className="skeleton h-32 w-full"></div>
                    ) : (
                        posts &&
                        posts.slice(0, 3).map((post: any) => (
                            <div
                                key={post.id}
                                className="card card-compact w-full bg-base-100 shadow-xl md:w-96"
                            >
                                <figure>
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                        alt="Shoes"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{post.title}</h2>
                                    <p>{post.body}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Separator size="md" />
            </PX>
        </>
    )
}
