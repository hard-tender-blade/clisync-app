'use client'
import React, { ReactNode, useEffect, useState } from 'react'

export default function NoSSR({ children }: { children: ReactNode }) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) return <>{children}</>
    return null
}
