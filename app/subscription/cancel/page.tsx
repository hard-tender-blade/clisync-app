import Link from 'next/link'
import React from 'react'

export default function Page() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <section>
                <div className="product Box-root">
                    <div className="description Box-root">
                        <h3>Subscription to starter plan was canceled!</h3>
                    </div>
                </div>
                <Link href={'/workspace/'}>Go to workspace</Link>
            </section>
        </div>
    )
}
