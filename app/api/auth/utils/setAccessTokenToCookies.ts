import config from "@/modules/shared/config/config";
import { cookies } from "next/headers";

export default function setAccessTokenToCookies(accessToken: string) {
    cookies().set({
        name: 'access_token',
        value: accessToken,
        httpOnly: true,
        path: '/',
        secure: config.dev_mode ? false : true, // set to true if using HTTPS
        sameSite: 'strict', // adjust according to your needs

        // set the expiration date of the cookie, in this case, it will expire in [value] days
        expires: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * config.auth_cookie_expires,
        ),
    })
}