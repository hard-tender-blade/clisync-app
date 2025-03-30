import React from 'react'
import avatar from 'gradient-avatar'

export default function Avatar({ id, size: s }: { id: string; size: number }) {
    return (
        <div
            className="aspect-square overflow-hidden rounded-full"
            style={{ width: s, height: s }}
            dangerouslySetInnerHTML={{ __html: avatar(id, 64) }}
        />
    )
}
