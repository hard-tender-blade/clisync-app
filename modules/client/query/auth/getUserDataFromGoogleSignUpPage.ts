import publicConfig from "@/modules/shared/config/publicConfig"
import { GoogleAuthResponse } from "@/modules/shared/types/subTypes"

export default async function getUserDataFromGoogleAuthCodeFlow(code: string): Promise<GoogleAuthResponse | null> {
    const tokens = await fetch(`${publicConfig.next_public_origin}/api/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })

    const data = await tokens.json()
    if (!data) return null
    return data
}