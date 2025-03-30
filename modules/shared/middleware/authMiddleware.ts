import { Language } from '@/modules/client/languageInterface/language';
import config from '@/modules/shared/config/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers'
import signale from 'signale';

/**
 * Validates and (UPDATES) the authorization token and returns the user ID if everything is okay.
 * @param request - The request object containing the authorization header.
 * @returns A Promise that resolves to the user ID if the token is valid, or null otherwise.
*/
const authMiddleware = (request?: Request): {
    userId: string | null,
    lang: Language | null,
    token: string | null
} => {
    signale.info('------------------------------');
    signale.info('Validating authorization token');

    const cookieStoreAccessToken = cookies().get('access_token');
    const headerAccessToken = request?.headers?.get('Authorization')?.split(' ')[1];;

    if (!cookieStoreAccessToken && !headerAccessToken) {
        signale.error('Missing access token');
        return {
            userId: null,
            lang: null,
            token: null
        }
    }

    if (cookieStoreAccessToken) {
        try {
            const decodedToken = jwt.verify(cookieStoreAccessToken.value, config.jwt_secret) as JwtPayload;
            if (decodedToken) {
                signale.success('Access token is valid');
                return {
                    userId: decodedToken.id,
                    lang: decodedToken.lang,
                    token: cookieStoreAccessToken.value
                }
            }
        } catch { }
    }

    if (headerAccessToken) {
        try {
            const decodedToken = jwt.verify(headerAccessToken, config.jwt_secret) as JwtPayload;
            if (decodedToken) {
                signale.success('Access token is valid');
                return {
                    userId: decodedToken.id,
                    lang: decodedToken.lang,
                    token: headerAccessToken
                }
            }
        } catch { }
    }

    return {
        userId: null,
        lang: null,
        token: null
    }
}

export default authMiddleware