import signale from "signale"
import config from "@/modules/shared/config/config"
import responses from "../../../../modules/server/constants/responses"
import errorMiddleware from "../../../../modules/server/middleware/errorMiddleware"

import { cookies } from "next/headers"

export async function POST(req: Request) {
    return errorMiddleware(async () => {
        signale.info("api/auth/log-out")

        cookies().set({
            name: 'access_token',
            value: '',
            httpOnly: true,
            path: '/',
            secure: config.dev_mode ? false : true, // set to true if using HTTPS
            sameSite: "strict", // adjust according to your needs
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * config.auth_cookie_expires)
        })

        return responses.success({ message: "success" })
    })
}
