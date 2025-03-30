import React from 'react'

export default function ListHeder() {
    return (
        <div className="h-10 border-b border-solid border-base-200 bg-white text-sm font-bold">
            <div className="flex h-full w-full items-center opacity-70">
                <div className="w-4/12 pl-3">Name</div>
                <div className="hidden w-2/12 md:block">Tags</div>
                <div className="hidden w-3/12 md:block">Email</div>
                <div className="hidden w-2/12 md:block">Phone</div>
                <div className="hidden w-2/12 md:block"></div>
            </div>
        </div>
    )
}
