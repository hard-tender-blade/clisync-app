import authMiddleware from "../../../../modules/shared/middleware/authMiddleware"
import responses from "../../../../modules/server/constants/responses"
import errorMiddleware from "../../../../modules/server/middleware/errorMiddleware"
import { Session } from "@/modules/shared/types/mainTypes"
import sessionController from "../../../../modules/server/controllers/sessions"
import clientsController from "@/modules/server/controllers/clients"

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//     return apiErrorWrapper(async () => {
//         const {userId} = authMiddleware(request)
//         if (!userId) return responses.errors.unauthorized

//         const client = await db.clients.findOne({
//             where: {
//                 id: params.id,
//                 userId
//             },
//             include: [
//                 db.quickNotes
//             ]
//         });
//         if (!client) return responses.errors.noResults

//         return responses.success(client.dataValues)
//     })
// }

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const session = await sessionController.getById(params.id, userId)
        if (!session) return responses.errors.notFound

        const ok = await sessionController.destroy(session.id, userId)
        if (!ok) return responses.errors.notFound

        const updatedClient = await clientsController.getById(session.clientId, userId)
        if (!updatedClient) return responses.errors.notFound

        return responses.success(updatedClient)
    })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const sessionUpdate: Session = await request.json()
        if (sessionUpdate.id !== params.id) return responses.errors.invalidRequest

        const updatedSession = await sessionController.update(sessionUpdate, userId)
        if (!updatedSession) return responses.errors.notFound

        const updatedClient = await clientsController.getById(updatedSession.clientId, userId)
        if (!updatedClient) return responses.errors.notFound

        return responses.success(updatedClient)
    })
}