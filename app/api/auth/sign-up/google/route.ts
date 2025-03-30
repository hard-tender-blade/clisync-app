import { SignUpWithGoogleRequest } from '@/modules/shared/types/subTypes'
import responses from '../../../../../modules/server/constants/responses'
import errorMiddleware from '../../../../../modules/server/middleware/errorMiddleware'
import usersController from '@/modules/server/controllers/users'
import languageInterface from '@/modules/client/languageInterface/language'
import googleOAuth2Service from '@/modules/server/services/googleOAuth2/OAuth2Module'
import googleRefreshTokensController from '@/modules/server/controllers/googleRefreshTokens'
import setAccessTokenToCookies from '../../utils/setAccessTokenToCookies'
import generateAuthJwtToken from '../../utils/generateAuthJwtToken'
import { v4 } from 'uuid'

export async function POST(req: Request) {
    return errorMiddleware(async () => {
        const signUpRequest: SignUpWithGoogleRequest = await req.json()

        if (
            signUpRequest.accessToken === undefined ||
            signUpRequest.refreshToken === undefined ||
            signUpRequest.lang === undefined
        ) {
            return responses.errors.invalidRequest
        }

        if (
            !languageInterface.check(signUpRequest.lang)
        ) {
            return responses.errors.invalidRequest
        }

        const tokenInfo = await googleOAuth2Service.getTokenInfo(signUpRequest.accessToken) // will return null if token is invalid
        if (!tokenInfo || !tokenInfo.email || !tokenInfo.email_verified) return responses.errors.unauthorized

        const userExists = await usersController.getByEmail(tokenInfo.email)

        // user already exists and signed up with email -> create google refresh token and sign in
        if (userExists && !userExists.googleAuth) {
            const updatedToken = await googleRefreshTokensController.update(userExists.id, signUpRequest.refreshToken)
            if (!updatedToken) throw new Error('Failed to update google refresh token')

            setAccessTokenToCookies(generateAuthJwtToken(userExists.id, signUpRequest.lang))
            return responses.success({ message: "success" })
        }

        // user already exists and signed up with google -> update google refresh token and sign in
        if (userExists && userExists.googleAuth) {
            const updatedToken = await googleRefreshTokensController.update(userExists.id, signUpRequest.refreshToken)
            if (!updatedToken) throw new Error('Failed to update google refresh token')

            setAccessTokenToCookies(generateAuthJwtToken(userExists.id, signUpRequest.lang))
            return responses.success({ message: "success" })
        }

        // user does not exist yet -> create user and google refresh token
        const createdUser = await usersController.create({
            id: v4(),
            email: tokenInfo.email,
            lang: signUpRequest.lang,
            googleAuth: true,
            name: signUpRequest.name,
            googleCalendarConnected: false,
        })
        if (!createdUser) throw new Error('Failed to create user')

        const tokenExists = await googleRefreshTokensController.getByUserId(createdUser.id)
        if (tokenExists) {
            const updatedToken = await googleRefreshTokensController.update(createdUser.id, signUpRequest.refreshToken)
            if (!updatedToken) throw new Error('Failed to update google refresh token')
        } else {
            const createdToken = await googleRefreshTokensController.create(createdUser.id, signUpRequest.refreshToken,)
            if (!createdToken) throw new Error('Failed to create google refresh token')
        }

        setAccessTokenToCookies(generateAuthJwtToken(createdUser.id, signUpRequest.lang))
        return responses.success({ message: "success" })
    })
}
