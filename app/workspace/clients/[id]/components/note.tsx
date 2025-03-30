import { Client } from '@/modules/shared/types/mainTypes'
import React from 'react'
import TiptapEditor from './editorTiptap/editorTipTap'

//todo, fix loading of the editor + strange behavior with next js soft navigation
export default function Note({
    client,
    setClient,
    setUpdate,
}: {
    client: Client
    setClient: (value: Client) => void
    setUpdate: (value: boolean) => void
}) {
    return (
        <TiptapEditor
            data={client.note || ''}
            setData={(data) => {
                setUpdate(true)
                setClient({ ...client, note: data })
            }}
        />
    )
}
