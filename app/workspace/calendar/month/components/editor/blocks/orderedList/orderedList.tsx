import React, { useEffect } from 'react'
import { OrderedListInterface } from '../../context/editorContext'
import ListItem from './orderedListItem'

export default function OrderedList({
    item,
    index: blockIndex,
}: {
    item: OrderedListInterface
    index: number
}) {
    const listRef = React.useRef<HTMLDivElement>(null)
    const [focusIndex, setFocusIndex] = React.useState<number>()

    useEffect(() => {
        if (focusIndex !== undefined && listRef.current) {
            const allChildren = listRef.current.children
            const el = allChildren[focusIndex] as HTMLDivElement
            if (el) el.focus()
            setFocusIndex(undefined)
        }
    }, [focusIndex])

    return (
        <div
            id={item.id}
            ref={listRef}
            className="flex min-h-12 w-full flex-col gap-3 border-0 border-x-2 border-dashed border-white pl-6 focus-within:border-base-300"
        >
            {item.data.items.map((listItem, listItemIndex) => {
                return (
                    <ListItem
                        key={listItem.id}
                        item={item}
                        listItem={listItem}
                        listItemIndex={listItemIndex}
                        blockIndex={blockIndex}
                    />
                )
            })}
        </div>
    )
}
