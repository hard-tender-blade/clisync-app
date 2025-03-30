import ModalV2 from '@/modules/client/utils/modalV2/modalV2'
import publicConfig from '@/modules/shared/config/publicConfig'
import { ClientAttachment, SessionAttachment } from '@/modules/shared/types/mainTypes'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdDownload } from 'react-icons/md'

interface AttachmentModalProps {
    open: boolean
    attachment: ClientAttachment | SessionAttachment | null
    requestClose: () => void
    handleDeleteAttachment: (id: string) => Promise<void>
}

export default function AttachmentModal({ data }: { data: AttachmentModalProps }) {
    if (!data.open || !data.attachment) return null

    return (
        <ModalV2 requestClose={data.requestClose}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-12">
                    <p className="p-bold overflow-hidden text-ellipsis  whitespace-nowrap">
                        {data.attachment.fileName}
                    </p>
                    <div className="flex gap-2">
                        <a
                            className="btn btn-sm"
                            href={`${publicConfig.next_public_origin}${data.attachment.path}`}
                            download
                        >
                            <MdDownload />
                        </a>
                        <button
                            className="btn btn-sm"
                            onClick={async () => {
                                if (!data.attachment) return
                                await data.handleDeleteAttachment(data.attachment.id)
                                data.requestClose()
                            }}
                        >
                            <FaRegTrashAlt />
                        </button>
                        <button className="btn btn-sm" onClick={data.requestClose}>
                            <div className="flex items-center gap-1 text-sm">
                                <IoClose />
                                Close
                            </div>
                        </button>
                    </div>
                </div>
                <div className="aspect-square h-[70vh] rounded-lg border-2 border-solid border-base-200">
                    {['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(
                        data.attachment.fileName.split('.').pop() || '',
                    ) && (
                        <img
                            src={`${publicConfig.next_public_origin}${data.attachment.path}`}
                            alt=""
                            className="h-full w-full object-contain"
                        />
                    )}
                    {['pdf'].includes(
                        data.attachment.fileName.split('.').pop() || '',
                    ) && (
                        <iframe
                            src={`${publicConfig.next_public_origin}${data.attachment.path}`}
                            className="h-full w-full"
                        ></iframe>
                    )}
                    {!['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'].includes(
                        data.attachment.fileName.split('.').pop() || '',
                    ) && (
                        <div className="flex h-full w-full flex-col items-center justify-center p-12 text-center">
                            <p className="p-bold">
                                Preview not available for this file type.
                            </p>
                            <p className="">
                                Preview is available only for .pdf, .jpg, .jpeg, .png,
                                .gif, .webp.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ModalV2>
    )
}
