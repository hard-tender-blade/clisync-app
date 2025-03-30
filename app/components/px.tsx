import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function PX({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return <div className={twMerge('px-8 md:px-24 2xl:px-24', className)}>{children}</div>
}
