import { Credentials, TokenInfo } from "google-auth-library";
import GoogleOAuth2Client from "./OAuth2";
import config from "@/modules/shared/config/config";

const getTokensFromAuthCode = async (code: string): Promise<Credentials> => {
    const { tokens } = await GoogleOAuth2Client.getToken(code); // exchange code for tokens
    return tokens;
}

const getTokenInfo = async (access_token: string): Promise<TokenInfo | null> => {
    try {
        const info = await GoogleOAuth2Client.getTokenInfo(access_token);
        if (!info) return null;
        return info;
    } catch (error) {
        return null;
    }
}

const generateNewAccessToken = async (refresh_token: string): Promise<string | null> => {
    const res = await fetch('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: config.next_public_google_client_id,
            client_secret: config.google_secret,
            refresh_token,
            grant_type: 'refresh_token',
        }),
    })

    if (!res.ok) {
        console.error('Failed to generate new access token', res);
        const a = await res.json()
        console.error(a)
        return null;
    };
    const data = await res.json();
    return data.access_token;
}

const googleOAuth2Service = {
    getTokensFromAuthCode,
    getTokenInfo,
    generateNewAccessToken,
}
export default googleOAuth2Service;


