'use client'

import publicConfig from '@/modules/shared/config/publicConfig'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Content from './content'

export default function page() {
    return (
        <main>
            <GoogleOAuthProvider clientId={publicConfig.next_public_google_client_id}>
                <Content />
            </GoogleOAuthProvider>
        </main>
    )
}
