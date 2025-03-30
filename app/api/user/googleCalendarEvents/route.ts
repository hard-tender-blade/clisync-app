import responses from "@/modules/server/constants/responses"
import googleRefreshTokensController from "@/modules/server/controllers/googleRefreshTokens"
import usersController from "@/modules/server/controllers/users"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import googleCalendarService from "@/modules/server/services/googleCalendar/googleCalendar"
import googleOAuth2Service from "@/modules/server/services/googleOAuth2/OAuth2Module"
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import { NextRequest } from "next/server"
import signale from "signale"

export async function GET(req: NextRequest) {
    return errorMiddleware(async () => {
        signale.info('GET /api/user/id/googleCalendarEvents')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        const user = await usersController.getById(userId)
        if (!user) return responses.errors.notFound

        const searchParams = req.nextUrl.searchParams
        const start = searchParams.get('start')
        const end = searchParams.get('end')
        if (!start || !end) return responses.errors.invalidRequest

        console.log("user", user)

        if (user.googleCalendarConnected) {
            console.log("user.googleCalendarConnected", user.googleCalendarConnected)
            signale.success('user.googleCalendarConnected ---', user.googleCalendarConnected)

            const refreshToken = await googleRefreshTokensController.getByUserId(userId)
            if (!refreshToken) return responses.errors.notFound

            signale.success('refreshToken ---', refreshToken)

            const googleAccessToken = await googleOAuth2Service.generateNewAccessToken(refreshToken)
            if (!googleAccessToken) return responses.errors.serverError

            signale.success('googleAccessToken ---', googleAccessToken)

            const opts = {
                start,
                end,
                accessToken: googleAccessToken,
            }

            const googleEvents = await googleCalendarService.getEvents(opts)
            console.log("googleEvents", googleEvents)


            if (!googleEvents) return responses.errors.serverError
            signale.success('googleEvent ---', googleEvents)
            return responses.success(googleEvents)
        }
        console.log("no google events")
        return responses.success([])
    })
}