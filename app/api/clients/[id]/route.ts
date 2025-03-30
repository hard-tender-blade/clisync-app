import authMiddleware from "../../../../modules/shared/middleware/authMiddleware"
import responses from "../../../../modules/server/constants/responses"
import errorMiddleware from "../../../../modules/server/middleware/errorMiddleware"
import { UpdateClientRequest } from "@/modules/shared/types/subTypes"
import clientsController from "../../../../modules/server/controllers/clients"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const client = await clientsController.getById(params.id, userId)
        if (!client) return responses.errors.notFound

        return responses.success(client)
    })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const deleted = await clientsController.destroy(params.id, userId)
        if (!deleted) return responses.errors.notFound

        return responses.success({})
    })

}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const clientUpdate: UpdateClientRequest = await request.json()
        if (!clientUpdate) return responses.errors.invalidRequest

        const client = await clientsController.update(params.id, clientUpdate, userId)
        if (!client) return responses.errors.notFound

        return responses.success(client)
    })
}