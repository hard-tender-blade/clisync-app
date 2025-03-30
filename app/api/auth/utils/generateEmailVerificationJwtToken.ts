import { Language } from '@/modules/client/languageInterface/language'
import config from '@/modules/shared/config/config'
import jwt from 'jsonwebtoken'

const EXPIRES_IN = '15m'

export default function generateEmailVerificationJwtToken({
    id,
    email,
    passwordHash,
    lang,
}: {
    id: string
    email: string
    passwordHash: string
    lang: Language
}): string {
    return jwt.sign(
        {
            id,
            email,
            lang,
            passwordHash,
        },
        config.jwt_secret,
        {
            expiresIn: EXPIRES_IN,
        },
    )
}