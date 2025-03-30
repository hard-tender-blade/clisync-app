import React from 'react'
import {
    ParagraphInterface,
    useEditor,
    YoutubeEmbedInterface,
} from '../context/editorContext'
import { v4 } from 'uuid'
import { IoLink } from 'react-icons/io5'
import blogConfig from '../config'

export default function YoutubeEmbed({
    item,
    index,
}: {
    item: YoutubeEmbedInterface
    index: number
}) {
    const c = blogConfig
    const li = c.li.tools.youtubeEmbed

    const { data, setData, focusNextBlock, deleteBlock } = useEditor()
    const [url, setUrl] = React.useState('')

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newData = [...data]
        const id = v4()
        const newBlock: ParagraphInterface = { type: 'paragraph', id, data: { text: '' } }
        newData.splice(index + 1, 0, newBlock)
        setData(newData)
        focusNextBlock(id)
    }

    const handleBackspaceKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (url !== '') return
        e.preventDefault()
        deleteBlock(item.id)
    }

    return (
        <div
            tabIndex={0}
            className="flex w-full flex-col items-center gap-3 border-0 border-x-2 border-dashed border-white px-4 focus-within:border-base-300"
        >
            {item.data.url ? (
                <div className="flex w-full items-center overflow-hidden rounded-xl border-0 border-x-2 border-dashed border-white focus-within:border-base-300">
                    <iframe
                        className="aspect-video w-full"
                        src={item.data.url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <button className="aspect-video w-full rounded-xl border-4 border-dashed border-base-300">
                    <p className="text-center text-lg font-medium">{li.paste}</p>
                </button>
            )}
            <div className="flex w-full items-center ">
                <IoLink className="h-6 w-6" />
                <input
                    id={item.id}
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) handleEnterKey(e)
                        if (e.key === 'Backspace') handleBackspaceKey(e)
                    }}
                    className="input w-full rounded-none border-0 text-lg focus:outline-none focus:ring-0"
                    style={{ resize: 'none', overflow: 'hidden' }} // Disable resizing and hide overflow
                    placeholder="Youtube share link text.."
                />

                <button
                    className="btn"
                    onClick={() => {
                        const newData = [...data]
                        const newBlock: YoutubeEmbedInterface = {
                            ...item,
                            data: {
                                url: `https://www.youtube.com/embed/${url
                                    .split('/')
                                    .pop()}`,
                            },
                        }
                        newData[index] = newBlock
                        setData(newData)
                    }}
                >
                    {li.approve}
                </button>
            </div>
        </div>
    )
}
