import React, { ReactNode, useState } from 'react'
import { BlockInterface, EditorContext } from './editorContext'
import { v4 } from 'uuid'
import blogConfig from '../config'

export const EditorProvider = ({
    children,
    blocks: data,
    setBlocks: setData,
}: {
    children: ReactNode
    blocks: BlockInterface[]
    setBlocks: (blocks: BlockInterface[]) => void
}) => {
    const c = blogConfig

    const [focusedId, setFocusedId] = useState<string>()

    const focusById = async (id: string, moveCursorToEnd: boolean) => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

        for (let i = 0; i < 10; i++) {
            const el = document.getElementById(id)

            if (el) {
                el.focus()

                if (moveCursorToEnd && el.isContentEditable && el.textContent) {
                    const range = document.createRange()
                    range.selectNodeContents(el)
                    range.collapse(false)
                    const selection = window.getSelection()
                    selection?.removeAllRanges()
                    selection?.addRange(range)
                }

                return // Exit if element is found and focused
            }

            await delay(100) // Wait 100ms before retrying
        }

        console.error('Element not found after 10 tries.')
    }

    const focusPreviousBlock = (id: string, from: string = 'idk') => {
        const block = data.find((block) => block.id === id) // Block can be undefined
        if (block && (block.type === 'list' || block.type === 'ordered-list')) {
            const lastItem = block.data.items[block.data.items.length - 1]
            focusById(lastItem.id, true)
            return
        }
        if (block && block.type === 'image') {
            focusById(block.data.caption.id, true)
            return
        }
        if (block && block.type === 'links') {
            const lastItem = block.data.items[block.data.items.length - 1]
            focusById(lastItem.url.id, true)
            return
        }
        focusById(id, true)
    }

    const focusNextBlock = (id: string) => {
        const block = data.find((block) => block.id === id) // Block can be undefined
        if (block && (block.type === 'list' || block.type === 'ordered-list')) {
            const firstItem = block.data.items[0]
            focusById(firstItem.id, true)
            return
        }
        if (block && block.type === 'image') {
            focusById(block.data.caption.id, true)
            return
        }
        if (block && block.type === 'links') {
            const firstItem = block.data.items[0]
            focusById(firstItem.text.id, true)
            return
        }
        focusById(id, true)
    }

    const deleteBlock = async (id: string) => {
        if (data.length === 1) {
            const id = v4()
            setData([
                {
                    id,
                    type: 'paragraph',
                    data: {
                        text: '',
                    },
                },
            ])
            focusNextBlock(id)
            return
        }
        const indexOfBlockToBeDeleted = data.findIndex((block) => block.id === id)
        if (indexOfBlockToBeDeleted === -1) return

        const newBlocks = data.filter((block) => block.id !== id)
        setData(newBlocks)
        if (indexOfBlockToBeDeleted === 0) {
            focusNextBlock(newBlocks[0].id)
            return
        }
        focusPreviousBlock(newBlocks[indexOfBlockToBeDeleted - 1].id)
    }

    return (
        <EditorContext.Provider
            value={{
                data,
                setData,
                focusPreviousBlock,
                focusNextBlock,
                focusedId,
                setFocusedId,
                deleteBlock,
            }}
        >
            {children}
        </EditorContext.Provider>
    )
}
