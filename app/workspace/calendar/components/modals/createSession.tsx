import OwnPicker from '@/app/workspace/clients/[id]/components/ownPicker/ownPicker'
import ModalV2 from '@/modules/client/utils/modalV2/modalV2'
import React, { useState } from 'react'
import Search from './components/search'
import { Client } from '@/modules/shared/types/mainTypes'
import Avatar from '@/modules/client/utils/avatar'
import { IoClose, IoWarningOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useMonthCalendar } from '../../month/context/monthCalendarContext'
import { v4 } from 'uuid'

const newNote = () => {
    const data = [
        {
            id: v4(),
            type: 'paragraph',
            data: { text: 'created - ' + new Date().toLocaleString() },
        },
    ]

    return JSON.stringify(data)
}

export default function CreateSessionModal({
    requestClose,
}: {
    requestClose: () => void
}) {
    const { selectedDay, user, createSession } = useMonthCalendar()

    const [client, setClient] = useState<Client | null>(null)
    const [start, setStart] = useState<Date>(selectedDay?.date.toDate() || new Date())
    const [end, setEnd] = useState<Date>(selectedDay?.date.toDate() || new Date())

    const [addToUserGoogleCalendar, setAddToUserGoogleCalendar] = useState(false)
    const [inviteClientOnGoogleCalendarEvent, setInviteClientOnGoogleCalendarEvent] =
        useState(false)
    const [note, setNote] = useState(newNote())

    if (!selectedDay || !user) return null

    //todo implement notifications for user and client
    //todo add user email check if user has it

    return (
        <ModalV2 requestClose={requestClose}>
            <div className="flex flex-col gap-4">
                <h3>Create new session</h3>
                <div>
                    <p className="p-bold">Time *</p>
                    <div className="flex gap-2">
                        <OwnPicker date={start} setDate={setStart} showMonth={false} />
                        {' - '}
                        <OwnPicker date={end} setDate={setEnd} showMonth={false} />
                    </div>
                </div>
                <div>
                    <p className="p-bold">Client *</p>
                    {client ? (
                        <div className="flex w-full items-center gap-2">
                            <div className="h-hull flex items-center gap-2 py-4">
                                <Avatar id={client.id} size={16} />
                                <span>{client.name}</span>
                            </div>
                            <button
                                className="btn btn-sm"
                                onClick={() => setClient(null)}
                            >
                                <IoClose />
                            </button>
                        </div>
                    ) : (
                        <Search setClient={setClient} />
                    )}
                </div>

                <div>
                    {!user.googleCalendarConnected && (
                        <div className="flex items-center gap-2 py-1">
                            <IoWarningOutline color="red" />
                            <p className="text-xs text-warning">
                                You need to connect your Google Calendar to use this
                                feature.{' '}
                                <Link href={'/settings'} className="text-blue underline">
                                    Visit settings.
                                </Link>
                            </p>
                        </div>
                    )}
                    <div
                        className={
                            !user.googleCalendarConnected
                                ? 'pointer-events-none opacity-30'
                                : undefined
                        }
                    >
                        <p className="p-bold">Other</p>
                        <label className="label w-min cursor-pointer gap-6">
                            <span className="label-text whitespace-nowrap">
                                Add to my Google Calendar
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={addToUserGoogleCalendar}
                                onChange={() =>
                                    setAddToUserGoogleCalendar(!addToUserGoogleCalendar)
                                }
                            />
                        </label>

                        <label className="label w-min cursor-pointer gap-6">
                            <span className="label-text whitespace-nowrap">
                                Invite client on Google Calendar event
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={inviteClientOnGoogleCalendarEvent}
                                onChange={() =>
                                    setInviteClientOnGoogleCalendarEvent(
                                        !inviteClientOnGoogleCalendarEvent,
                                    )
                                }
                            />
                        </label>
                    </div>
                </div>

                <button
                    onClick={async () => {
                        await createSession({
                            start,
                            end,
                            client: client!,
                            addToUserGoogleCalendar,
                            inviteClientOnGoogleCalendarEvent,
                            note,
                        })
                        requestClose()
                    }}
                    className={`btn ${client ? 'btn-primary' : 'btn-disabled'} w-full`}
                >
                    Create session
                </button>
            </div>
        </ModalV2>
    )
}
