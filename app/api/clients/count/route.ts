import signale from "signale"
import { NextRequest } from "next/server"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import responses from "@/modules/server/constants/responses"
import clientsController from "@/modules/server/controllers/clients"

export async function GET(req: NextRequest) {
    return errorMiddleware(async () => {
        signale.info('GET /api/clients')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        const count = await clientsController.getClientsCountByUserId(userId)
        if (count === null) return responses.errors.notFound

        return responses.success(count)
    })
}

