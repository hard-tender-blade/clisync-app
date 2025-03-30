import {
    validateEmail,
} from '@/modules/shared/validation/validation'
import usersController from '@/modules/server/controllers/users'
import languageInterface from '@/modules/client/languageInterface/language'
import errorMiddleware from '@/modules/server/middleware/errorMiddleware'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '@/modules/shared/config/config'
import responses from '@/modules/server/constants/responses'
import passwordsController from '@/modules/server/controllers/passwords'
import setAccessTokenToCookies from '@/app/api/auth/utils/setAccessTokenToCookies'
import generateAuthJwtToken from '@/app/api/auth/utils/generateAuthJwtToken'

const SALT = 10

export async function GET(request: Request, { params }: { params: { token: string } }) {
    return errorMiddleware(async () => {
        let decodedToken: JwtPayload
        try {
            decodedToken = jwt.verify(params.token, config.jwt_secret) as JwtPayload;
        } catch (error) {
            return responses.errors.invalidRequest
        }

        const id = decodedToken.id
        const email = decodedToken.email
        const passwordHash = decodedToken.passwordHash
        const lang = decodedToken.lang


        if (
            id === undefined ||
            email === undefined ||
            passwordHash === undefined ||
            lang === undefined
        ) {
            return responses.errors.invalidRequest
        }

        if (
            !validateEmail(email) ||
            !languageInterface.check(lang)
        ) {
            return responses.errors.invalidRequest
        }

        //check if user already exists
        const userExist = await usersController.getByEmail(email)

        // user already exists and signed up with email or google -> return error
        if (userExist) return responses.errors.alreadyExists
        2
        // user does not exist yet -> create user and password
        const createdUser = await usersController.create({
            id: id,
            lang,
            email,
            googleAuth: false,
            googleCalendarConnected: false,
        })
        if (!createdUser) return responses.errors.invalidRequest

        const ok = await passwordsController.create(createdUser.id, passwordHash, email)
        if (!ok) return responses.errors.invalidRequest

        setAccessTokenToCookies(generateAuthJwtToken(id, lang))
        return responses.success({ message: "success" })
    }, 30000)
}
