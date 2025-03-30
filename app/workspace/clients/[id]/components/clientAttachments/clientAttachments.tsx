import getClientById from '@/modules/client/query/clients/getClientById'
import { Client, ClientAttachment } from '@/modules/shared/types/mainTypes'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import React, { useState } from 'react'
import createClientAttachment from '@/modules/client/query/clients/createClientAttacment'
import deleteClientAttachment from '@/modules/client/query/clients/deleteClientAttacment'
import { hideLoading, showLoading } from '@/modules/client/utils/loading/loadingModule'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdDownload } from 'react-icons/md'
import AttachmentModal from './modals/attachment'

export default function ClientAttachments({
    client,
    setClient,
}: {
    client: Client
    setClient: (client: Client) => void
}) {
    const handleAddAttachmentBtnClick = () => {
        //create input and click it
        const input = document.createElement('input')
        input.type = 'file'
        input.multiple = true
        //@ts-ignore
        input.onchange = handleFilesChange
        input.click()
        //remove input
        input.remove()
    }
    const handleFilesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const selectedFiles = event.target.files
        const formData = new FormData()
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i])
        }

        showLoading()
        const updatedClient = await createClientAttachment(client.id, formData)
        if (!updatedClient) {
            showAlert(
                'error',
                'short',
                'Failed to save attachments, contact support please.',
            )
            hideLoading()
            return
        }
        setClient(updatedClient)
        hideLoading()
        showAlert('success', 'short', 'Attachments saved successfully.')
    }

    //todo optimize this lol
    const handleDeleteAttachment = async (id: string) => {
        showLoading()
        const ok = await deleteClientAttachment(id)
        if (!ok) {
            showAlert(
                'error',
                'short',
                'Failed to delete attachment, contact support please.',
            )
            hideLoading()
            return
        }
        const updatedClient = await getClientById(client.id)
        if (!updatedClient) {
            showAlert(
                'error',
                'short',
                'Failed to get updated client, contact support please.',
            )
            hideLoading()
            return
        }
        hideLoading()
        setClient(updatedClient)
        showAlert('success', 'short', 'Attachment deleted successfully')
    }

    const [attachmentModal, setAttachmentModal] = useState<{
        open: boolean
        attachment: ClientAttachment | null
        requestClose: () => void
        handleDeleteAttachment: (id: string) => Promise<void>
    }>({
        open: false,
        attachment: null,
        requestClose: () => {
            setAttachmentModal({
                ...attachmentModal,
                open: false,
                attachment: null,
            })
        },
        handleDeleteAttachment,
    })

    const handleSelectFile = (file: ClientAttachment) => {
        setAttachmentModal({
            ...attachmentModal,
            open: true,
            attachment: file,
        })
    }

    return (
        <div className="px-2">
            <AttachmentModal data={attachmentModal} />
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-xl">Attachments</span>
                <button className="btn btn-sm" onClick={handleAddAttachmentBtnClick}>
                    +
                </button>
            </div>
            <div className="flex flex-col-reverse gap-2">
                {client.clientAttachments.map((ca, i) => (
                    <div key={i} className="flex items-center gap-1 ">
                        <button
                            className="btn btn-sm"
                            onClick={() => handleSelectFile(ca)}
                        >
                            {ca.fileName}
                        </button>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-sm">
                                <BsThreeDots className="h-5 w-5" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow"
                            >
                                <li>
                                    <a href={ca.path} download>
                                        <MdDownload />
                                        Download
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-error"
                                        onClick={() => {
                                            handleDeleteAttachment(ca.id)
                                        }}
                                    >
                                        <FaRegTrashAlt />
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
