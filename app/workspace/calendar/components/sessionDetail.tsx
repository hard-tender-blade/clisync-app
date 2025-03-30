import Avatar from '@/modules/client/utils/avatar'
import { SessionWithClient } from '@/modules/shared/types/mainTypes'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { IoPerson, IoTimeOutline } from 'react-icons/io5'

export default function SessionDetail({
    children,
    session,
    dayWithSessionUrl,
}: {
    children: React.ReactNode
    session: SessionWithClient
    dayWithSessionUrl: string
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <details
            className="dropdown dropdown-top w-full"
            open={open}
            onClick={(e) => e.preventDefault()}
            onMouseLeave={(e) => setOpen(false)}
            onMouseEnter={(e) => setOpen(true)}
        >
            <summary className="no-marker">{children}</summary>
            <div className="menu dropdown-content z-[600] flex flex-col gap-1 text-ellipsis rounded-box bg-base-100 p-4 shadow">
                <div className="flex items-center gap-2">
                    <Avatar id={session.client.id} size={16} />
                    <p className="p-bold whitespace-nowrap">{session.client.name}</p>
                </div>

                <div className="flex items-center gap-2 pl-6">
                    <p>{moment(session.start).format('HH:mm')}</p>
                    <p>-</p>
                    <p>{moment(session.start).clone().add(1, 'hour').format('HH:mm')}</p>
                    <IoTimeOutline />
                </div>

                <div className="flex flex-col whitespace-nowrap py-2 pl-6">
                    <p>{session.client.email}</p>
                    <p>{session.client.phoneNumber}</p>
                </div>

                <div className="flex gap-2 pl-6">
                    <Link
                        href={`/workspace/clients/${session.client.id}`}
                        className="btn btn-sm h-12 w-12 rounded-full"
                    >
                        <IoPerson />
                    </Link>
                    <Link
                        href={dayWithSessionUrl}
                        className="btn btn-sm h-12 w-12 rounded-full"
                    >
                        <HiPencilAlt />
                    </Link>
                </div>
            </div>
        </details>
    )
}
