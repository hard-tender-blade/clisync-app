import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function PC({
    children,
    className,
}: {
    children?: React.ReactNode
    className?: string
}) {
    return <div className={twMerge('hidden md:block', className)}>{children}</div>
}
