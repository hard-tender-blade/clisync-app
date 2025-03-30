import React from 'react'

export default function Loading() {
    return (
        <div
            id="loading"
            className="btn fixed bottom-12 right-12 z-[200] hidden h-12 w-12"
        >
            <span className="loading loading-spinner loading-md" />
        </div>
    )
}
