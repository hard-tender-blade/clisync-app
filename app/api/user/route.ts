import usersController from '@/modules/server/controllers/users'
import responses from '../../../modules/server/constants/responses'
import errorMiddleware from '../../../modules/server/middleware/errorMiddleware'
import authMiddleware from '../../../modules/shared/middleware/authMiddleware'

export async function GET(request: Request) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)

        console.log('userId', userId)
        if (!userId) return responses.errors.unauthorized

        const user = await usersController.getById(userId)
        if (!user) return responses.errors.notFound

        return responses.success(user)
    })
}
export async function PUT(request: Request) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const user = await request.json()
        if (!user) return responses.errors.invalidRequest

        const newUser = await usersController.update(userId, user)
        if (!newUser) return responses.errors.serverError
        const updatedUser = await usersController.getById(userId)
        if (!updatedUser) return responses.errors.serverError

        return responses.success(updatedUser)
    })
}
