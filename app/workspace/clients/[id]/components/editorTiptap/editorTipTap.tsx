'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolTipMenu from './bubbleMenu'
import Placeholder from '@tiptap/extension-placeholder'
import './editorTipTap.css'

const TiptapEditor = ({
    data,
    setData,
    children,
}: {
    data: string
    setData: (data: string) => void
    children?: React.ReactNode
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                // Use a placeholder:
                placeholder: 'Write something …',
                // Use different placeholders depending on the node type:
                // placeholder: ({ node }) => {
                //   if (node.type.name === 'heading') {
                //     return 'What’s the title?'
                //   }

                //   return 'Can you add some further context?'
                // },
            }),
        ],
        content: data,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            setData(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none default',
            },
        },
    })

    return (
        <>
            {editor && <ToolTipMenu editor={editor} />}
            {children}
            <EditorContent editor={editor} />
        </>
    )
}

export default TiptapEditor
