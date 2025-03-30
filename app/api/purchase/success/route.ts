import responses from "@/modules/server/constants/responses"
import errorMiddleware from "@/modules/server/middleware/errorMiddleware"
import authMiddleware from "@/modules/shared/middleware/authMiddleware"
import config from "@/modules/shared/config/config";
import jwt from 'jsonwebtoken';
import usersController from "@/modules/server/controllers/users";

export async function POST(request: Request) {
    return errorMiddleware(async () => {
        const { userId } = authMiddleware(request)
        if (!userId) return responses.errors.unauthorized

        const data = await request.json()
        const token = data.token

        //check if token is valid
        const decoded = jwt.verify(token, config.jwt_secret) as { userId: string }
        if (decoded.userId !== userId) return responses.errors.unauthorized

        const user = await usersController.getById(userId)
        if (!user) return responses.errors.notFound

        //set to current date + 1 month
        const premiumPlanTo = new Date()
        premiumPlanTo.setMonth(premiumPlanTo.getMonth() + 1)

        //update user
        await usersController.update(userId, {
            ...user,
            premiumPlanTo: premiumPlanTo.toISOString()
        })

        console.log('decoded', decoded)

        return responses.success({
            message: 'success'
        })
    })
}