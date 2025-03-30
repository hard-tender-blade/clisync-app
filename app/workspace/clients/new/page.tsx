import authMiddleware from '@/modules/shared/middleware/authMiddleware'
import { notFound, permanentRedirect } from 'next/navigation'
import permanentRedirectSessionExpired from '../../utils/permanentRedirectSessionExpired'
import createNewClient from '@/modules/client/query/clients/createClient'
import { v4 } from 'uuid'

export default async function Page() {
    const { userId, lang, token } = authMiddleware()
    if (!userId || !token || !lang)
        return permanentRedirectSessionExpired(`/workspace/clients/new`)

    const id = v4().toString().split('-')[0]

    const { client, error } = await createNewClient(
        {
            name: 'Client' + id,
        },
        token,
    )
    if (!client) return notFound()
    return permanentRedirect(`/workspace/clients/${client.id}`)
}
