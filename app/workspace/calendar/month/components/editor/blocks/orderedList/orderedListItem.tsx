import React from 'react'
import {
    OrderedListInterface,
    ParagraphInterface,
    useEditor,
} from '../../context/editorContext'
import { v4 } from 'uuid'
import Contenteditable from '../../components/contentEditable'
import sanitizeHtml from 'sanitize-html'
import blogConfig from './../../config'

export default function ListItem({
    listItem,
    blockIndex,
    listItemIndex,
    item,
}: {
    listItem: { id: string; text: string }
    blockIndex: number
    listItemIndex: number
    item: OrderedListInterface
}) {
    const c = blogConfig
    const li = c.li.tools.header

    const { data, setData, focusNextBlock, focusPreviousBlock, deleteBlock } = useEditor()

    // Create a new list item above the current one when the enter key is pressed
    // if pressed when current line is empty, delete current line and create a new block and focus on it
    const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (listItem.text === '') {
            e.preventDefault()
            const newData = [...data]
            const id = v4()
            const newBlock: ParagraphInterface = {
                type: 'paragraph',
                id,
                data: { text: '' },
            }
            newData.splice(blockIndex + 1, 0, newBlock)

            //delete current list item
            const newListBlock = item

            // if first line is empty, just create a new block and focus on it
            if (newListBlock.data.items.length === 1) {
                setData(newData)
                focusNextBlock(id)
                return
            }

            newListBlock.data.items.splice(listItemIndex, 1)
            newData[blockIndex] = newListBlock

            setData(newData)
            focusNextBlock(id)
            return
        }
        e.preventDefault()
        const newData = [...data]
        const id = v4()
        const newBlock: OrderedListInterface = item
        newBlock.data.items.splice(listItemIndex + 1, 0, { id, text: '' })
        newData[blockIndex] = newBlock
        setData(newData)
        focusNextBlock(id)
    }

    // if line is empty and backspace is pressed, remove the current list item and focus on the previous one
    // if line is not empty, do nothing
    // if is fist list item, remove list item and focus on the previous block
    const handleBackspaceKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (sanitizeHtml(listItem.text, { allowedTags: [] }) !== '') return
        e.preventDefault()
        if (listItemIndex === 0) {
            deleteBlock(item.id)
            return
        }
        const newBlock = item
        newBlock.data.items.splice(listItemIndex, 1)
        const newData = [...data]
        newData[blockIndex] = newBlock
        setData(newData)
        focusPreviousBlock(newBlock.data.items[listItemIndex - 1].id)
    }

    const handleContentChange = (updatedContent: string) => {
        const sanitizeConf = {
            allowedTags: ['b', 'i', 'a', 'p'],
            allowedAttributes: { a: ['href'] },
        }

        const newText = sanitizeHtml(updatedContent, sanitizeConf)

        const newBlock = item
        newBlock.data.items[listItemIndex].text = newText
        const newData = [...data]
        newData[blockIndex] = newBlock
        setData(newData)
    }

    return (
        <div className="flex gap-2">
            <div className="text-lg">{listItemIndex + 1}.</div>
            <Contenteditable
                id={listItem.id}
                value={listItem.text}
                onChange={handleContentChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) handleEnterKey(e)
                    if (e.key === 'Backspace') handleBackspaceKey(e)
                }}
                className="w-full pr-2 text-lg opacity-70 focus:outline-none"
                placeholder={li.placeholder}
            />
        </div>
    )
}
