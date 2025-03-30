import { Client } from '@/modules/shared/types/mainTypes'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import React from 'react'
import { v4 } from 'uuid'

export default function QuickNotes({
    client,
    setClient,
    setUpdate,
}: {
    client: Client
    setClient: (client: Client) => void
    setUpdate: (update: boolean) => void
}) {
    const handleAddNote = () => {
        if (client.quickNotes.length >= 5) {
            showAlert('warning', 'short', "You can't add more than 5 notes")
            return
        }
        setUpdate(true)
        setClient({
            ...client,
            quickNotes: [
                {
                    id: v4(),
                    note: '',
                    clientId: client.id,
                    userId: client.userId,
                },
                ...client.quickNotes,
            ],
        })
    }

    const handleDeleteNote = (id: string) => {
        setUpdate(true)
        const quickNotes = client.quickNotes.filter((n) => n.id !== id)
        setClient({ ...client, quickNotes })
    }

    const handleUpdateNote = (id: string, note: string) => {
        setUpdate(true)
        const quickNotes = client.quickNotes.map((n) =>
            n.id === id ? { ...n, note } : n,
        )
        setClient({ ...client, quickNotes })
    }

    return (
        <div className="w-full max-w-xs pt-2">
            <div className="flex items-center justify-between">
                <div className="label">
                    <span className="label-text">Quick notes</span>
                </div>

                <button
                    onClick={handleAddNote}
                    className="btn btn-outline btn-primary btn-xs"
                >
                    Add note
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {client.quickNotes &&
                    client.quickNotes.map((note) => (
                        <div key={note.id} className="flex flex-col items-end gap-2 ">
                            <textarea
                                value={note.note}
                                onChange={(e) =>
                                    handleUpdateNote(note.id, e.target.value)
                                }
                                className="textarea input-bordered h-min w-full max-w-xs"
                            />
                            <div>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="btn btn-outline btn-error btn-xs"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
