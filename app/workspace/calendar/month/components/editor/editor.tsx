import React, { useEffect } from 'react'
import { EditorProvider } from './context/editorProvider'
import Mapper from './mapper'
import { BlockInterface } from './context/editorContext'

export default function Editor({
    blocks,
    setBlocks,
}: {
    blocks: BlockInterface[]
    setBlocks: (blocks: BlockInterface[]) => void
}) {
    // mirek, here you can log data, basically note blocks

    return (
        <div className="w-full px-28 py-12">
            <EditorProvider blocks={blocks} setBlocks={setBlocks}>
                <Mapper />
            </EditorProvider>
        </div>
    )
}
