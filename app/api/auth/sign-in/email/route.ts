import { SignInWithEmailRequest } from '@/modules/shared/types/subTypes'
import signale from 'signale'
import bcrypt from 'bcrypt'

import passwordsController from '@/modules/server/controllers/passwords'
import usersController from '@/modules/server/controllers/users'
import errorMiddleware from '@/modules/server/middleware/errorMiddleware'
import responses from '@/modules/server/constants/responses'
import { validateEmail, validatePassword } from '@/modules/shared/validation/validation'
import setAccessTokenToCookies from '../../utils/setAccessTokenToCookies'
import generateAuthJwtToken from '../../utils/generateAuthJwtToken'
import speakeasy from 'speakeasy'

//todo make controller for all auth routes
export async function POST(req: Request) {
    return errorMiddleware(async () => {
        signale.info('Sign in request')
        const signInWithEmailRequest: SignInWithEmailRequest = await req.json()

        if (signInWithEmailRequest.email === undefined || signInWithEmailRequest.password === undefined)
            return responses.errors.invalidRequest

        if (!validateEmail(signInWithEmailRequest.email) || !validatePassword(signInWithEmailRequest.password))
            return responses.errors.invalidRequest

        //get password hash
        const password = await passwordsController.getByEmail(signInWithEmailRequest.email)
        if (!password) return responses.errors.unauthorized

        //compare password
        const match = await bcrypt.compare(signInWithEmailRequest.password, password.password)
        if (!match) return responses.errors.invalidRequest

        const user = await usersController.getById(password.userId)
        if (!user) return responses.errors.notFound


        if (user.twoFAEnabled && !signInWithEmailRequest.twoFACode) {
            return responses.success({
                twoFARequired: true,
            })
        } else if (user.twoFAEnabled && signInWithEmailRequest.twoFACode) {
            // Verify the provided token
            const isVerified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                encoding: 'base32',
                token: signInWithEmailRequest.twoFACode
            });

            if (!isVerified) return responses.errors.unauthorized

            const token = generateAuthJwtToken(user.id, user.lang)
            setAccessTokenToCookies(token)
            return responses.success({ token })
        }
        else {
            const token = generateAuthJwtToken(user.id, user.lang)
            setAccessTokenToCookies(token)
            return responses.success({ token })
        }
    })
}
