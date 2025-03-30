import { useUser } from '@/modules/client/query/user/useUser'
import { showAlert } from '@/modules/client/utils/alert/alerts'
import Loading from '@/modules/client/utils/loading/loading'
import React, { useEffect } from 'react'

export default function TwoFA() {
    const { user, isLoading: isLoadingUser, setUser } = useUser()

    const [code, setCode] = React.useState<number>()
    const [secret, setSecret] = React.useState<string>()
    const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null)

    useEffect(() => {
        handleGenerateTwoFA()
    }, [])

    const handleGenerateTwoFA = async () => {
        const response = await fetch('/api/auth/2fa/generate')

        if (!response.ok) {
            showAlert('error', 'mid', 'Failed to generate 2FA')
            return
        }

        const data = await response.json()
        const url = data.qrCodeUrl
        const secret = data.secret

        if (!url || !secret) {
            showAlert('error', 'mid', 'Failed to generate 2FA')
            return
        }

        setSecret(secret)
        setQrCodeUrl(data.qrCodeUrl)
    }

    const handleEnableTwoFA = async () => {
        if (!code || !secret) {
            showAlert('error', 'mid', 'Invalid code')
            return
        }

        const response = await fetch('/api/auth/2fa/enable', {
            method: 'POST',
            body: JSON.stringify({
                token: code,
                secret: secret,
            }),
        })

        if (!response.ok) {
            showAlert('error', 'mid', 'Failed to enable 2FA')
            return
        }

        showAlert('success', 'mid', '2FA enabled')
        setUser({ ...user, twoFAEnabled: true })
    }

    if (isLoadingUser) return <Loading />

    if (user.twoFAEnabled) return <div>2FA is already enabled</div>

    if (qrCodeUrl)
        return (
            <div className="flex flex-col gap-4">
                <img src={qrCodeUrl} alt="QR code" className="h-44 w-44" />

                <div className="flex w-full max-w-lg gap-4">
                    <input
                        className="input input-bordered "
                        type="number"
                        value={code}
                        onChange={(e) => setCode(parseInt(e.target.value))}
                        placeholder="xxx - xxx"
                    />
                    <button className="btn" onClick={handleEnableTwoFA}>
                        Enable 2FA
                    </button>
                </div>
            </div>
        )

    return <div>Generating 2FA...</div>
}
