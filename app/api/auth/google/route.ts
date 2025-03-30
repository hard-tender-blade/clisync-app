import responses from "@/modules/server/constants/responses";
import errorMiddleware from "@/modules/server/middleware/errorMiddleware";
import googleOAuth2Service from "@/modules/server/services/googleOAuth2/OAuth2Module";
import { GoogleAuthResponse } from "@/modules/shared/types/subTypes";
import { Credentials } from "google-auth-library";



export async function POST(request: Request) {
    return errorMiddleware(async () => {
        // We dont authenticate the user here because this is authorization process
        const code = await request.json()
        if (!code) return responses.errors.invalidRequest

        const tokens: Credentials = await googleOAuth2Service.getTokensFromAuthCode(code)
        if (
            !tokens ||
            !tokens.id_token ||
            !tokens.access_token ||
            !tokens.refresh_token ||
            !tokens.scope ||
            !tokens.token_type ||
            !tokens.expiry_date
        ) return responses.errors.invalidRequest

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        })
        if (!userInfoResponse.ok) return responses.errors.invalidRequest
        const user = await userInfoResponse.json()
        if (!user) return responses.errors.invalidRequest

        const response: GoogleAuthResponse = {
            tokens: {
                id_token: tokens.id_token,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                scope: tokens.scope,
                token_type: tokens.token_type,
                expiry_date: tokens.expiry_date.toString(),
            },
            user
        }

        return responses.success(response)
    })
}