import { showAlert } from '@/modules/client/utils/alert/alerts'
import { useGoogleLogin } from '@react-oauth/google'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleButton({
    title,
    callBack,
}: {
    title: string
    callBack: (code: string) => void
}) {
    const handleClick = useGoogleLogin({
        onSuccess: (tokenResponse) => callBack(tokenResponse.access_token),
        onError: (error) => {
            showAlert(
                'error',
                'short',
                'Failed to authenticate with Google, contact support please',
            )
        },
    })

    return (
        <button
            className="btn btn-outline btn-neutral mt-4"
            onClick={() => {
                handleClick()
            }}
        >
            <FcGoogle className="h-8 w-8" />
            {title}
        </button>
    )
}
