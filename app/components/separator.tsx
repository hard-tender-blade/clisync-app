import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function Separator({
    size = 'lg',
    className,
}: {
    size: 'sm' | 'md' | 'lg'
    className?: string
}) {
    if (size === 'sm') return <div className={twMerge('sup h-8 w-full', className)}></div>
    if (size === 'md')
        return <div className={twMerge('sup h-16 w-full', className)}></div>
    if (size === 'lg')
        return <div className={twMerge('sup h-32 w-full', className)}></div>
}
