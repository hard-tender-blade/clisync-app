/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import Header from './blocks/header'
import { BlockInterface, ParagraphInterface, useEditor } from './context/editorContext'
import List from './blocks/list/list'
import { IoAddOutline, IoCubeOutline } from 'react-icons/io5'
import Tools from './tools'
import OrderedList from './blocks/orderedList/orderedList'
import { v4 } from 'uuid'
import { CgTrashEmpty } from 'react-icons/cg'
import Quote from './blocks/quote'
import YoutubeEmbed from './blocks/youtubeEmbed'
import Paragraph from './blocks/paragraph'
import Links from './blocks/links/links'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import AiTools from './aiTools'

const li = {
    createNewBlock: 'New',
    changeBlockType: 'Change',
    deleteBlock: 'Delete',
    aiTools: 'Ai Tools',
}

export default function BlockContainer({
    item,
    index,
}: {
    item: BlockInterface
    index: number
}) {
    const { data, setData, focusNextBlock, deleteBlock, focusedId, setFocusedId } =
        useEditor()

    const [showTools, setShowTools] = React.useState(false)
    const [showAiTools, setShowAiTools] = React.useState(false)

    useEffect(() => {
        if (
            (item.type === 'paragraph' || item.type === 'header') &&
            item.data.text === '/'
        )
            setShowTools(true)
        else setShowTools(false)
    }, [item, data])

    useEffect(() => {
        if (
            (item.type === 'paragraph' || item.type === 'header') &&
            item.data.text === '/'
        )
            setShowAiTools(true)
        else setShowAiTools(false)
    }, [item, data])

    useEffect(() => {
        console.log(showTools)

        if (showAiTools) {
            setShowTools(false)
        }

        if (showTools) {
            setShowAiTools(false)
        }
    }, [showAiTools, showTools])

    const handleCreateBlock = () => {
        const newBlocks = [...data]
        const id = v4()
        const newBlock: ParagraphInterface = {
            id,
            type: 'paragraph',
            data: {
                text: '',
            },
        }
        newBlocks.splice(index + 1, 0, newBlock)
        setData(newBlocks)
        focusNextBlock(id)
    }

    // mirek, this is wrapper for every block in the editor, i use it to show "add new blocks, delete, change block" buttons
    // you should use it to add your button like ai to do something
    // you can directly access block item (it can be p or h1 etc) in item variable (this component argument)
    //
    //
    // try to create func like this :

    const processAi = (item: BlockInterface, prompt: string) => {
        const newBlocks = [...data]

        // do some stuff

        // set new blocl
        // newBlocks.splice(index + 1, 0, newBlock)
        setData(newBlocks)
    }

    // you can try to put it to the context func so you can call it everywhere in editor, see delete func as inspiration(line 29 i importing it form context)
    // GL

    return (
        <div
            key={item.id}
            className={`relative w-full ${item.type === 'header' ? 'mt-6' : ''}`}
            onFocus={() => setFocusedId(item.id)}
        >
            <div className="absolute z-10 flex -translate-x-[100%] gap-2 pr-4">
                <div className="tooltip" data-tip={li.createNewBlock}>
                    <button
                        tabIndex={-1}
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-base-200 p-0 duration-0 hover:bg-base-300 ${
                            item.id === focusedId ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={handleCreateBlock}
                    >
                        <IoAddOutline className="h-5 w-5" />
                    </button>
                </div>

                <div className="tooltip" data-tip={li.changeBlockType}>
                    <button
                        tabIndex={-1}
                        className={` flex h-10 w-10 items-center justify-center rounded-full bg-base-200 p-0 duration-0 hover:bg-base-300 ${
                            item.id === focusedId ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={() => {
                            setShowTools(!showTools)
                        }}
                    >
                        <div>
                            <IoCubeOutline className="h-5 w-5" />
                        </div>
                    </button>
                </div>
            </div>

            <div className="absolute right-0 z-10 flex translate-x-[100%] gap-2 pl-4">
                <div className="tooltip" data-tip={li.deleteBlock}>
                    <button
                        tabIndex={-1}
                        className={` flex h-10 w-10 items-center justify-center rounded-full bg-base-200 p-0 duration-0 hover:bg-base-300 ${
                            item.id === focusedId ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={() => deleteBlock(item.id)}
                    >
                        <CgTrashEmpty className="h-5 w-5" />
                    </button>
                </div>

                <div className="tooltip" data-tip={li.aiTools}>
                    <button
                        tabIndex={-1}
                        className={` flex h-10 w-10 items-center justify-center rounded-full bg-base-200 p-0 duration-0 hover:bg-base-300 ${
                            item.id === focusedId ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={() => {
                            setShowAiTools(!showAiTools)
                        }}
                    >
                        <FaWandMagicSparkles className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {showTools && <Tools index={index} item={item} setShowTools={setShowTools} />}
            {showAiTools && (
                <AiTools index={index} item={item} setShowTools={setShowAiTools} />
            )}
            <div className="flex w-full">
                {item.type === 'paragraph' && <Paragraph item={item} index={index} />}
                {item.type === 'header' && <Header item={item} index={index} />}
                {item.type === 'list' && <List item={item} index={index} />}
                {item.type === 'ordered-list' && (
                    <OrderedList item={item} index={index} />
                )}
                {item.type === 'quote' && <Quote item={item} index={index} />}
                {item.type === 'youtube-embed' && (
                    <YoutubeEmbed item={item} index={index} />
                )}
                {item.type === 'links' && <Links item={item} index={index} />}
            </div>
        </div>
    )
}
