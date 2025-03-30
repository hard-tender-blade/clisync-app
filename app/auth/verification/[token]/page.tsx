'use client'
import signUpVerifyEmail from '@/modules/client/query/auth/singUpVerifyEmail'
import React, { useEffect, useState } from 'react'

export default function Page({ params }: { params: { token: string } }) {
    const [verified, setVerified] = useState<null | boolean>(null)

    useEffect(() => {
        const verify = async () => {
            if (verified) return
            const ok = await signUpVerifyEmail(params.token)
            if (ok) {
                window.location.href = '/'
                setVerified(true)
                return
            }
            setVerified(false)
        }
        verify()
    }, [verified])

    return (
        <div className="fixed flex h-screen w-screen items-center justify-center">
            {verified === false ? (
                <div>
                    <h1>Verification failed</h1>
                    <p>Please try again or contact support.</p>
                </div>
            ) : (
                <span className="loading loading-spinner loading-sm"></span>
            )}
        </div>
    )
}
