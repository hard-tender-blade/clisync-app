import React, { useEffect, useRef } from 'react'
import { HeaderInterface, ParagraphInterface, useEditor } from '../context/editorContext'
import { v4 } from 'uuid'
import blogConfig from '../config'

export default function Header({
    item,
    index,
}: {
    item: HeaderInterface
    index: number
}) {
    const c = blogConfig
    const li = c.li.tools.header

    const { data, setData, focusNextBlock, deleteBlock } = useEditor()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize the textarea based on the content
    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '8px' // Reset height to calculate scroll height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // Set height based on scroll height
        }
    }

    // Adjust the height when the component mounts or the content changes
    useEffect(() => {
        adjustHeight()
    }, [item.data.text])

    const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const newData = [...data]
        const id = v4()
        const newBlock: ParagraphInterface = { type: 'paragraph', id, data: { text: '' } }
        newData.splice(index + 1, 0, newBlock)
        setData(newData)
        focusNextBlock(id)
    }

    const handleBackspaceKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (item.data.text !== '') return
        e.preventDefault()
        deleteBlock(item.id)
    }

    const getSizeByLevel = (level: 1 | 2 | 3 | 4) => {
        switch (level) {
            case 1:
                return 'text-5xl font-bold'
            case 2:
                return 'text-4xl font-bold'
            case 3:
                return 'text-2xl font-semibold'
            case 4:
                return 'text-xl font-medium'
        }
    }

    return (
        <textarea
            id={item.id}
            ref={textareaRef}
            value={item.data.text}
            onChange={(e) => {
                const newText = e.target.value
                const newData = [...data]
                newData[index] = {
                    ...item,
                    data: { text: newText, level: item.data.level },
                }
                setData(newData)
                adjustHeight() // Adjust height on text change
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) handleEnterKey(e)
                if (e.key === 'Backspace') handleBackspaceKey(e)
            }}
            className={`${getSizeByLevel(
                item.data.level,
            )} textarea w-full rounded-none border-0 border-x-2 border-dashed focus:border-base-300 focus:outline-none focus:ring-0`}
            style={{ resize: 'none', overflow: 'hidden', height: '10px' }} // Disable resizing and hide overflow
            placeholder={li.placeholder}
        />
    )
}
