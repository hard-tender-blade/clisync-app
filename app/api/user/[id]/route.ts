import responses from '../../../../modules/server/constants/responses'
import errorMiddleware from '../../../../modules/server/middleware/errorMiddleware'
import usersController from '@/modules/server/controllers/users'
import authMiddleware from '@/modules/shared/middleware/authMiddleware'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized
        if (userId !== params.id) return responses.errors.unauthorized

        const user = await usersController.getById(params.id)
        if (!user) return responses.errors.notFound

        return responses.success(user)
    })
}
