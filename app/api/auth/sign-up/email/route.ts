import { SignUpWithEmailRequest } from '@/modules/shared/types/subTypes'
import bcrypt from 'bcrypt'
import responses from '../../../../../modules/server/constants/responses'
import errorMiddleware from '../../../../../modules/server/middleware/errorMiddleware'
import {
    validateEmail,
    validatePassword,
} from '@/modules/shared/validation/validation'
import usersController from '@/modules/server/controllers/users'
import languageInterface from '@/modules/client/languageInterface/language'
import generateEmailVerificationJwtToken from '../../utils/generateEmailVerificationJwtToken'
import emailService from '@/modules/server/services/email/emailService'
import accountVerificationEmailTemplate from '@/modules/server/services/email/templates/accountVerificationEmailTemplate'
import { v4 } from 'uuid'
import config from '@/modules/shared/config/config'

const SALT = 10

export async function POST(req: Request) {
    return errorMiddleware(async () => {
        const signUpRequest: SignUpWithEmailRequest = await req.json()

        if (
            signUpRequest.email === undefined ||
            signUpRequest.password === undefined ||
            signUpRequest.lang === undefined
        ) {
            return responses.errors.invalidRequest
        }

        if (
            !validateEmail(signUpRequest.email) ||
            !validatePassword(signUpRequest.password) ||
            !languageInterface.check(signUpRequest.lang)
        ) {
            return responses.errors.invalidRequest
        }

        //check if user already exists
        const userExist = await usersController.getByEmail(signUpRequest.email)

        // user already exists and signed up with email or google -> return error
        if (userExist) return responses.errors.alreadyExists

        const id = v4()

        // send verification email
        const emailVerificationToken = generateEmailVerificationJwtToken({
            id,
            email: signUpRequest.email,
            passwordHash: await bcrypt.hash(signUpRequest.password, SALT),
            lang: signUpRequest.lang,
        })

        const emailId = await emailService.send(
            {
                from: accountVerificationEmailTemplate.from,
                to: [signUpRequest.email],
                subject: accountVerificationEmailTemplate.subject(),
                tags: accountVerificationEmailTemplate.tags({
                    lang: signUpRequest.lang,
                    userId: id,
                }),
                template: accountVerificationEmailTemplate.html({
                    magicUrl: `${config.next_public_origin}/auth/verification/${emailVerificationToken}`,
                }),
            }
        )
        if (!emailId) return responses.errors.serverError

        // user does not exist yet -> create user and password
        // const createdUser = await usersController.create({
        //     lang: signUpRequest.lang,
        //     email: signUpRequest.email,
        //     googleAuth: false,
        //     googleCalendarConnected: false,
        // })
        // if (!createdUser) throw new Error('Failed to create user')

        // const hash = await bcrypt.hash(signUpRequest.password, SALT)

        // const ok = await passwordsController.create(createdUser.id, hash, signUpRequest.email)
        // if (!ok) throw new Error('Failed to create password')

        // setAccessTokenToCookies(generateAuthJwtToken(createdUser.id, signUpRequest.lang))
        return responses.success({ message: "success" })
    }, 30000)
}
