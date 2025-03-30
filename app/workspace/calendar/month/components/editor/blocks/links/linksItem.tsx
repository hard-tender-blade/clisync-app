import React from 'react'
import {
    LinksInterface,
    ParagraphInterface,
    useEditor,
} from '../../context/editorContext'
import { IoLink } from 'react-icons/io5'
import { MdOutlineTextFields } from 'react-icons/md'
import { v4 } from 'uuid'
import blogConfig from './../../config'

export default function LinksItem({
    linksItem,
    blockIndex,
    linksItemIndex,
    block,
}: {
    linksItem: {
        id: string
        text: {
            id: string
            text: string
        }
        url: {
            id: string
            text: string
        }
    }
    linksItemIndex: number
    block: LinksInterface
    blockIndex: number
}) {
    const c = blogConfig
    const li = c.li.tools.linksItem

    const { data, setData, focusNextBlock, focusPreviousBlock, deleteBlock } = useEditor()

    const handleTextEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (linksItem.text.text === '') {
            // create new paragraph block
            const newBlockId = v4()
            const newBlock: ParagraphInterface = {
                id: newBlockId,
                type: 'paragraph',
                data: {
                    text: '',
                },
            }
            const newBlocks = [...data]
            newBlocks.splice(blockIndex + 1, 0, newBlock)

            //delete current links item
            const newBlockData = block
            newBlockData.data.items.splice(linksItemIndex, 1)
            newBlocks[blockIndex] = newBlockData

            setData(newBlocks)
            focusNextBlock(newBlockId)
            return
        }
        focusNextBlock(linksItem.url.id)
    }

    const handleUrlEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const fistItemTextInNewBlockId = v4()
        const newItem = {
            id: v4(),
            text: {
                id: fistItemTextInNewBlockId,
                text: '',
            },
            url: {
                id: v4(),
                text: '',
            },
        }

        const updatedBlock = block
        updatedBlock.data.items.splice(linksItemIndex + 1, 0, newItem)
        const newBlocks = [...data]
        newBlocks[blockIndex] = updatedBlock
        setData(newBlocks)
        focusNextBlock(fistItemTextInNewBlockId)
    }

    const handleUrlBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (linksItem.url.text !== '') return
        e.preventDefault()
        // go to text
        focusPreviousBlock(linksItem.text.id)
    }

    const handleTextBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (linksItem.text.text !== '') return
        e.preventDefault()

        //if first item in links
        if (linksItemIndex === 0 && linksItem.text.text === '') {
            deleteBlock(block.id)
            return
        }

        //if not first in links
        if (linksItemIndex !== 0 && linksItem.text.text === '') {
            const newBlock = block
            newBlock.data.items.splice(linksItemIndex, 1)
            const newData = data
            newData[blockIndex] = newBlock
            console.log(
                'im about to focus on',
                newBlock.data.items[linksItemIndex - 1].url.id,
            )
            focusPreviousBlock(newBlock.data.items[linksItemIndex - 1].url.id)
            setData(newData)
            return
        }

        // go to text
        focusPreviousBlock(linksItem.text.id)
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.currentTarget.value
        const newLinksItem = {
            ...linksItem,
            text: {
                id: linksItem.text.id,
                text: newText,
            },
        }
        const newBlock = { ...block }
        newBlock.data.items[linksItemIndex] = newLinksItem
        const newData = data
        newData[blockIndex] = newBlock
        setData(newData)
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.currentTarget.value
        const newLinksItem = {
            ...linksItem,
            url: {
                id: linksItem.url.id,
                text: newText,
            },
        }
        const newBlock = { ...block }
        newBlock.data.items[linksItemIndex] = newLinksItem
        const newData = data
        newData[blockIndex] = newBlock
        setData(newData)
    }

    return (
        <div className="flex w-full gap-2">
            <div className="flex w-full items-center gap-2">
                <MdOutlineTextFields className="h-6 w-6" />
                <input
                    id={linksItem.text.id}
                    type="text"
                    className="input input-bordered w-full border-0 focus:outline-none focus:ring-0"
                    value={linksItem.text.text}
                    onChange={(e) => handleTextChange(e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleTextEnter(e)
                        if (e.key === 'Backspace') handleTextBackspace(e)
                    }}
                    placeholder={li.textPlaceholder}
                />
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex w-full items-center gap-2">
                <IoLink className="h-6 w-6" />
                <input
                    id={linksItem.url.id}
                    type="text"
                    className="input input-bordered  w-full border-0 focus:outline-none focus:ring-0"
                    value={linksItem.url.text}
                    onChange={(e) => handleUrlChange(e)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUrlEnter(e)
                        if (e.key === 'Backspace') handleUrlBackspace(e)
                    }}
                    placeholder={li.urlPlaceholder}
                />
            </div>
        </div>
    )
}
