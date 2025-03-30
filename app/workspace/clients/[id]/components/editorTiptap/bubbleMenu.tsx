import { BubbleMenu, Editor } from '@tiptap/react'

import React from 'react'
import { FaBold, FaItalic, FaListOl, FaListUl } from 'react-icons/fa6'
import './bubbleMenu.css'

export default function ToolTipMenu({ editor }: { editor: Editor }) {
    const defaultItemStyles =
        'btn join-item btn bg-base-100 border-base-100 rounded-none shadow-none'
    const defaultItemStylesActive =
        'btn btn join-item bg-base-100 border-base-100 text-primary rounded-none shadow-none'

    return (
        <div>
            <BubbleMenu
                className="flex w-[420px] items-center bg-base-100"
                tippyOptions={{ duration: 100 }}
                editor={editor}
            >
                <div className="flex overflow-hidden rounded-lg border-2  border-solid border-base-300">
                    <button
                        className={
                            editor.isActive('heading', { level: 1 })
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        }
                    >
                        H1
                    </button>
                    <button
                        className={
                            editor.isActive('heading', { level: 2 })
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        }
                    >
                        H2
                    </button>
                    <button
                        className={
                            editor.isActive('heading', { level: 3 })
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 3 }).run()
                        }
                    >
                        H3
                    </button>
                    <button
                        className={
                            editor.isActive('paragraph')
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() => editor.chain().focus().setParagraph().run()}
                    >
                        P
                    </button>

                    <div className="divider divider-horizontal mx-1 my-3 w-1" />

                    <button
                        className={
                            editor.isActive('bold')
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <FaBold />
                    </button>
                    <button
                        className={
                            editor.isActive('italic')
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <FaItalic />
                    </button>
                    {/* <button
                    className={
                        editor.isActive('strike')
                        ? defaultItemStylesActive
                            : defaultItemStyles
                    }
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <FaStrikethrough />
                </button> */}
                    {/* <button
                    className={defaultItemStyles}
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                >
                <FaXmark />
                </button> */}

                    <div className="divider divider-horizontal mx-1 my-3 w-1" />

                    <button
                        className={
                            editor.isActive('bulletList')
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <FaListUl />
                    </button>
                    <button
                        className={
                            editor.isActive('orderedList')
                                ? defaultItemStylesActive
                                : defaultItemStyles
                        }
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <FaListOl />
                    </button>

                    {/* <button
                    className={defaultItemStyles}
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    >
                    <FaXmark />
                    </button> */}
                </div>
            </BubbleMenu>
        </div>
    )
}
