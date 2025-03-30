import authMiddleware from '@/modules/shared/middleware/authMiddleware'
import { NextRequest } from 'next/server'
import { notFound } from 'next/navigation'
import Content from './content'
import getClientById from '@/modules/client/query/clients/getClientById'
import permanentRedirectSessionExpired from '../../utils/permanentRedirectSessionExpired'

export default async function Page(
    { params }: { params: { id: string } },
    request: NextRequest,
) {
    const { userId, lang, token } = authMiddleware(request)
    if (!userId || !token || !lang)
        return permanentRedirectSessionExpired(`/workspace/clients/${params.id}`)

    const client = await getClientById(params.id, token)
    if (!client) return notFound()

    return (
        <main>
            <Content client={client} lang={lang} />
        </main>
    )
}
