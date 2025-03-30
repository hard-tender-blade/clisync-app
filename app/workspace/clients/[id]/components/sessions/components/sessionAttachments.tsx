import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'
import { MdDownload } from 'react-icons/md'
import AttachmentModal from '../../clientAttachments/modals/attachment'
import { Session, SessionAttachment } from '@/modules/shared/types/mainTypes'
import { hideLoading, showLoading } from '@/modules/client/utils/loading/loadingModule'
import deleteSessionsAttachment from '@/modules/client/query/sessions/deleteSessionAttachment'
import { showAlert } from '@/modules/client/utils/alert/alerts'

export default function SessionAttachments({
    session,
    setSession,
}: {
    session: Session
    setSession: (session: Session) => void
}) {
    const handleDeleteAttachment = async (id: string) => {
        showLoading()
        const ok = await deleteSessionsAttachment(id)
        if (!ok) {
            showAlert(
                'error',
                'short',
                'Failed to delete attachment, contact support please.',
            )
            hideLoading()
            return
        }

        setSession({
            ...session,
            sessionsAttachments: session.sessionsAttachments.filter((sa) => sa.id !== id),
        })
        hideLoading()
        showAlert('success', 'short', 'Attachment deleted successfully')
    }

    const [attachmentModal, setAttachmentModal] = useState<{
        open: boolean
        attachment: SessionAttachment | null
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

    const handleSelectFile = (file: SessionAttachment) => {
        setAttachmentModal({
            ...attachmentModal,
            open: true,
            attachment: file,
        })
    }

    return (
        <div className="flex flex-col-reverse gap-2">
            <AttachmentModal data={attachmentModal} />
            {session.sessionsAttachments.map((sa, i) => (
                <div key={i} className="flex items-center gap-1 ">
                    <button className="btn btn-sm" onClick={() => handleSelectFile(sa)}>
                        {sa.fileName}
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
                                <a href={sa.path} download>
                                    <MdDownload />
                                    Download
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-error"
                                    onClick={() => {
                                        handleDeleteAttachment(sa.id)
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
            <div className="divider m-0 w-4/12" />
        </div>
    )
}
