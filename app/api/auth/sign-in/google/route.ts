import { SignInWithGoogleRequest } from '@/modules/shared/types/subTypes'
import usersController from '@/modules/server/controllers/users'
import errorMiddleware from '@/modules/server/middleware/errorMiddleware'
import responses from '@/modules/server/constants/responses'
import setAccessTokenToCookies from '../../utils/setAccessTokenToCookies'
import generateAuthJwtToken from '../../utils/generateAuthJwtToken'
import googleOAuth2Service from '@/modules/server/services/googleOAuth2/OAuth2Module'

export async function POST(req: Request) {
    return errorMiddleware(async () => {
        const signInWithGoogleRequest: SignInWithGoogleRequest = await req.json()

        if (signInWithGoogleRequest.accessToken === undefined)
            return responses.errors.invalidRequest

        const tokenInfo = await googleOAuth2Service.getTokenInfo(signInWithGoogleRequest.accessToken) // will return null if token is invalid
        if (!tokenInfo || !tokenInfo.email || !tokenInfo.email_verified) return responses.errors.unauthorized

        const user = await usersController.getByEmail(tokenInfo.email)
        if (!user) return responses.errors.notFound

        setAccessTokenToCookies(generateAuthJwtToken(user.id, user.lang))
        return responses.success({ message: "success" })
    })
}
