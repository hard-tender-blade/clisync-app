import React, { useState } from 'react'
import { Client, SessionWithClient, User } from '@/modules/shared/types/mainTypes'
import DayView from './dayView'
import { Day } from '@/modules/shared/types/calendar'
import Session from '@/app/workspace/clients/[id]/components/sessions/session'

export default function DaySessionView({
    day,
    user,
    sessionDefault,
}: {
    day: Day
    user: User
    sessionDefault: SessionWithClient | null
}) {
    const [session, setSession] = useState<SessionWithClient | null>(sessionDefault)
    const [client, setClient] = useState<Client | null>(sessionDefault?.client || null)

    return (
        <div className="flex gap-1">
            <div className={'w-3/12'}>
                <DayView
                    day={day}
                    user={user}
                    openSessionId={session?.id}
                    onSessionClick={(session: SessionWithClient) => {
                        setSession(session)
                        setClient(session.client)
                    }}
                    showTime
                >
                    <div className="flex flex-col pb-2">
                        <p className="p-bold">{day.date.format('MM.DD')}</p>
                    </div>
                </DayView>
            </div>

            <div className="divider divider-horizontal m-1 w-1" />

            <div className="w-9/12 overflow-y-scroll">
                {session && client && (
                    <Session
                        key={session.id}
                        session={session}
                        client={client}
                        setClient={setClient}
                    />
                )}
            </div>
        </div>
    )
}
