import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    // Step 1: Generate a unique secret for the user
    const secret = speakeasy.generateSecret({
        name: "Clisync"
    });

    // Step 2: Generate a QR code for the secret, to be scanned by Google Authenticator
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    // Step 4: Send the QR code URL to the client
    return new Response(
        JSON.stringify({
            secret: secret.base32,
            qrCodeUrl,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}