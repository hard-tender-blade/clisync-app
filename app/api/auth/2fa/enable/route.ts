// /api/auth/enable-2fa.js

import responses from '@/modules/server/constants/responses';
import usersController from '@/modules/server/controllers/users';
import errorMiddleware from '@/modules/server/middleware/errorMiddleware';
import authMiddleware from '@/modules/shared/middleware/authMiddleware';
import { NextRequest } from 'next/server';
import speakeasy from 'speakeasy';

export async function POST(request: NextRequest) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const data = await request.json();
        const token = data.token;
        const secret = data.secret;

        if (!token || !secret) {
            return responses.errors.invalidRequest;
        }

        // Verify the provided token
        const isVerified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        });

        if (isVerified) {
            // Store secret in the database for the user and enable 2FA
            const user = await usersController.getById(userId);

            await usersController.update(userId, {
                ...user,
                twoFAEnabled: true,
                twoFASecret: secret
            });

            return responses.success({ success: true });
        } else {
            return responses.errors.invalidRequest;
        }
    })

}
