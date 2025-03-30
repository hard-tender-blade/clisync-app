import React from 'react'

export default function ModalV2({
    requestClose,
    children,
}: {
    requestClose: () => void
    children: React.ReactNode
}) {
    return (
        <div
            className="backdrop-sm fixed left-0 top-0 z-[300] flex h-screen w-screen items-center justify-center bg-black bg-opacity-30 p-2 shadow-custom"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    requestClose()
                }
            }}
        >
            <div className="rounded-xl bg-base-100 p-6 md:w-[50vw]">{children}</div>
        </div>
    )
}
