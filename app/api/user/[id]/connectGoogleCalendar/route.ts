import responses from "@/modules/server/constants/responses"
import googleRefreshTokensController from "@/modules/server/controllers/googleRefreshTokens"
import usersController from "@/modules/server/controllers/users"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import signale from "signale"

export async function POST(request: Request) {
    return errorMiddleware(async () => {
        signale.info("POST /api/user/[id]/connectGoogleCalendar")
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const { refreshToken }: { refreshToken: string } = await request.json()
        if (!refreshToken) return responses.errors.invalidRequest

        //get user
        const user = await usersController.getById(userId)
        if (!user) return responses.errors.notFound

        //set google refresh token
        const createdToken = await googleRefreshTokensController.create(userId, refreshToken)
        if (!createdToken) return responses.errors.serverError

        //update user googleCalendarConnected field
        const updatedUser = await usersController.update(userId, { ...user, googleCalendarConnected: true })
        if (!updatedUser) return responses.errors.serverError

        return responses.success(updatedUser)
    })
}
