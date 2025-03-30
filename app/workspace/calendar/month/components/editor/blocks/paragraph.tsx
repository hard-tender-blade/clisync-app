import { ParagraphInterface, useEditor } from '../context/editorContext'
import { v4 } from 'uuid'
import sanitizeHtml from 'sanitize-html'
import Contenteditable from '../components/contentEditable'
import blogConfig from '../config'

export default function Paragraph({
    item,
    index,
}: {
    item: ParagraphInterface
    index: number
}) {
    const c = blogConfig
    const li = c.li.tools.p

    const { data, setData, focusNextBlock, deleteBlock } = useEditor()

    const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        const newData = [...data]
        const id = v4()
        const newBlock: ParagraphInterface = {
            type: 'paragraph',
            id,
            data: { text: '' },
        }
        newData.splice(index + 1, 0, newBlock)
        setData([...newData])
        focusNextBlock(id)
    }

    const handleBackspaceKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (sanitizeHtml(item.data.text, { allowedTags: [] }) !== '') return
        e.preventDefault()
        deleteBlock(item.id)
    }

    // on change handler
    const handleContentChange = (updatedContent: string) => {
        const sanitizeConf = {
            allowedTags: ['b', 'i', 'a', 'p'],
            allowedAttributes: { a: ['href'] },
        }

        const newText = sanitizeHtml(updatedContent, sanitizeConf)
        const newData = [...data]
        newData[index] = { ...item, data: { text: newText } }

        setData([...newData])
    }

    return (
        <Contenteditable
            id={item.id}
            value={item.data.text}
            onChange={handleContentChange}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) handleEnterKey(e)
                if (e.key === 'Backspace') handleBackspaceKey(e)
            }}
            className="textarea w-full rounded-none border-0 border-x-2 border-dashed text-lg opacity-70 focus:border-base-300 focus:outline-none focus:ring-0"
            placeholder={li.placeholder}
        />
    )
}
