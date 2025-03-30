import responses from "@/modules/server/constants/responses"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import publicConfig from "@/modules/shared/config/publicConfig";
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import Stripe from 'stripe';
const stripe = new Stripe(config.stripe_secret_key);
import jwt from 'jsonwebtoken';
import config from "@/modules/shared/config/config";

export async function POST(request: Request) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const data = await request.json()
        const lookup_key = data.lookup_key
        if (!lookup_key) return responses.errors.invalidRequest

        const prices = await stripe.prices.list({
            lookup_keys: [lookup_key],
            expand: ['data.product'],
        });

        const token = jwt.sign(
            {
                userId,
            },
            config.jwt_secret,
            {
                expiresIn: config.jwt_access_time,
            },
        )

        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    // For metered billing, do not pass quantity
                    quantity: 1,

                },
            ],
            mode: 'subscription',
            success_url: `${publicConfig.next_public_origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}&token=${token}`,
            cancel_url: `${publicConfig.next_public_origin}/subscription/cancel`,
        });


        return responses.success({
            url: session.url
        })
    })
}