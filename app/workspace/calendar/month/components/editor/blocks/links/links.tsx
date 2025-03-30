import React from 'react'
import { LinksInterface } from '../../context/editorContext'
import LinksItem from './linksItem'

export default function Links({
    item: block,
    index: blockIndex,
}: {
    item: LinksInterface
    index: number
}) {
    return (
        <div
            id={block.id}
            className="flex min-h-12 w-full flex-col gap-3 border-0 border-x-2 border-dashed border-white pl-6 focus-within:border-base-300"
        >
            {block.data.items.map((linksItem, linksItemIndex) => {
                return (
                    <LinksItem
                        key={linksItem.id}
                        linksItem={linksItem}
                        linksItemIndex={linksItemIndex}
                        block={block}
                        blockIndex={blockIndex}
                    />
                )
            })}
            {/* <div className="mr-4 h-10 w-10">
                <button
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-base-200 p-0 duration-0 hover:bg-base-300`}
                >
                    <IoAddOutline className="h-5 w-5" />
                </button>
            </div> */}
        </div>
    )
}
