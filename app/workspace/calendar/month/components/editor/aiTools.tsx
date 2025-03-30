/* eslint-disable no-var */
import { readStreamableValue } from 'ai/rsc'
import { useEffect, useRef, useState } from 'react'
import { aiOrganize } from './actions/aiOrganize'
import { aiSimplify } from './actions/aiSimplify'
import blogConfig from './config'
import { BlockInterface, ParagraphInterface, useEditor } from './context/editorContext'

const c = blogConfig
const tc = c.aiToolsConfig
const li = c.liAiTools

const AiTools = ({
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

    const [isSimplifying, setIsSimplifying] = useState(false)
    const [isOrganizing, setIsOrganizing] = useState(false)

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
                {tc.simplify && (
                    <button
                        className={`btn join-item btn-sm`}
                        onClick={async () => {
                            setIsSimplifying(true)

                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            const blocks = [...data]

                            const { output } = await aiSimplify(newText)

                            newText = ''
                            for await (const delta of readStreamableValue(output)) {
                                newText += delta

                                blocks[index].data = { text: newText }

                                setData(blocks)
                            }
                            setShowTools(false)
                            setIsSimplifying(false)
                        }}
                    >
                        {li.simplify}
                    </button>
                )}

                {tc.organize && (
                    <button
                        className={`btn join-item btn-sm`}
                        onClick={async () => {
                            setIsSimplifying(true)

                            var newText = ''
                            if (
                                data[index].type === 'paragraph' ||
                                data[index].type === 'header' ||
                                data[index].type === 'quote'
                            ) {
                                newText = (data[index] as ParagraphInterface).data.text
                            }

                            const blocks = [...data]

                            const { output } = await aiOrganize(newText)

                            newText = ''
                            for await (const delta of readStreamableValue(output)) {
                                newText += delta

                                blocks[index].data = { text: newText }

                                setData(blocks)
                            }
                            setShowTools(false)
                            setIsSimplifying(false)
                        }}
                    >
                        {li.organize}
                    </button>
                )}
            </div>
        </div>
    )
}

export default AiTools
