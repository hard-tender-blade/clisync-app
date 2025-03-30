/* eslint-disable no-var */
import { useRef, useEffect } from 'react'
import { v4 } from 'uuid'
import {
    BlockInterface,
    useEditor,
    ParagraphInterface,
    HeaderInterface,
    ListInterface,
    OrderedListInterface,
    QuoteInterface,
    YoutubeEmbedInterface,
    LinksInterface,
} from './context/editorContext'
import blogConfig from './config'

const c = blogConfig
const tc = c.toolsConfig
const li = c.liTools

const Tools = ({
    index,
    item,
    setShowTools,
}: {
    index: number
    item: BlockInterface
    setShowTools: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const toolsRef = useRef<HTMLDivElement>(null)
    const { data, setData, focusNextBlock } = useEditor()

    // Focus the first option on mount
    useEffect(() => {
        const firstButton = toolsRef.current?.querySelector('button')
        firstButton?.focus()
    }, [])

    // Handle clicks outside the component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
                setShowTools(false) // Hide tools when clicked outside
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setShowTools])

    // Enable arrow key navigation
    useEffect(() => {
        const buttons = toolsRef.current?.querySelectorAll('button')

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!buttons) return
            const focusedElement = document.activeElement
            const buttonArray = Array.from(buttons)
            const currentIndex = buttonArray.indexOf(focusedElement as HTMLButtonElement)

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                const nextIndex = (currentIndex + 1) % buttonArray.length
                buttonArray[nextIndex]?.focus()
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                const prevIndex =
                    (currentIndex - 1 + buttonArray.length) % buttonArray.length
                buttonArray[prevIndex]?.focus()
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                const prevIndex =
                    (currentIndex - 1 + buttonArray.length) % buttonArray.length
                buttonArray[prevIndex]?.focus()
            } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                const nextIndex = (currentIndex + 1) % buttonArray.length
                buttonArray[nextIndex]?.focus()
            } else if (e.key === 'Escape') {
                e.preventDefault()
                setShowTools(false)
                focusNextBlock(data[index].id)
            }
        }

        toolsRef.current?.addEventListener('keydown', handleKeyDown)

        return () => {
            toolsRef.current?.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div
            ref={toolsRef}
            className="absolute z-10 flex w-min -translate-y-full gap-2 rounded-md bg-white p-2 pr-28 shadow"
        >
            <div className="join">
                {tc.paragraph && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'paragraph' ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            if (newText === '/') newText = ''

                            const newBlocks = [...data]
                            const id = v4()
                            const newBlock: ParagraphInterface = {
                                id,
                                type: 'paragraph',
                                data: { text: newText },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.p}
                    </button>
                )}

                {tc.header1 && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'header' && item.data.level === 1
                                ? 'bg-primary text-white'
                                : ''
                        }`}
                        onClick={() => {
                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            if (newText === '/') newText = ''

                            const newBlocks = [...data]
                            const id = v4()

                            const newBlock: HeaderInterface = {
                                id,
                                type: 'header',
                                data: { text: newText, level: 1 },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.h1}
                    </button>
                )}

                {tc.header2 && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'header' && item.data.level === 2
                                ? 'bg-primary text-white'
                                : ''
                        }`}
                        onClick={() => {
                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            if (newText === '/') newText = ''

                            const newBlocks = [...data]
                            const id = v4()

                            const newBlock: HeaderInterface = {
                                id,
                                type: 'header',
                                data: { text: newText, level: 2 },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.h2}
                    </button>
                )}

                {tc.header3 && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'header' && item.data.level === 3
                                ? 'bg-primary text-white'
                                : ''
                        }`}
                        onClick={() => {
                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            if (newText === '/') newText = ''

                            const newBlocks = [...data]
                            const id = v4()

                            const newBlock: HeaderInterface = {
                                id,
                                type: 'header',
                                data: { text: newText, level: 3 },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.h3}
                    </button>
                )}

                {tc.header4 && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'header' && item.data.level === 4
                                ? 'bg-primary text-white'
                                : ''
                        }`}
                        onClick={() => {
                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            if (newText === '/') newText = ''

                            const newBlocks = [...data]
                            const id = v4()

                            const newBlock: HeaderInterface = {
                                id,
                                type: 'header',
                                data: { text: newText, level: 4 },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.h4}
                    </button>
                )}

                {tc.list && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'list' ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                            const newBlocks = [...data]
                            const id = v4()
                            const newBlock: ListInterface = {
                                id: v4(),
                                type: 'list',
                                data: {
                                    items: [{ id, text: '' }],
                                },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.list}
                    </button>
                )}

                {tc.orderedList && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'ordered-list' ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                            const newBlocks = [...data]
                            const id = v4()
                            const newBlock: OrderedListInterface = {
                                id: v4(),
                                type: 'ordered-list',
                                data: {
                                    items: [{ id, text: '' }],
                                },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.orderedList}
                    </button>
                )}

                {tc.quote && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'quote' ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            if (newText === '/') newText = ''

                            const newBlocks = [...data]
                            const id = v4()
                            const newBlock: QuoteInterface = {
                                id: v4(),
                                type: 'quote',
                                data: {
                                    content: { id, text: newText },
                                    caption: { id: v4(), text: '' },
                                },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.quote}
                    </button>
                )}

                {tc.youtubeEmbed && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'youtube-embed' ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                            const newBlocks = [...data]
                            const id = v4()
                            const newBlock: YoutubeEmbedInterface = {
                                id,
                                type: 'youtube-embed',
                                data: { url: '' },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.youtubeEmbed}
                    </button>
                )}

                {tc.links && (
                    <button
                        className={`btn join-item btn-sm ${
                            item.type === 'links' ? 'bg-primary text-white' : ''
                        }`}
                        onClick={() => {
                            const newBlocks = [...data]
                            const id = v4()
                            const newBlock: LinksInterface = {
                                id: v4(),
                                type: 'links',
                                data: {
                                    items: [
                                        {
                                            id: v4(),
                                            text: {
                                                id,
                                                text: '',
                                            },
                                            url: {
                                                id: v4(),
                                                text: '',
                                            },
                                        },
                                    ],
                                },
                            }
                            newBlocks[index] = newBlock
                            setData(newBlocks)
                            setShowTools(false)
                            focusNextBlock(id)
                        }}
                    >
                        {li.links}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Tools
