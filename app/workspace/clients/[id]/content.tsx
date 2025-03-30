'use client'
import { Client } from '@/modules/shared/types/mainTypes'
import React, { useState } from 'react'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import showModal from '@/modules/client/utils/modal/modal'
import deleteClientById from '@/modules/client/query/clients/deleteClientById'
import updateClientById from '@/modules/client/query/clients/updateClientById'
import processQuickNotes from '@/modules/client/query/clients/processQuickNotes'
import ClientAttachments from './components/clientAttachments/clientAttachments'
import { Language } from '@/modules/client/languageInterface/language'
import ClientData from './components/clientData'
import { hideLoading, showLoading } from '@/modules/client/utils/loading/loadingModule'
import Sessions from './components/sessions/sessions'
import { queryClient } from '@/modules/client/queryClient'

export default function Content({
    client: clientDefault,
    lang,
}: {
    client: Client
    lang: Language
}) {
    const [client, setClient] = useState<Client>(clientDefault)
    const [update, setUpdate] = useState(false)

    const handleSave = async () => {
        if (!client) return
        showLoading()
        const updatedNotes = await processQuickNotes(client.id, client.quickNotes)
        if (!updatedNotes) {
            showAlert('error', 'short', 'Failed to update notes, contact support please.')
            hideLoading()
            return
        }

        const updateClient = await updateClientById(client.id, client)
        if (!updateClient) {
            showAlert(
                'error',
                'short',
                'Failed to update client, contact support please.',
            )
            hideLoading()
            return
        }
        hideLoading()
        setUpdate(false)
        showAlert('success', 'short', 'Client updated successfully')
    }

    const handleDelete = async () => {
        showModal({
            title: 'Delete client',
            content: 'Are you sure you want to delete this client?',
            onConfirm: async () => {
                if (!client) return
                queryClient.invalidateQueries({
                    queryKey: ['clients', client.id],
                })
                const ok = await deleteClientById(client.id)
                if (!ok) {
                    showAlert(
                        'error',
                        'short',
                        'Failed to delete client, contact support please.',
                    )
                    return
                }
                showAlert('success', 'short', 'Client deleted successfully')
                window.location.href = '/workspace/clients'
            },
            onCancel: async () => {},
            confirmText: 'Delete',
            cancelText: 'Cancel',
            confirmClass: 'btn btn-error btn-outline',
            cancelClass: 'btn',
        })
        return null
    }

    const handleClientNoteUpdate = (note: string) => {
        setClient({ ...client, note })
        setUpdate(true)
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex items-center gap-3 border-b border-solid border-base-200 p-2">
                <button onClick={handleSave} className={`btn btn-primary join-item`}>
                    Save
                </button>

                <button
                    onClick={handleDelete}
                    className={`btn btn-error join-item text-white`}
                >
                    Delete
                </button>
            </div>

            <div className="flex gap-4 px-2 pt-4">
                <div className="w-full">
                    <h1 className="text-5xl">{client.name}</h1>
                    <p className="tiny-text">client id: {client.id}</p>
                    <textarea
                        value={client.note}
                        onChange={(e) => handleClientNoteUpdate(e.target.value)}
                        className="textarea textarea-bordered w-full pt-4"
                        placeholder="Note about client.."
                    />
                </div>
                <div className="divider divider-horizontal"></div>

                <div className="w-5/12">
                    <ClientData
                        client={client}
                        setClient={setClient}
                        setUpdate={setUpdate}
                        update={update}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>

            <div className="divider my-6" />

            <ClientAttachments client={client} setClient={setClient} />
            <div className="divider my-6" />

            <Sessions client={client} setClient={setClient} />
        </div>
    )
}
