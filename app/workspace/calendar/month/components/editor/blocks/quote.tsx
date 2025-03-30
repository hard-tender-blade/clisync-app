import { ParagraphInterface, QuoteInterface, useEditor } from '../context/editorContext'
import { v4 } from 'uuid'
import Contenteditable from '../components/contentEditable'
import sanitizeHtml from 'sanitize-html'
import { FaRegClosedCaptioning } from 'react-icons/fa'
import blogConfig from '../config'

export default function Quote({ item, index }: { item: QuoteInterface; index: number }) {
    const c = blogConfig
    const li = c.li.tools.quote

    const { data, setData, focusNextBlock, focusPreviousBlock, deleteBlock } = useEditor()

    const handleEnterKeyCaption = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        const newData = [...data]
        const id = v4()
        const newBlock: ParagraphInterface = { type: 'paragraph', id, data: { text: '' } }
        newData.splice(index + 1, 0, newBlock)
        setData(newData)
        focusNextBlock(id)
    }

    const handleEnterKeyText = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        focusNextBlock(item.data.caption.id)
    }

    const handleBackspaceKeyCaption = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (sanitizeHtml(item.data.caption.text, { allowedTags: [] }) !== '') return
        e.preventDefault()
        focusPreviousBlock(item.data.content.id)
    }

    const handleBackspaceKeyText = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (sanitizeHtml(item.data.content.text, { allowedTags: [] }) !== '') return
        e.preventDefault()
        deleteBlock(item.id)
    }

    const handleTextChange = (updatedContent: string) => {
        const sanitizeConf = {
            allowedTags: ['b', 'i', 'a', 'p'],
            allowedAttributes: { a: ['href'] },
        }

        const newText = sanitizeHtml(updatedContent, sanitizeConf)

        const newBlock = item
        newBlock.data.content.text = newText
        const newData = [...data]
        newData[index] = newBlock
        setData(newData)
    }

    const handleCaptionChange = (updatedContent: string) => {
        const sanitizeConf = {
            allowedTags: ['b', 'i', 'a', 'p'],
            allowedAttributes: { a: ['href'] },
        }

        const newText = sanitizeHtml(updatedContent, sanitizeConf)

        const newBlock = item
        newBlock.data.caption.text = newText
        const newData = [...data]
        newData[index] = newBlock
        setData(newData)
    }

    return (
        <div className="w-full border-0 border-x-2 border-dashed border-white px-2 focus-within:border-base-300">
            <Contenteditable
                id={item.data.content.id}
                value={item.data.content.text}
                onChange={handleTextChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) handleEnterKeyText(e)
                    if (e.key === 'Backspace') handleBackspaceKeyText(e)
                }}
                className="textarea w-full rounded-none rounded-tr-2xl border-0 border-l-8 border-base-300 border-opacity-40 bg-base-200 bg-opacity-40 text-lg focus:outline-none focus:ring-0"
                placeholder={li.textPlaceholder}
            />

            <div className="flex items-center rounded-br-2xl border-0 border-l-8 border-base-300 border-opacity-40 bg-base-200 bg-opacity-40 pl-4">
                <FaRegClosedCaptioning />
                <Contenteditable
                    id={item.data.caption.id}
                    value={item.data.caption.text}
                    onChange={handleCaptionChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) handleEnterKeyCaption(e)
                        if (e.key === 'Backspace') handleBackspaceKeyCaption(e)
                    }}
                    className="textarea w-full rounded-none border-none bg-transparent text-lg focus:outline-none focus:ring-0"
                    placeholder={li.captionPlaceholder}
                />
            </div>
        </div>
    )
}
