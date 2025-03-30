import React, { useState, useEffect, useRef } from 'react'
import sanitizeHtml from 'sanitize-html'
import { twMerge } from 'tailwind-merge'
import './styles.css'
import SmallTools from './smallTools'

export interface SmallToolsInterface {
    top: number
    left: number
    visible: boolean
    isBold: boolean
    isItalic: boolean
    link: {
        isLink: boolean
        url: string | null
    }
}

export default function Contenteditable({
    id,
    value,
    onChange,
    className,
    onKeyDown,
    placeholder,
}: {
    id: string
    value: string
    onChange: (value: string) => void
    className?: string
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
    placeholder?: string
}) {
    const contentEditableRef = useRef<HTMLDivElement>(null)
    const [smallTools, setSmallTools] = useState<SmallToolsInterface>({
        top: 0,
        left: 0,
        visible: false,
        isBold: false,
        isItalic: false,
        link: {
            isLink: false,
            url: null,
        },
    })

    useEffect(() => {
        if (!contentEditableRef.current) return
        if (
            contentEditableRef.current.textContent !==
                sanitizeHtml(value, {
                    allowedTags: [],
                }) ||
            ''
        ) {
            contentEditableRef.current.innerHTML = value
        }
    }, [value])

    // Handle text selection and show the toolbar
    const handleSelection = () => {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0 && selection.toString()) {
            const range = selection.getRangeAt(0)
            const rect = range.getBoundingClientRect()

            const format = checkFormat()
            // Calculate position for the tooltip (above the selected text)
            setSmallTools({
                top: rect.top - 50, // Adjust the Y offset to place tooltip above text
                left: rect.left + rect.width / 2 - 50, // Center it horizontally
                visible: true,
                isBold: format?.isBold || false,
                isItalic: format?.isItalic || false,
                link: {
                    isLink: format?.isLink || false,
                    url: format?.url || null,
                },
            })
        }
    }

    const checkFormat = () => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        const range = selection.getRangeAt(0)
        let parent = range.commonAncestorContainer

        // Ensure we are working with an element, not a text node
        if (parent.nodeType === 3) {
            // If it's a text node, get its parent element
            parent = (parent.parentElement as Node) || parent
        }

        // Find the closest <a> tag
        const linkElement = (parent as Element).closest('a')

        return {
            isBold: document.queryCommandState('bold'),
            isItalic: document.queryCommandState('italic'),
            isLink: !!linkElement, // Boolean indicating if it's inside a link
            url: linkElement?.href, // The URL if it's a link, otherwise null
        }
    }

    return (
        <>
            <div
                id={id}
                contentEditable="true"
                ref={contentEditableRef}
                onInput={(event) => {
                    onChange((event.target as HTMLDivElement).innerHTML || '')
                }}
                className={twMerge('contentEditable', className)}
                onKeyDown={onKeyDown}
                onMouseUp={handleSelection}
                data-placeholder={placeholder}
            />

            {smallTools.visible && (
                <SmallTools
                    smallTools={smallTools}
                    setSmallTools={setSmallTools}
                    onChange={onChange}
                    contentEditableRef={contentEditableRef}
                />
            )}
        </>
    )
}
