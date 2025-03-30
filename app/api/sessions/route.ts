import signale from 'signale'
import errorMiddleware from '../../../modules/server/middleware/errorMiddleware'
import { CreateSessionRequest } from '@/modules/shared/types/subTypes'
import responses from '../../../modules/server/constants/responses'
import authMiddleware from '../../../modules/shared/middleware/authMiddleware'
import sessionController from '../../../modules/server/controllers/sessions'
import clientsController from '@/modules/server/controllers/clients'
import { NextRequest } from 'next/server'
import googleCalendarService from '@/modules/server/services/googleCalendar/googleCalendar'
import googleRefreshTokensController from '@/modules/server/controllers/googleRefreshTokens'
import usersController from '@/modules/server/controllers/users'
import googleOAuth2Service from '@/modules/server/services/googleOAuth2/OAuth2Module'
import { SessionWithClient } from '@/modules/shared/types/mainTypes'

export async function POST(req: Request) {
    return errorMiddleware(async () => {
        signale.info('POST /api/sessions')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        const sessionRequest: CreateSessionRequest = await req.json()
        if (!sessionRequest) return responses.errors.invalidRequest

        signale.success('sessionRequest ---', sessionRequest)

        const user = await usersController.getById(userId)
        if (!user) return responses.errors.notFound

        signale.success('user ---', user)

        const client = await clientsController.getById(sessionRequest.clientId, userId)
        if (!client) return responses.errors.notFound

        signale.success('client ---', client)

        let googleEventId: string | undefined = undefined

        if (sessionRequest.addToUserGoogleCalendar) {
            signale.success('addToUserGoogleCalendar ---', sessionRequest.addToUserGoogleCalendar)
            if (!user.googleCalendarConnected) return responses.errors.invalidRequest
            signale.success('user.googleCalendarConnected ---', user.googleCalendarConnected)

            const refreshToken = await googleRefreshTokensController.getByUserId(userId)
            if (!refreshToken) return responses.errors.notFound

            signale.success('refreshToken ---', refreshToken)

            const googleAccessToken = await googleOAuth2Service.generateNewAccessToken(refreshToken)
            if (!googleAccessToken) return responses.errors.serverError

            signale.success('googleAccessToken ---', googleAccessToken)

            if (sessionRequest.inviteClientOnGoogleCalendarEvent && !client.email) return responses.errors.invalidRequest

            const opts = {
                title: 'Session with ' + client.name,
                description: "this is a session",
                start: sessionRequest.start,
                end: sessionRequest.end,
                accessToken: googleAccessToken,
                timeZone: sessionRequest.timeZone,
                inviteClientEmail: sessionRequest.inviteClientOnGoogleCalendarEvent ? client.email : undefined,
            }

            const googleEvent = await googleCalendarService.createEvent(opts)
            console.log("GE", googleEvent)
            if (!googleEvent) return responses.errors.serverError

            googleEventId = googleEvent.id

            signale.success('googleEvent ---', googleEvent)
        }

        const session = await sessionController.create({
            note: sessionRequest.note,
            start: sessionRequest.start,
            end: sessionRequest.end,
            clientId: sessionRequest.clientId,
            googleEventId,
            clientInvite: googleEventId ? sessionRequest.inviteClientOnGoogleCalendarEvent : undefined,
        }, userId)
        if (!session) return responses.errors.serverError

        const sessionWithClient: SessionWithClient = {
            ...session,
            client
        }

        return responses.success(sessionWithClient)
    })
}
export async function GET(req: NextRequest) {
    return errorMiddleware(async () => {
        signale.info('GET /api/sessions')
        const { userId } = authMiddleware(req)
        if (!userId) return responses.errors.unauthorized

        const searchParams = req.nextUrl.searchParams
        const start = searchParams.get('start')
        const end = searchParams.get('end')
        const joinClient = searchParams.get('clients') === "true"
        if (!start || !end || !joinClient) return responses.errors.invalidRequest

        const sessions = await sessionController.getBasedOnTimeIntervalWithClients(
            userId,
            start,
            end
        )

        if (!sessions) return responses.errors.notFound

        return responses.success(sessions)
    })
}
