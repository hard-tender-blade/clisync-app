import { Language } from '@/modules/client/languageInterface/language'
import config from '@/modules/shared/config/config'
import jwt from 'jsonwebtoken'

export default function generateAuthJwtToken(id: string, lang: Language): string {
    return jwt.sign(
        {
            id,
            lang,
        },
        config.jwt_secret,
        {
            expiresIn: config.jwt_access_time,
        },
    )
}