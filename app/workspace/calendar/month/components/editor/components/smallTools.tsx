import React, { useEffect } from 'react'
import { SmallToolsInterface } from './contentEditable'
import { IoLink } from 'react-icons/io5'
import TextModal from './text'

const li = {
    link: 'Odkaz',
    unlink: 'Zrušit odkaz',
    insertLink: 'Odkaz',
}

export default function SmallTools({
    smallTools,
    setSmallTools,
    onChange,
    contentEditableRef,
}: {
    smallTools: SmallToolsInterface
    setSmallTools: (data: SmallToolsInterface) => void
    onChange: (value: string) => void
    contentEditableRef: React.RefObject<HTMLDivElement>
}) {
    const [selection, setSelection] = React.useState<Range | null>(null)

    //Hide the toolbar if clicked outside
    const handleClickOutside = (e: MouseEvent) => {
        const el = document.getElementById('small-tools')
        if (el && !el.contains(e.target as Node)) {
            setSmallTools({ ...smallTools, visible: false })
        }
    }

    //Make the toolbar hidden if clicked outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Apply formatting commands
    const formatText = (command: string) => {
        document.execCommand(command)

        // update data
        onChange(contentEditableRef.current?.innerHTML || '')
    }

    const handleUnlink = () => {
        document.execCommand('unlink')
        setSmallTools({
            ...smallTools,
            link: {
                isLink: false,
                url: null,
            },
        })

        // update data
        onChange(contentEditableRef.current?.innerHTML || '')
    }

    const handleApplyLink = (url: string) => {
        restoreSelection()

        if (selection) {
            const range = selection
            const linkElement = document.createElement('a')
            linkElement.href = url
            linkElement.textContent = range.toString()
            range.deleteContents()
            range.insertNode(linkElement)
        }

        setSmallTools({
            ...smallTools,
            link: {
                isLink: !smallTools.link.isLink,
                url: url,
            },
        })

        // update data
        onChange(contentEditableRef.current?.innerHTML || '')
    }

    function saveSelection() {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
            setSelection(selection.getRangeAt(0))
        }
    }

    function restoreSelection() {
        if (selection) {
            const newSelection = window.getSelection()
            if (!newSelection) return
            newSelection.removeAllRanges()
            newSelection.addRange(selection)
        }
    }

    return (
        <div
            id="small-tools"
            className="border-gray-300 absolute z-10 flex gap-1 rounded-md bg-white p-2 shadow"
            style={{
                top: smallTools.top,
                left: smallTools.left,
                position: 'fixed',
            }}
        >
            <button
                onClick={() => {
                    formatText('bold')
                    setSmallTools({ ...smallTools, isBold: !smallTools.isBold })
                }}
                className={`btn btn-sm ${smallTools.isBold && 'btn-primary'}`}
            >
                B
            </button>
            <button
                onClick={() => {
                    formatText('italic')
                    setSmallTools({ ...smallTools, isItalic: !smallTools.isItalic })
                }}
                className={`btn btn-sm ${smallTools.isItalic && 'btn-primary'}`}
            >
                I
            </button>

            {
                // Show the link input only if the selected text is a link
                smallTools.link.isLink && (
                    <div className="join">
                        <input
                            disabled
                            className="input input-sm join-item input-bordered"
                            placeholder="Email"
                            value={smallTools.link.url || ''}
                        />
                        <button
                            onClick={handleUnlink}
                            className={`btn join-item btn-sm ${
                                smallTools.link.isLink && 'btn-primary'
                            }`}
                        >
                            {li.unlink}
                        </button>
                    </div>
                )
            }

            {
                // Show the link input only if the selected text is not a link
                !smallTools.link.isLink && (
                    <>
                        <button
                            onClick={() => {
                                saveSelection()
                                const el = document.getElementById(
                                    'link-modal',
                                ) as HTMLDivElement
                                el.classList.remove('hidden')
                            }}
                            className={`btn btn-sm ${
                                smallTools.link.isLink && 'btn-primary'
                            }`}
                        >
                            {li.link}
                        </button>

                        <TextModal
                            id="link-modal"
                            title={li.insertLink}
                            placeholder="https://claster.cz"
                            icon={<IoLink className="h-6 w-6" />}
                            onApply={handleApplyLink}
                            onClose={() => {}}
                        />
                    </>
                )
            }
        </div>
    )
}
