import signale from 'signale'
import errorMiddleware from '../../../modules/server/middleware/errorMiddleware'
import { CreateClientRequest } from '@/modules/shared/types/subTypes'
import responses from '../../../modules/server/constants/responses'
import authMiddleware from '../../../modules/shared/middleware/authMiddleware'
import clientsController from '../../../modules/server/controllers/clients'
import { ClientsCursored, Cursor } from '@/modules/shared/types/cursor'
import { NextRequest } from 'next/server'
import { DEFAULT_CLIENTS_LIST_LIMIT } from '@/modules/shared/constants/constants'

export async function POST(req: Request) {
    return errorMiddleware(async () => {
        signale.info('POST /api/clients')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        const client: CreateClientRequest = await req.json()
        if (!client) return responses.errors.invalidRequest

        const newClient = await clientsController.create(client, userId)
        if (!newClient) return responses.errors.serverError

        return responses.success(newClient)
    })
}

export async function GET(req: NextRequest) {
    return errorMiddleware(async () => {
        signale.info('GET /api/clients')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        //get cursor from query
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit')
        const offset = searchParams.get('offset')
        const search = searchParams.get('search')

        const cursor: Cursor = {
            limit: limit ? parseInt(limit) : DEFAULT_CLIENTS_LIST_LIMIT,
            offset: offset ? parseInt(offset) : 0,
        }

        const extraCursor = { ...cursor, limit: cursor.limit + 1 }

        const clients = await clientsController.getClientsByUserId(
            userId,
            extraCursor,
            search,
        )
        if (!clients) return responses.errors.notFound

        let nextCursor: Cursor | null = null
        if (clients.length === cursor.limit + 1) {
            clients.pop()
            nextCursor = { ...cursor, offset: cursor.offset + cursor.limit }
        }

        const res: ClientsCursored = {
            data: clients,
            nextCursor,
        }

        return responses.success(res)
    })
}
